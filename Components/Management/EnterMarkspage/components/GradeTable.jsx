export default function GradeTable({ students, subjects, subjectMarks, onMarksChange, calculateTotalMarks }) {
  return (
    <div className="hidden md:block bg-white shadow-md rounded">
      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-2 text-left w-[10%]">No.</th>
              <th className="py-3 px-2 text-left w-[15%]">First Name</th>
              <th className="py-3 px-2 text-left w-[15%]">Last Name</th>
              {subjects.map(subject => (
                <th key={subject} className="py-3 px-2 text-center w-[10%]">{subject}</th>
              ))}
              <th className="py-3 px-2 text-center w-[10%]">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {students.map((student, index) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2 truncate">{student.first_name}</td>
                <td className="py-3 px-2 truncate">{student.last_name}</td>
                {subjects.map(subject => (
                  <td key={`${student.id}-${subject}`} className="py-3 px-2 text-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      onWheel={(e) => e.target.blur()}
                      value={subjectMarks[student.id]?.[subject] || ''}
                      onChange={(e) => onMarksChange(student.id, subject, e.target.value)}
                      className={`w-16 py-1 px-2 border rounded ${
                        subjectMarks[student.id]?.[subject] === '' ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </td>
                ))}
                <td className="py-3 px-2 text-center font-bold">
                  {calculateTotalMarks(student.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
