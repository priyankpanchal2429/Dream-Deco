import React from 'react';
import { MoreHorizontal, ExternalLink, Calendar } from 'lucide-react';
import type { ProjectDetail } from './ProjectDrawer';
import './ProjectsTable.css';

interface ProjectsTableProps {
  projects: ProjectDetail[];
  onSelectProject?: (project: ProjectDetail) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onSelectProject }) => {
  return (
    <div className="projects-table-container">
      <div className="projects-table-header">
        <div>
          <h3 className="projects-table-title">Recent Decor Workspaces</h3>
          <p className="projects-table-subtitle">Overview of active 3D interior design projects and renderings</p>
        </div>
        <button type="button" className="btn-view-all">
          View All ({projects.length})
        </button>
      </div>

      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project & 3D Render</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Renderings</th>
              <th>Last Updated</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="project-row" onClick={() => onSelectProject?.(project)}>
                <td className="project-name-cell">
                  <div className="project-thumb-box">
                    <img src={project.image} alt={project.name} className="project-row-thumb" />
                  </div>
                  <div>
                    <span className="project-name">{project.name}</span>
                    <span className="project-id">ID: {project.id}</span>
                  </div>
                </td>
                <td className="project-meta">{project.roomType}</td>
                <td>
                  <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </td>
                <td className="project-meta">{project.rendersCount} views</td>
                <td className="project-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {project.updatedAt}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'inline-flex', gap: '4px' }}>
                    <button
                      type="button"
                      className="table-action-btn"
                      title="Inspect Project"
                      onClick={() => onSelectProject?.(project)}
                    >
                      <ExternalLink size={15} />
                    </button>
                    <button type="button" className="table-action-btn" title="More Options">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
