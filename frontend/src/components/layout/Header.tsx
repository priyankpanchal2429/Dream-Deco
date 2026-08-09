import React from 'react';
import { Search, Plus, LogOut, User as UserIcon } from 'lucide-react';
import { Logo } from './Logo';
import type { UserRecord } from '../../types/auth';
import './Header.css';

interface HeaderProps {
  user: Omit<UserRecord, 'password_hash'>;
  onSignOut: () => void;
  onNewProject?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut, onNewProject }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Logo size={28} showWordmark={true} />
      </div>

      {/* Global Search Bar */}
      <div className="header-center">
        <div className="header-search-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects, room designs, furniture..."
            className="search-input"
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>
      </div>

      {/* Action Buttons & Profile */}
      <div className="header-right">
        <button
          type="button"
          className="btn-new-project"
          onClick={onNewProject}
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>

        <div className="user-profile-badge">
          <div className="profile-avatar">
            <UserIcon size={14} />
          </div>
          <span className="profile-name">@{user.user_id}</span>
        </div>

        <button
          type="button"
          className="btn-signout"
          onClick={onSignOut}
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
