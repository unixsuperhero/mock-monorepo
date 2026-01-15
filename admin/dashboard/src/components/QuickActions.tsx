import Link from 'next/link';

const actions = [
  { name: 'Add User', href: '/users?action=create', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z' },
  { name: 'View Logs', href: '/logs', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Clear Cache', href: '#', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { name: 'Restart Services', href: '#', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
            </svg>
            <span className="text-sm font-medium">{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
