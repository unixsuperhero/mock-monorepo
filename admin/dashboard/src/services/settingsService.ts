import { apiClient } from './apiClient';

interface Settings {
  appName: string;
  supportEmail: string;
  timezone: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  emailNotifications: boolean;
  slackIntegration: boolean;
}

export const settingsService = {
  async getSettings(): Promise<Settings> {
    // Mock data
    return {
      appName: 'Mock Monorepo',
      supportEmail: 'support@example.com',
      timezone: 'America/New_York',
      twoFactorEnabled: true,
      sessionTimeout: 30,
      emailNotifications: true,
      slackIntegration: false,
    };
  },

  async updateSettings(data: Partial<Settings>): Promise<Settings> {
    const response = await apiClient.put<Settings>('/settings', data);
    return response.data;
  },

  async testEmailConnection(): Promise<boolean> {
    // Mock implementation
    return true;
  },

  async testSlackConnection(): Promise<boolean> {
    // Mock implementation
    return false;
  },
};
