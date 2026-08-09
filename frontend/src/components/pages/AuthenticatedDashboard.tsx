import React, { useState } from 'react';
import { FolderKanban, Maximize2, Bookmark, Database } from 'lucide-react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { MetricCard } from '../dashboard/MetricCard';
import { ProjectsTable } from '../dashboard/ProjectsTable';
import { TemplateGrid } from '../dashboard/TemplateGrid';
import { ProjectDrawer } from '../dashboard/ProjectDrawer';
import type { ProjectDetail } from '../dashboard/ProjectDrawer';
import type { RoomTemplate } from '../dashboard/TemplateGrid';
import type { UserRecord } from '../../types/auth';
import './AuthenticatedDashboard.css';

interface AuthenticatedDashboardProps {
  user: Omit<UserRecord, 'password_hash'>;
  onSignOut: () => void;
}

const INITIAL_PROJECTS: ProjectDetail[] = [
  {
    id: 'PRJ-1092',
    name: 'Monochrome Living Room Concept',
    roomType: 'Residential Living Room',
    dimensions: '24ft × 18ft',
    status: 'In Progress',
    image: '/images/living_room.png',
    updatedAt: 'Just now',
    rendersCount: 8,
    assets: ['Bouclé Sofa', 'Monochrome Coffee Table', 'Architectural Floor Lamp', 'Soft Wool Area Rug'],
  },
  {
    id: 'PRJ-1088',
    name: 'Executive Boardroom & Suite',
    roomType: 'Commercial Office',
    dimensions: '30ft × 20ft',
    status: 'Completed',
    image: '/images/executive_office.png',
    updatedAt: '2 hours ago',
    rendersCount: 16,
    assets: ['Minimalist Glass Executive Desk', 'Ergonomic Leather Chair', 'Acoustic Wall Panels', 'Linear Pendant Light'],
  },
  {
    id: 'PRJ-1074',
    name: 'Nordic Open Plan Bedroom',
    roomType: 'Residential Bedroom',
    dimensions: '16ft × 14ft',
    status: 'In Progress',
    image: '/images/nordic_bedroom.png',
    updatedAt: 'Yesterday',
    rendersCount: 5,
    assets: ['Platform Bed', 'Natural Oak Nightstand', 'Linen Bedding', 'Floor Mirror'],
  },
  {
    id: 'PRJ-1061',
    name: 'Architectural Kitchen Loft',
    roomType: 'Penthouse Apartment',
    dimensions: '22ft × 16ft',
    status: 'Draft',
    image: '/images/kitchen_loft.png',
    updatedAt: 'Aug 07, 2026',
    rendersCount: 3,
    assets: ['Marble Kitchen Island', 'Bar Stools', 'Pendant Lighting', 'Built-in Cabinetry'],
  },
];

export const AuthenticatedDashboard: React.FC<AuthenticatedDashboardProps> = ({
  user,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectsList, setProjectsList] = useState<ProjectDetail[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const handleNewProject = () => {
    const newId = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProj: ProjectDetail = {
      id: newId,
      name: 'New Architectural Living Design',
      roomType: 'Custom Concept',
      dimensions: '20ft × 16ft',
      status: 'In Progress',
      image: '/images/living_room.png',
      updatedAt: 'Just now',
      rendersCount: 1,
      assets: ['Modular Sofa', 'Accent Chair', 'Coffee Table', 'Ambient Lighting'],
    };
    setProjectsList(prev => [newProj, ...prev]);
    setSelectedProject(newProj);
  };

  const handleSelectTemplate = (template: RoomTemplate) => {
    const newProj: ProjectDetail = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: template.title,
      roomType: template.category,
      dimensions: template.dimensions,
      status: 'In Progress',
      image: template.image,
      updatedAt: 'Just now',
      rendersCount: 1,
      assets: template.assets,
    };
    setSelectedProject(newProj);
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
                Overview of your 3D interior design workspaces and MongoDB Atlas account details.
              </p>
            </div>
          </div>

          {/* 4 Stat Metric Cards */}
          <div className="metrics-grid">
            <MetricCard
              title="Active Workspaces"
              value={projectsList.length}
              change="+2 this week"
              icon={FolderKanban}
            />
            <MetricCard
              title="3D Room Renderings"
              value={32}
              change="+14.2%"
              icon={Maximize2}
            />
            <MetricCard
              title="Saved Decor Assets"
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
          <ProjectsTable
            projects={projectsList}
            onSelectProject={proj => setSelectedProject(proj)}
          />

          {/* Room Templates Grid */}
          <TemplateGrid onSelectTemplate={handleSelectTemplate} />
        </main>
      </div>

      {/* Project Detail Inspection Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
