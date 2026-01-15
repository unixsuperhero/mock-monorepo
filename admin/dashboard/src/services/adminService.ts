import { apiClient } from './apiClient';

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: string;
  lastIncident: string;
  responseTime: number;
}

interface Service {
  name: string;
  status: 'running' | 'stopped' | 'error';
  cpu: number;
  memory: number;
}

interface Activity {
  id: string;
  type: 'user' | 'system' | 'security';
  message: string;
  timestamp: string;
}

export const adminService = {
  async getSystemHealth(): Promise<SystemHealth> {
    // Mock data for demo
    return {
      status: 'healthy',
      uptime: '99.99%',
      lastIncident: '15 days ago',
      responseTime: 125,
    };
  },

  async getServiceStatus(): Promise<Service[]> {
    return [
      { name: 'customers-api', status: 'running', cpu: 23, memory: 45 },
      { name: 'customers-frontend', status: 'running', cpu: 12, memory: 38 },
      { name: 'managers-api', status: 'running', cpu: 18, memory: 42 },
      { name: 'managers-frontend', status: 'running', cpu: 15, memory: 35 },
      { name: 'database', status: 'running', cpu: 45, memory: 68 },
    ];
  },

  async getRecentActivity(): Promise<Activity[]> {
    return [
      { id: '1', type: 'user', message: 'New customer registration: john@example.com', timestamp: '2 minutes ago' },
      { id: '2', type: 'security', message: 'Failed login attempt from 192.168.1.100', timestamp: '15 minutes ago' },
      { id: '3', type: 'system', message: 'Database backup completed successfully', timestamp: '1 hour ago' },
      { id: '4', type: 'user', message: 'Employee role updated: jane@company.com -> manager', timestamp: '2 hours ago' },
      { id: '5', type: 'system', message: 'Cache cleared for customers-api', timestamp: '3 hours ago' },
    ];
  },

  async clearCache(service?: string): Promise<void> {
    // Mock implementation
    console.log('Clearing cache for', service || 'all services');
  },

  async restartService(service: string): Promise<void> {
    // Mock implementation
    console.log('Restarting', service);
  },
};
