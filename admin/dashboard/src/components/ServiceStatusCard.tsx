interface Service {
  name: string;
  status: 'running' | 'stopped' | 'error';
  cpu: number;
  memory: number;
}

interface ServiceStatusCardProps {
  services?: Service[];
}

const statusColors = {
  running: 'bg-green-500',
  stopped: 'bg-gray-400',
  error: 'bg-red-500',
};

export function ServiceStatusCard({ services }: ServiceStatusCardProps) {
  if (!services) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Services</h2>

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${statusColors[service.status]} mr-2`}></div>
              <span className="text-sm font-medium">{service.name}</span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>CPU: {service.cpu}%</span>
              <span>MEM: {service.memory}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
