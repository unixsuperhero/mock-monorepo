interface Activity {
  id: string;
  type: 'user' | 'system' | 'security';
  message: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

const typeColors = {
  user: 'bg-blue-100 text-blue-800',
  system: 'bg-green-100 text-green-800',
  security: 'bg-red-100 text-red-800',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <span className={`px-2 py-1 text-xs rounded ${typeColors[activity.type]}`}>
              {activity.type}
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-primary-600 text-sm hover:underline">
        View all activity
      </button>
    </div>
  );
}
