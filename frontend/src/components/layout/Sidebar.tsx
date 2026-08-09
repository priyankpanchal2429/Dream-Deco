import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Paintbrush,
  Grid,
  Settings,
  Database,
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'canvas', label: 'Room Canvas', icon: Paintbrush },
  { id: 'catalog', label: 'Decor Catalog', icon: Grid },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-nav-group">
        <span className="sidebar-group-title">WORKSPACE</span>
        <nav className="sidebar-nav">
          {MENU_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Database Connection Status Footer */}
      <div className="sidebar-footer-card">
        <div className="db-status-icon">
          <Database size={16} />
        </div>
        <div className="db-status-info">
          <span className="db-status-title">MongoDB Atlas</span>
          <span className="db-status-subtitle">Connected Live</span>
        </div>
        <span className="db-status-indicator"></span>
      </div>
    </aside>
  );
};
