interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: string;
  lastIncident: string;
  responseTime: number;
}

interface SystemHealthCardProps {
  health?: SystemHealth;
}

const statusColors = {
  healthy: 'bg-green-500',
  degraded: 'bg-yellow-500',
  critical: 'bg-red-500',
};

const statusLabels = {
  healthy: 'All Systems Operational',
  degraded: 'Partial System Outage',
  critical: 'Major System Outage',
};

export function SystemHealthCard({ health }: SystemHealthCardProps) {
  if (!health) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">System Health</h2>

      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full ${statusColors[health.status]} mr-2`}></div>
        <span className="font-medium">{statusLabels[health.status]}</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Uptime</span>
          <span className="font-medium">{health.uptime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Response Time</span>
          <span className="font-medium">{health.responseTime}ms</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last Incident</span>
          <span className="font-medium">{health.lastIncident}</span>
        </div>
      </div>
    </div>
  );
}
