import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { userService } from '@/services/userService';

interface CreateUserModalProps {
  userType: 'customer' | 'employee';
  onClose: () => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: string;
  department?: string;
}

export function CreateUserModal({ userType, onClose }: CreateUserModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const createUser = useMutation(
    (data: FormData) => userService.createUser(data, userType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users', userType]);
        onClose();
      },
    }
  );

  const onSubmit = (data: FormData) => {
    createUser.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Create {userType === 'customer' ? 'Customer' : 'Employee'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                {...register('firstName', { required: 'Required' })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                {...register('lastName', { required: 'Required' })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email', { required: 'Required' })}
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register('password', { required: 'Required', minLength: 8 })}
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {userType === 'employee' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  {...register('role', { required: 'Required' })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  {...register('department')}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
