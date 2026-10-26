import { useState, useEffect } from 'react';
import { Project, ProjectCategory, ProjectPriority, ProjectStatus } from '../types/index.ts';
import { supabase, getStoredProjects } from '../lib/supabase.ts';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase.from('projects').select();
      if (data && Array.isArray(data)) {
        setProjects(data as Project[]);
      } else {
        setProjects(getStoredProjects());
      }
    } catch {
      setProjects(getStoredProjects());
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (newProj: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const project: Project = {
      ...newProj,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [project, ...projects];
    setProjects(updated);
    await supabase.from('projects').insert([project]);
    return project;
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    await supabase.from('projects').delete().eq('id', id);
  };

  const updateProjectStatus = async (id: string, newStatus: ProjectStatus) => {
    const updated = projects.map(p =>
      p.id === id ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p
    );
    setProjects(updated);
    // save to local storage store
    localStorage.setItem('app_projects_store', JSON.stringify(updated));
  };

  const filteredProjects = projects.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return {
    projects: filteredProjects,
    rawProjectsCount: projects.length,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    addProject,
    deleteProject,
    updateProjectStatus,
    refresh: loadProjects,
  };
}
