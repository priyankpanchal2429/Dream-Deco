import React from 'react';
import { MoreHorizontal, ExternalLink, Calendar, Layers } from 'lucide-react';
import './ProjectsTable.css';

export interface ProjectItem {
  id: string;
  name: string;
  roomType: string;
  status: 'Completed' | 'In Progress' | 'Draft';
  updatedAt: string;
  rendersCount: number;
}

interface ProjectsTableProps {
  projects: ProjectItem[];
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  return (
    <div className="projects-table-container">
      <div className="projects-table-header">
        <div>
          <h3 className="projects-table-title">Recent Decor Projects</h3>
          <p className="projects-table-subtitle">Overview of your active 3D room design workspaces</p>
        </div>
        <button type="button" className="btn-view-all">
          View All
        </button>
      </div>

      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Renderings</th>
              <th>Last Updated</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td className="project-name-cell">
                  <div className="project-icon-box">
                    <Layers size={16} />
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
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '4px' }}>
                    <button type="button" className="table-action-btn" title="Open Project">
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
