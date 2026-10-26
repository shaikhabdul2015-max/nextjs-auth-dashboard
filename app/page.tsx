import React, { useState } from 'react';
import {
  ArrowRight,
  Database,
  Layers,
  Shield,
  Cpu,
  FolderTree,
  CheckCircle2,
  Code2,
  Terminal,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Modal } from '../components/ui/Modal.tsx';
import { AppView, User } from '../types/index.ts';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  user: User | null;
  isSupabaseLive: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  user,
  isSupabaseLive,
}) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoInputValue, setDemoInputValue] = useState('Production Release v1.0');
  const [selectedFileNode, setSelectedFileNode] = useState<string>('app');

  const fileTreeNodes = [
    {
      id: 'app',
      name: 'app/',
      description: 'Next.js App Router with layout.tsx, page.tsx, and route-driven nested views (login/, dashboard/).',
      badge: 'Routing & Layouts',
    },
    {
      id: 'components',
      name: 'components/ui/',
      description: 'Atomic design system featuring accessible Button, Input, and Modal components with WCAG AA compliance.',
      badge: 'Design System',
    },
    {
      id: 'lib',
      name: 'lib/supabase.ts',
      description: 'Universal database and authentication client connecting to Supabase with persistent local fallback.',
      badge: 'Persistence & Auth',
    },
    {
      id: 'hooks',
      name: 'hooks/useAuth.ts',
      description: 'Client state management hooks for reactive authentication and real-time project CRUD state.',
      badge: 'Custom Hooks',
    },
    {
      id: 'types',
      name: 'types/index.ts',
      description: 'Strict TypeScript interfaces for User entities, Project models, Metric analytics, and Activity events.',
      badge: 'Type Safety',
    },
  ];

  return (
    <div id="landing-page-root" className="min-h-screen bg-neutral-50/60 pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Modern Web Stack</span>
            <span className="text-neutral-300">|</span>
            <span className="font-mono text-neutral-600">TypeScript + Supabase Ready</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.1]">
            Architected for velocity, <br className="hidden sm:inline" />
            built with Next.js discipline.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            A production-ready foundation featuring modular UI components, robust Supabase
            authentication, real-time analytics dashboard, and type-safe architecture.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              id="hero-go-to-dashboard-btn"
              size="lg"
              onClick={() => onNavigate('dashboard')}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Launch Dashboard
            </Button>
            <Button
              id="hero-open-login-btn"
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('login')}
            >
              {user ? `Logged in as ${user.fullName.split(' ')[0]}` : 'Test Login & Auth'}
            </Button>
            <Button
              id="hero-test-modal-btn"
              variant="outline"
              size="lg"
              onClick={() => setDemoModalOpen(true)}
            >
              Test Modal Component
            </Button>
          </div>
        </div>

        {/* Live Architecture Visualizer */}
        <div className="mt-14 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Interactive File Tree Navigator */}
            <div className="w-full md:w-5/12 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderTree className="h-4 w-4 text-neutral-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Project Tree Spec
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  {fileTreeNodes.length} Core Modules
                </span>
              </div>

              <div className="space-y-1.5">
                {fileTreeNodes.map((node) => (
                  <button
                    key={node.id}
                    id={`file-tree-item-${node.id}`}
                    onClick={() => setSelectedFileNode(node.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                      selectedFileNode === node.id
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono font-medium">
                      <Code2 className="h-3.5 w-3.5 opacity-80" />
                      <span>{node.name}</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-sans ${
                        selectedFileNode === node.id
                          ? 'bg-neutral-800 text-neutral-200'
                          : 'bg-white border border-neutral-200 text-neutral-600'
                      }`}
                    >
                      {node.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Selected Node Details & Live Code Preview */}
            <div className="w-full md:w-7/12 rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-4">
              {(() => {
                const active = fileTreeNodes.find((n) => n.id === selectedFileNode)!;
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 font-mono">
                          {active.name}
                        </h3>
                        <p className="text-xs text-neutral-600 mt-1">
                          {active.description}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-neutral-200 text-neutral-800">
                        {active.badge}
                      </span>
                    </div>

                    <div className="rounded-lg border border-neutral-200 bg-white p-4 space-y-3 font-mono text-xs text-neutral-800">
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 border-b border-neutral-100 pb-2">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5 text-neutral-600" />
                          Architecture Status
                        </span>
                        <span className="text-emerald-600 font-sans font-semibold">Active in app</span>
                      </div>
                      <p className="text-neutral-600 leading-relaxed font-sans text-xs">
                        Every module in this layout is fully hooked up and operational in this
                        environment. You can navigate between routes, perform real authentication,
                        create projects, and trigger modals.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          id="tree-launch-action-btn"
                          size="sm"
                          onClick={() => {
                            if (active.id === 'login') onNavigate('login');
                            else onNavigate('dashboard');
                          }}
                        >
                          Explore {active.name.replace('/', '')}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Supabase Ready</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Configured with universal client abstractions in <code className="font-mono text-neutral-800 bg-neutral-100 px-1 py-0.5 rounded">lib/supabase.ts</code>. Seamlessly connects to live Supabase or runs offline with local storage.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Role-Based Access (RBAC)</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Includes multi-persona switching across Admin, Editor, and Viewer privileges with instant UI updates and permission enforcement.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Design System UI</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Modular components for Button, Input, and Modal engineered according to strict typographic scale, mathematical padding, and contrast standards.
            </p>
          </div>
        </div>

        {/* Interactive UI Component Playground */}
        <div className="mt-16 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
              Components Showcase
            </span>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">
              Interactive Component Playground
            </h2>
            <p className="text-xs text-neutral-500">
              Live interactive testing of the core design system components located in <code className="font-mono bg-neutral-100 px-1 rounded">components/ui/</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Input Component Showcase */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider font-mono">
                  Input.tsx
                </h4>
                <span className="text-[11px] text-neutral-500 font-mono">2-way bound</span>
              </div>
              <Input
                id="playground-interactive-input"
                label="Active Workspace Title"
                value={demoInputValue}
                onChange={(e) => setDemoInputValue(e.target.value)}
                helperText={`Current length: ${demoInputValue.length} characters`}
              />
            </div>

            {/* Button Component Showcase */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider font-mono">
                  Button.tsx Variants
                </h4>
                <span className="text-[11px] text-neutral-500 font-mono">5 variants</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button id="demo-btn-primary" variant="primary" size="sm">
                  Primary
                </Button>
                <Button id="demo-btn-secondary" variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button id="demo-btn-outline" variant="outline" size="sm">
                  Outline
                </Button>
                <Button id="demo-btn-ghost" variant="ghost" size="sm">
                  Ghost
                </Button>
                <Button id="demo-btn-destructive" variant="destructive" size="sm">
                  Destructive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Demo */}
      <Modal
        id="landing-demo-modal"
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Modal.tsx Component Verified"
        description="This modal demonstrates the accessible dialog component built with trap handling, escape key listener, and backdrop blur."
        footer={
          <>
            <Button
              id="landing-modal-cancel-btn"
              variant="outline"
              size="sm"
              onClick={() => setDemoModalOpen(false)}
            >
              Dismiss
            </Button>
            <Button
              id="landing-modal-confirm-btn"
              size="sm"
              onClick={() => {
                setDemoModalOpen(false);
                onNavigate('dashboard');
              }}
            >
              Continue to Dashboard
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Accessible dialog rendering and body scroll locking active.</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            The modal dynamically renders children, custom footer buttons, and handles keyboard accessibility without introducing external heavyweight dependencies.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
