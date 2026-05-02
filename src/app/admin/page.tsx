import { verifyToken } from '@/lib/auth'
import { getProjects } from '@/lib/projects-store'
import { redirect } from 'next/navigation'
import AdminDashboard from '../../components/admin/AdminDashboard'

export default async function AdminPage() {
	const auth = await verifyToken()
	if (!auth) redirect('/admin/login')

	const projects = await getProjects()

	return <AdminDashboard initialProjects={projects} />
}
