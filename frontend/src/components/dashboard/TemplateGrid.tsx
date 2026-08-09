import React from 'react';
import { ArrowRight, Layout, Maximize2 } from 'lucide-react';
import './TemplateGrid.css';

export interface RoomTemplate {
  id: string;
  title: string;
  category: string;
  dimensions: string;
  itemsCount: number;
}

const DEFAULT_TEMPLATES: RoomTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Monochrome Minimalist Living Room',
    category: 'Living Room',
    dimensions: '24ft × 18ft',
    itemsCount: 14,
  },
  {
    id: 'tmpl-2',
    title: 'Executive Conference & Work Suite',
    category: 'Commercial Office',
    dimensions: '30ft × 20ft',
    itemsCount: 22,
  },
  {
    id: 'tmpl-3',
    title: 'Nordic Open Plan Bedroom',
    category: 'Residential',
    dimensions: '16ft × 14ft',
    itemsCount: 10,
  },
];

export const TemplateGrid: React.FC = () => {
  return (
    <div className="template-grid-container">
      <div className="template-grid-header">
        <div>
          <h3 className="template-grid-title">Quick Room Templates</h3>
          <p className="template-grid-subtitle">Start your next interior design workspace from curated templates</p>
        </div>
      </div>

      <div className="template-cards-wrapper">
        {DEFAULT_TEMPLATES.map(tmpl => (
          <div key={tmpl.id} className="template-card">
            <div className="template-card-preview">
              <div className="template-preview-badge">
                <Layout size={14} /> {tmpl.category}
              </div>
              <div className="template-preview-icon">
                <Maximize2 size={24} strokeWidth={1.5} />
              </div>
            </div>
            <div className="template-card-content">
              <h4 className="template-title">{tmpl.title}</h4>
              <div className="template-meta-row">
                <span>{tmpl.dimensions}</span>
                <span>•</span>
                <span>{tmpl.itemsCount} Assets</span>
              </div>
              <button type="button" className="btn-use-template">
                <span>Use Template</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
