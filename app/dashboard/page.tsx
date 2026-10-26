import React, { useState } from 'react';
import {
  FolderKanban,
  Zap,
  Activity,
  Users,
  Plus,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Shield,
  Database,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { Sidebar } from '../../components/Sidebar.tsx';
import {
  User,
  Project,
  ProjectStatus,
  ProjectPriority,
  AppView,
} from '../../types/index.ts';
import {
  INITIAL_METRICS,
  INITIAL_ACTIVITIES,
  DEMO_USERS,
} from '../../lib/constants.ts';
import { formatDate, formatRelativeTime } from '../../lib/utils.ts';
import { useProjects } from '../../hooks/useProjects.ts';

interface DashboardPageProps {
  user: User | null;
  onNavigate: (view: AppView) => void;
  isSupabaseLive: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onNavigate,
  isSupabaseLive,
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Form State for New Project
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'Mobile'>('Frontend');
  const [priority, setPriority] = useState<ProjectPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState('');

  const {
    projects,
    rawProjectsCount,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    addProject,
    deleteProject,
    updateProjectStatus,
  } = useProjects();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Project title is required.');
      return;
    }

    await addProject({
      title: title.trim(),
      description: description.trim() || 'No description provided.',
      category,
      priority,
      status: 'active',
      progress: 0,
      dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      assignees: [
        {
          id: user?.id || 'usr-default',
          name: user?.fullName || 'Active Developer',
          avatarUrl: user?.avatarUrl,
        },
      ],
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Frontend');
    setPriority('medium');
    setDueDate('');
    setFormError('');
    setIsNewProjectModalOpen(false);
  };

  const getPriorityBadge = (p: ProjectPriority) => {
    const map = {
      low: 'bg-neutral-100 text-neutral-600 border-neutral-200',
      medium: 'bg-blue-50 text-blue-700 border-blue-200',
      high: 'bg-amber-50 text-amber-700 border-amber-200',
      urgent: 'bg-rose-50 text-rose-700 border-rose-200',
    };
    return (
      <span
        className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border ${map[p]}`}
      >
        {p}
      </span>
    );
  };

  const getStatusBadge = (s: ProjectStatus) => {
    const map = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      in_review: 'bg-amber-50 text-amber-700 border-amber-200',
      completed: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      archived: 'bg-neutral-100 text-neutral-500 border-neutral-200',
    };
    return (
      <span
        className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border ${map[s]}`}
      >
        {s.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div id="dashboard-container" className="flex min-h-[calc(100vh-4rem)] bg-neutral-50/60">
      {/* Structural Sidebar Component */}
      <Sidebar
        currentView="dashboard"
        setCurrentView={onNavigate}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        projectCount={rawProjectsCount}
        user={user}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
      />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-neutral-950">
                {activeSection === 'overview' && 'Engineering Overview'}
                {activeSection === 'projects' && 'Active Workspaces & Projects'}
                {activeSection === 'analytics' && 'Performance & Velocity Analytics'}
                {activeSection === 'team' && 'Team & Contributors'}
                {activeSection === 'database' && 'Supabase Schema & Store'}
                {activeSection === 'settings' && 'Workspace Configuration'}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-200/80 text-neutral-700 font-semibold">
                {user?.role?.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Synchronized with <code className="font-mono text-neutral-700">lib/supabase.ts</code> data layer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              id="dashboard-new-project-header-btn"
              size="sm"
              onClick={() => setIsNewProjectModalOpen(true)}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Project
            </Button>
          </div>
        </div>

        {/* Overview Stats (visible on overview or analytics) */}
        {(activeSection === 'overview' || activeSection === 'analytics') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIAL_METRICS.map((metric) => {
              return (
                <div
                  key={metric.id}
                  className="rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-medium">{metric.label}</span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {metric.period}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold tracking-tight text-neutral-900">
                      {metric.id === 'metric-1' ? rawProjectsCount : metric.value}
                    </span>
                    <span
                      className={`text-xs font-semibold flex items-center gap-0.5 ${
                        metric.changeType === 'increase'
                          ? 'text-emerald-600'
                          : 'text-neutral-500'
                      }`}
                    >
                      <ArrowUpRight className="h-3 w-3" />
                      {metric.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION: Overview or Projects */}
        {(activeSection === 'overview' || activeSection === 'projects') && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="rounded-xl border border-neutral-200 bg-white p-3.5 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  id="project-search-input"
                  type="text"
                  placeholder="Filter projects by title, category, or stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              {/* Status Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-500 whitespace-nowrap">
                  Status:
                </span>
                <select
                  id="status-filter-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="in_review">In Review</option>
                  <option value="completed">Completed</option>
                </select>

                {/* Category Select */}
                <span className="text-xs font-medium text-neutral-500 whitespace-nowrap ml-2">
                  Track:
                </span>
                <select
                  id="category-filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                >
                  <option value="all">All Tracks</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Design">Design</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
            </div>

            {/* Project Table / Grid */}
            <div className="rounded-xl border border-neutral-200 bg-white shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Project Workspaces
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Showing {projects.length} of {rawProjectsCount} total records
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-500">
                    Storage: <span className="font-semibold text-neutral-800">lib/supabase</span>
                  </span>
                </div>
              </div>

              {projects.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">No projects match criteria</p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Try adjusting your search keywords or clear the category/status filters.
                  </p>
                  <Button
                    id="clear-filters-btn"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStatus('all');
                      setSelectedCategory('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 hover:bg-neutral-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Left info */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-sm font-bold text-neutral-900 truncate">
                            {proj.title}
                          </h4>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-neutral-100 text-neutral-700">
                            {proj.category}
                          </span>
                          {getPriorityBadge(proj.priority)}
                          {getStatusBadge(proj.status)}
                        </div>
                        <p className="text-xs text-neutral-600 line-clamp-1">
                          {proj.description}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-1">
                          <span>Due: {formatDate(proj.dueDate)}</span>
                          <span>•</span>
                          <span>Updated {formatRelativeTime(proj.updatedAt)}</span>
                        </div>
                      </div>

                      {/* Right controls */}
                      <div className="flex items-center gap-4 shrink-0">
                        {/* Progress */}
                        <div className="w-28 space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-neutral-500">
                            <span>Progress</span>
                            <span className="font-semibold text-neutral-700">{proj.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                            <div
                              className="h-full bg-neutral-900 rounded-full transition-all duration-300"
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Status Toggle Action */}
                        <select
                          id={`change-status-${proj.id}`}
                          value={proj.status}
                          onChange={(e) => updateProjectStatus(proj.id, e.target.value as ProjectStatus)}
                          className="text-xs border border-neutral-200 rounded-md px-2 py-1 bg-white text-neutral-700 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                        >
                          <option value="active">Active</option>
                          <option value="in_review">In Review</option>
                          <option value="completed">Completed</option>
                          <option value="archived">Archived</option>
                        </select>

                        {/* Delete Button */}
                        <button
                          id={`delete-proj-${proj.id}`}
                          onClick={() => deleteProject(proj.id)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Project"
                          aria-label="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Activity Feed */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-neutral-700" />
                  <h3 className="text-sm font-bold text-neutral-900">Live Team Activity</h3>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">WebSocket / RLS Log</span>
              </div>

              <div className="space-y-3">
                {INITIAL_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <span className="font-semibold text-neutral-900">{act.userName}</span>{' '}
                      <span className="text-neutral-600">{act.action}</span>{' '}
                      <span className="font-semibold text-neutral-800 font-mono">
                        "{act.target}"
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono shrink-0">
                      {formatRelativeTime(act.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Team */}
        {activeSection === 'team' && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Workspace Contributors</h3>
            <p className="text-xs text-neutral-500">
              Users registered within the authentication database and assigned role scopes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {DEMO_USERS.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3 text-left"
                >
                  <img
                    src={member.avatarUrl}
                    alt={member.fullName}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{member.fullName}</h4>
                    <p className="text-xs text-neutral-500 truncate">{member.email}</p>
                    <span className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white border border-neutral-200 text-neutral-700">
                      Role: {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: Database / Supabase */}
        {activeSection === 'database' && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Supabase Layer Configuration
                </h3>
                <p className="text-xs text-neutral-500">
                  Implementation mapped to <code className="font-mono">lib/supabase.ts</code>
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  isSupabaseLive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {isSupabaseLive ? 'Connected Live' : 'Active Local Store'}
              </span>
            </div>

            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
              <p>
                The client in <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">lib/supabase.ts</code> encapsulates
                Supabase authentication and real-time tables with zero configuration crashes:
              </p>
              <div className="rounded-lg bg-neutral-900 p-4 font-mono text-[11px] text-neutral-200 space-y-2">
                <p className="text-emerald-400">// Supabase Tables Registered</p>
                <p>1. "projects" — Primary project workspace records</p>
                <p>2. "auth.users" — Session tokens &amp; RBAC roles</p>
                <p>3. "activities" — Audit trail logs</p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Settings */}
        {activeSection === 'settings' && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Workspace Settings</h3>
            <p className="text-xs text-neutral-500">
              Manage organization preferences, deployment notifications, and environment variables.
            </p>
            <div className="pt-2 space-y-3 max-w-md">
              <Input
                id="settings-org-name"
                label="Organization Name"
                defaultValue="Acme Technologies"
              />
              <Input
                id="settings-support-email"
                label="Alerts Destination"
                defaultValue="eng-alerts@acme.com"
              />
              <Button id="save-settings-btn" size="sm">
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Add Project */}
      <Modal
        id="new-project-modal"
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Project"
        description="Add a new engineering initiative to the workspace database."
        footer={
          <>
            <Button
              id="cancel-new-project-btn"
              variant="outline"
              size="sm"
              onClick={() => setIsNewProjectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              id="submit-new-project-btn"
              size="sm"
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          {formError && (
            <div className="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {formError}
            </div>
          )}

          <Input
            id="new-project-title-input"
            label="Project Title"
            placeholder="e.g. Next.js 15 Migration"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-neutral-700">
              Description
            </label>
            <textarea
              id="new-project-description-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline project milestones, scope, and target outcomes..."
              className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-neutral-700">
                Track Category
              </label>
              <select
                id="new-project-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">Design</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-neutral-700">
                Priority
              </label>
              <select
                id="new-project-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as ProjectPriority)}
                className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <Input
            id="new-project-duedate-input"
            label="Target Delivery Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
