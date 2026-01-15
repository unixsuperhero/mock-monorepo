interface EmployeeReport {
  totalEmployees: number;
  newHires: number;
  terminations: number;
  departmentBreakdown: Array<{
    department: string;
    employeeCount: number;
    totalSalary: number;
  }>;
}

interface EmployeeReportCardProps {
  report?: EmployeeReport;
  isLoading: boolean;
}

export function EmployeeReportCard({ report, isLoading }: EmployeeReportCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Employee Report</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            {report?.totalEmployees}
          </p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">
            +{report?.newHires}
          </p>
          <p className="text-sm text-gray-500">New Hires</p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-2xl font-bold text-red-600">
            -{report?.terminations}
          </p>
          <p className="text-sm text-gray-500">Terminations</p>
        </div>
      </div>

      <h3 className="font-medium mb-3">By Department</h3>
      <div className="space-y-2">
        {report?.departmentBreakdown.map((dept) => (
          <div key={dept.department} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>{dept.department}</span>
            <div className="text-right">
              <span className="text-sm text-gray-500 mr-4">{dept.employeeCount} people</span>
              <span className="font-medium">${(dept.totalSalary / 1000).toFixed(0)}k</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
