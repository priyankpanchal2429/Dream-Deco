import React from 'react';
import { ArrowRight, Layout } from 'lucide-react';
import './TemplateGrid.css';

export interface RoomTemplate {
  id: string;
  title: string;
  category: string;
  dimensions: string;
  itemsCount: number;
  image: string;
  assets: string[];
}

export const DEFAULT_TEMPLATES: RoomTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Monochrome Minimalist Living Room',
    category: 'Residential Living Room',
    dimensions: '24ft × 18ft',
    itemsCount: 14,
    image: '/images/living_room.png',
    assets: ['Bouclé Sofa', 'Monochrome Coffee Table', 'Architectural Floor Lamp', 'Soft Wool Area Rug'],
  },
  {
    id: 'tmpl-2',
    title: 'Executive Conference & Work Suite',
    category: 'Commercial Office',
    dimensions: '30ft × 20ft',
    itemsCount: 22,
    image: '/images/executive_office.png',
    assets: ['Minimalist Glass Executive Desk', 'Ergonomic Leather Chair', 'Acoustic Wall Panels', 'Linear Pendant Light'],
  },
  {
    id: 'tmpl-3',
    title: 'Nordic Open Plan Bedroom',
    category: 'Residential Bedroom',
    dimensions: '16ft × 14ft',
    itemsCount: 10,
    image: '/images/nordic_bedroom.png',
    assets: ['Platform Bed', 'Natural Oak Nightstand', 'Linen Bedding', 'Floor Mirror'],
  },
];

interface TemplateGridProps {
  onSelectTemplate?: (tmpl: RoomTemplate) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({ onSelectTemplate }) => {
  return (
    <div className="template-grid-container">
      <div className="template-grid-header">
        <div>
          <h3 className="template-grid-title">Quick Room Templates</h3>
          <p className="template-grid-subtitle">Start your next interior design workspace from curated 3D room renders</p>
        </div>
      </div>

      <div className="template-cards-wrapper">
        {DEFAULT_TEMPLATES.map(tmpl => (
          <div key={tmpl.id} className="template-card" onClick={() => onSelectTemplate?.(tmpl)}>
            <div className="template-card-preview">
              <img src={tmpl.image} alt={tmpl.title} className="template-bg-img" />
              <div className="template-preview-badge">
                <Layout size={13} /> {tmpl.category}
              </div>
            </div>
            <div className="template-card-content">
              <h4 className="template-title">{tmpl.title}</h4>
              <div className="template-meta-row">
                <span>{tmpl.dimensions}</span>
                <span>•</span>
                <span>{tmpl.itemsCount} Assets</span>
              </div>
              <button
                type="button"
                className="btn-use-template"
                onClick={e => {
                  e.stopPropagation();
                  onSelectTemplate?.(tmpl);
                }}
              >
                <span>Inspect Template</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
