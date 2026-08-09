'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  Maximize2,
  Bookmark,
  Database,
  Search,
  Plus,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Paintbrush,
  Grid,
  Settings,
  Layers,
  Calendar,
  ExternalLink,
  MoreHorizontal,
  ArrowRight,
  Layout,
  X,
  Edit3,
  Download,
} from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { AuthService, type UserRecord } from '@/lib/authService';

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

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectsList, setProjectsList] = useState<ProjectDetail[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    AuthService.checkAuth()
      .then(authenticatedUser => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          router.replace('/login');
        }
      })
      .catch(() => {
        router.replace('/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const handleSignOut = async () => {
    await AuthService.logout();
    router.push('/login');
  };

  const handleNewProject = () => {
    const newProj: ProjectDetail = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'New Custom Room Design',
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

  if (isLoading || !user) {
    return (
      <div className="auth-grid-bg min-h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
          <Logo size={36} showWordmark={true} />
          <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-gray-500">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 bg-white z-40">
        <div className="flex items-center gap-4">
          <Logo size={28} showWordmark={true} />
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-6 relative items-center">
          <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, room designs, furniture..."
            className="w-full h-9 pl-9 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-gray-900 transition-all"
          />
          <kbd className="absolute right-3 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNewProject}
            className="h-9 px-3.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>New Project</span>
          </button>

          <div className="flex items-center gap-2 px-2.5 py-1 border border-gray-200 rounded-full bg-gray-50">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">
              <UserIcon size={13} />
            </div>
            <span className="text-xs font-semibold text-gray-900">@{user.user_id}</span>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 border-r border-gray-200 p-4 hidden md:flex flex-col justify-between flex-shrink-0">
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider px-3 block">
              WORKSPACE
            </span>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: FolderKanban },
                { id: 'canvas', label: 'Room Canvas', icon: Paintbrush },
                { id: 'catalog', label: 'Decor Catalog', icon: Grid },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full h-10 px-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isActive ? 'bg-gray-100 text-gray-900 border border-gray-200 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Database Footer Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-900">
              <Database size={15} />
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-xs font-semibold text-gray-900">MongoDB Atlas</span>
              <span className="text-[10px] text-gray-500">Connected Live</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl overflow-y-auto">
          {/* Welcome Banner */}
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Welcome back, {user.full_name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Next.js 15 App Router & React 19 interior design workspace
            </p>
          </div>

          {/* 4 Stat Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Active Workspaces', value: projectsList.length, change: '+2 this week', icon: FolderKanban },
              { title: '3D Room Renderings', value: 32, change: '+14.2%', icon: Maximize2 },
              { title: 'Saved Decor Assets', value: 124, change: 'Catalog', icon: Bookmark },
              { title: 'Database Node', value: 'MongoDB', change: 'Atlas Live', icon: Database },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">{metric.title}</span>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{metric.value}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-700">
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Projects Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mt-8">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-base font-bold text-gray-900">Recent Decor Workspaces</h3>
                <p className="text-xs text-gray-500 mt-0.5">Overview of active 3D interior design projects</p>
              </div>
              <button type="button" className="px-3 py-1.5 border border-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-50">
                View All ({projectsList.length})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Project & 3D Render</th>
                    <th className="py-3 px-3">Room Type</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Renderings</th>
                    <th className="py-3 px-3">Last Updated</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projectsList.map(project => (
                    <tr
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-3 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-gray-900 border border-gray-200 overflow-hidden flex-shrink-0">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block text-sm">{project.name}</span>
                          <span className="text-[11px] text-gray-400 font-mono">ID: {project.id}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-gray-600 font-medium">{project.roomType}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-gray-900 bg-gray-50 text-gray-900">
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-gray-500 font-medium">{project.rendersCount} views</td>
                      <td className="py-3.5 px-3 text-gray-500 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={12} /> {project.updatedAt}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right" onClick={e => e.stopPropagation()}>
                        <div className="inline-flex gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="p-1.5 rounded-lg border border-transparent hover:border-gray-200 text-gray-500 hover:text-gray-900"
                          >
                            <ExternalLink size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Room Templates */}
          <div className="mt-8">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">Quick Room Templates</h3>
              <p className="text-xs text-gray-500 mt-0.5">Start your next interior design workspace from curated 3D renders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Monochrome Minimalist Living Room',
                  category: 'Residential Living Room',
                  dimensions: '24ft × 18ft',
                  itemsCount: 14,
                  image: '/images/living_room.png',
                },
                {
                  title: 'Executive Conference Suite',
                  category: 'Commercial Office',
                  dimensions: '30ft × 20ft',
                  itemsCount: 22,
                  image: '/images/executive_office.png',
                },
                {
                  title: 'Nordic Open Plan Bedroom',
                  category: 'Residential Bedroom',
                  dimensions: '16ft × 14ft',
                  itemsCount: 10,
                  image: '/images/nordic_bedroom.png',
                },
              ].map((tmpl, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all"
                  onClick={handleNewProject}
                >
                  <div className="h-40 bg-gray-900 relative overflow-hidden">
                    <img src={tmpl.image} alt={tmpl.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-gray-900 flex items-center gap-1">
                      <Layout size={12} /> {tmpl.category}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 leading-snug">{tmpl.title}</h4>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{tmpl.dimensions}</span>
                      <span>•</span>
                      <span>{tmpl.itemsCount} Assets</span>
                    </div>
                    <button
                      type="button"
                      className="mt-2 w-full h-9 bg-gray-50 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-gray-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Use Template</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Project Inspection Drawer Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="p-5 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{selectedProject.roomType}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-0.5">{selectedProject.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="h-60 bg-gray-900 relative">
                <img src={selectedProject.image} alt={selectedProject.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                  <Maximize2 size={13} /> 3D Architectural Render
                </div>
              </div>

              <div className="p-6 flex flex-col gap-6 flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <span className="text-[11px] text-gray-500 block">Dimensions</span>
                    <strong className="text-sm font-bold text-gray-900">{selectedProject.dimensions}</strong>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <span className="text-[11px] text-gray-500 block">Status</span>
                    <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-gray-900 bg-white text-gray-900">
                      {selectedProject.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 mb-2">
                    <Layers size={14} /> Included Furniture & Decor Assets ({selectedProject.assets.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.assets.map((asset, idx) => (
                      <span key={idx} className="bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto space-y-2">
                  <button type="button" className="w-full h-11 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all">
                    <Edit3 size={16} />
                    <span>Edit Room Layout</span>
                  </button>
                  <button type="button" className="w-full h-10 border border-gray-200 hover:bg-gray-50 text-gray-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all">
                    <Download size={15} />
                    <span>Export High-Res Render</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
