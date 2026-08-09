import React from 'react';
import { X, Download, Edit3, Maximize2, Layers } from 'lucide-react';
import './ProjectDrawer.css';

export interface ProjectDetail {
  id: string;
  name: string;
  roomType: string;
  dimensions: string;
  status: 'Completed' | 'In Progress' | 'Draft';
  image: string;
  rendersCount: number;
  updatedAt: string;
  assets: string[];
}

interface ProjectDrawerProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div>
            <span className="drawer-tag">{project.roomType}</span>
            <h3 className="drawer-title">{project.name}</h3>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close Drawer">
            <X size={18} />
          </button>
        </div>

        {/* 3D Render Image Preview */}
        <div className="drawer-image-box">
          <img src={project.image} alt={project.name} className="drawer-render-img" />
          <div className="drawer-image-overlay">
            <span className="badge-3d">
              <Maximize2 size={13} /> 3D Architectural Render
            </span>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="drawer-body">
          {/* Metadata Specs Grid */}
          <div className="drawer-specs-grid">
            <div className="spec-box">
              <span className="spec-label">Dimensions</span>
              <strong className="spec-value">{project.dimensions}</strong>
            </div>
            <div className="spec-box">
              <span className="spec-label">Status</span>
              <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
            <div className="spec-box">
              <span className="spec-label">Renderings</span>
              <strong className="spec-value">{project.rendersCount} Views</strong>
            </div>
            <div className="spec-box">
              <span className="spec-label">Last Updated</span>
              <strong className="spec-value">{project.updatedAt}</strong>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div className="drawer-assets-section">
            <h4 className="section-subtitle">
              <Layers size={15} /> Included Furniture & Decor Assets ({project.assets.length})
            </h4>
            <div className="assets-pill-list">
              {project.assets.map((asset, idx) => (
                <span key={idx} className="asset-pill">
                  {asset}
                </span>
              ))}
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="drawer-actions-bar">
            <button type="button" className="btn-drawer-primary">
              <Edit3 size={16} />
              <span>Edit Room Layout</span>
            </button>
            <button type="button" className="btn-drawer-secondary">
              <Download size={16} />
              <span>Export Render</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
