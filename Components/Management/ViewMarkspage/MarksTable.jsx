import { formatMark, getAverageColor } from './utils/formatters';

export default function MarksTable({ filteredRows, processedData }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="sticky left-0 bg-gray-100 py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="sticky left-12 bg-gray-100 py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
            {processedData.tableSubjects.map(subject => (
              <th key={subject.id} className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {subject.name}
              </th>
            ))}
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-200">Average</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-200">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredRows.map((row, index) => (
            <tr key={row.student.id} className="hover:bg-gray-50">
              <td className="sticky left-0 bg-inherit py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="sticky left-12 bg-inherit py-4 px-4 whitespace-nowrap font-medium text-gray-900">
                {row.student.fullName || `Student ${row.student.id}`}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                {row.student.class_name || row.student.grade || '-'}
              </td>
              {row.marks.map((mark, idx) => (
                <td key={idx} className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                  {formatMark(mark)}
                </td>
              ))}
              <td className={`py-4 px-4 whitespace-nowrap text-sm ${getAverageColor(row.average)} bg-gray-50`}>
                {row.average !== '-' ? `${row.average}%` : '-'}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold text-gray-700 bg-gray-50">
                {row.total !== '-' ? `${row.total}` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
