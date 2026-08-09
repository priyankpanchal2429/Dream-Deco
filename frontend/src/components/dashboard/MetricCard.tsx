import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  icon: LucideIcon;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
}) => {
  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <span className="metric-card-title">{title}</span>
        <div className="metric-card-icon">
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
      <div className="metric-card-body">
        <span className="metric-card-value">{value}</span>
        <span className={`metric-card-change ${isPositive ? 'positive' : 'neutral'}`}>
          {change}
        </span>
      </div>
    </div>
  );
};
