import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AdminLayout } from '@/components/AdminLayout';
import { UserTable } from '@/components/UserTable';
import { CreateUserModal } from '@/components/CreateUserModal';
import { userService } from '@/services/userService';

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'employee'>('customer');
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery(['users', userType], () =>
    userService.getUsers(userType)
  );

  const deleteUser = useMutation(
    (id: string) => userService.deleteUser(id, userType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users', userType]);
      },
    }
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setUserType('customer')}
            className={`px-4 py-2 rounded-lg ${
              userType === 'customer'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setUserType('employee')}
            className={`px-4 py-2 rounded-lg ${
              userType === 'employee'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Employees
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      ) : (
        <UserTable
          users={users || []}
          userType={userType}
          onDelete={(id) => deleteUser.mutate(id)}
        />
      )}

      {isModalOpen && (
        <CreateUserModal
          userType={userType}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </AdminLayout>
  );
}
