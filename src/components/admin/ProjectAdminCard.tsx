import type { Project } from '@/types'
import Image from 'next/image'

interface Props {
	project: Project
	onEdit: () => void
	onDelete: () => void
}

export default function ProjectAdminCard({ project, onEdit, onDelete }: Props) {
	return (
		<div className="admin-card">
			<div className="admin-card__main">
				{project.image && (
					<Image
						src={project.image}
						alt={project.title}
						width={64}
						height={48}
						className="admin-card__image"
					/>
				)}

				<div>
					<p className="admin-card__title">{project.title}</p>
					<p className="admin-card__meta">
						{project.type} · {project.year}
					</p>
				</div>
			</div>

			<div className="admin-card__actions">
				<button
					onClick={onEdit}
					className="admin-card__edit"
				>
					Edit
				</button>
				<button
					onClick={onDelete}
					className="admin-card__delete"
				>
					Delete
				</button>
			</div>
		</div>
	)
}
