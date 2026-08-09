import React, { useState } from 'react';
import {
  FolderKanban,
  Maximize2,
  Bookmark,
  Database,
} from 'lucide-react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { MetricCard } from '../dashboard/MetricCard';
import { ProjectsTable } from '../dashboard/ProjectsTable';
import type { ProjectItem } from '../dashboard/ProjectsTable';
import { TemplateGrid } from '../dashboard/TemplateGrid';
import type { UserRecord } from '../../types/auth';
import './AuthenticatedDashboard.css';

interface AuthenticatedDashboardProps {
  user: Omit<UserRecord, 'password_hash'>;
  onSignOut: () => void;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'PRJ-1092',
    name: 'Monochrome Living Room Concept',
    roomType: 'Residential Living Room',
    status: 'In Progress',
    updatedAt: 'Just now',
    rendersCount: 8,
  },
  {
    id: 'PRJ-1088',
    name: 'Executive Boardroom & Suite',
    roomType: 'Commercial Office',
    status: 'Completed',
    updatedAt: '2 hours ago',
    rendersCount: 16,
  },
  {
    id: 'PRJ-1074',
    name: 'Nordic Open Plan Kitchen',
    roomType: 'Residential Kitchen',
    status: 'In Progress',
    updatedAt: 'Yesterday',
    rendersCount: 5,
  },
  {
    id: 'PRJ-1061',
    name: 'Minimalist Loft Studio',
    roomType: 'Penthouse Apartment',
    status: 'Draft',
    updatedAt: 'Aug 07, 2026',
    rendersCount: 2,
  },
];

export const AuthenticatedDashboard: React.FC<AuthenticatedDashboardProps> = ({
  user,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(INITIAL_PROJECTS);

  const handleNewProject = () => {
    const newId = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProj: ProjectItem = {
      id: newId,
      name: 'New Custom Room Design',
      roomType: 'Custom Concept',
      status: 'In Progress',
      updatedAt: 'Just now',
      rendersCount: 1,
    };
    setProjectsList(prev => [newProj, ...prev]);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Header */}
      <Header
        user={user}
        onSignOut={onSignOut}
        onNewProject={handleNewProject}
      />

      {/* Main Layout Area */}
      <div className="dashboard-main-layout">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <main className="dashboard-content">
          {/* Welcome Banner */}
          <div className="content-welcome-banner">
            <div>
              <h2 className="welcome-title">Welcome back, {user.full_name}</h2>
              <p className="welcome-subtitle">
                Here is an overview of your interior design workspace and MongoDB Atlas data.
              </p>
            </div>
          </div>

          {/* 4 Stat Metric Cards */}
          <div className="metrics-grid">
            <MetricCard
              title="Active Projects"
              value={projectsList.length}
              change="+2 this week"
              icon={FolderKanban}
            />
            <MetricCard
              title="3D Room Renderings"
              value={31}
              change="+14.2%"
              icon={Maximize2}
            />
            <MetricCard
              title="Saved Decor Items"
              value={124}
              change="Catalog"
              isPositive={false}
              icon={Bookmark}
            />
            <MetricCard
              title="Database Node"
              value="MongoDB"
              change="Atlas Live"
              icon={Database}
            />
          </div>

          {/* Projects Table */}
          <ProjectsTable projects={projectsList} />

          {/* Room Templates Grid */}
          <TemplateGrid />
        </main>
      </div>
    </div>
  );
};
