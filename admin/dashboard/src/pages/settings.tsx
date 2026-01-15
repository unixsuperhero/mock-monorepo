import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { AdminLayout } from '@/components/AdminLayout';
import { settingsService } from '@/services/settingsService';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const { data: settings, isLoading } = useQuery('settings', () =>
    settingsService.getSettings()
  );

  const updateSettings = useMutation((data: any) =>
    settingsService.updateSettings(data)
  );

  const tabs = [
    { id: 'general', name: 'General' },
    { id: 'security', name: 'Security' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'integrations', name: 'Integrations' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Name
                </label>
                <input
                  type="text"
                  defaultValue={settings?.appName}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue={settings?.supportEmail}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Require 2FA for admin users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Session Timeout</h3>
                  <p className="text-sm text-gray-500">Auto logout after inactivity</p>
                </div>
                <select className="px-3 py-2 border rounded-lg">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email for important events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Slack Integration</h3>
                  <p className="text-sm text-gray-500">Send alerts to Slack channel</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">S</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-gray-500">Payment processing</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Connected</span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">M</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Mailchimp</h3>
                      <p className="text-sm text-gray-500">Email marketing</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Connect</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4 flex justify-end">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
