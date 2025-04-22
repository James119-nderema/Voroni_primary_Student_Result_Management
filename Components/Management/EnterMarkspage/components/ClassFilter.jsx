export default function ClassFilter({ selectedClass, onClassChange }) {
  const gradeOptions = Array.from({ length: 9 }, (_, i) => `Grade ${i + 1}`);
  
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="class-filter">
        Filter by Class:
      </label>
      <select
        id="class-filter"
        value={selectedClass}
        onChange={(e) => onClassChange(e.target.value)}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
      >
        {gradeOptions.map(grade => (
          <option key={grade} value={grade}>{grade}</option>
        ))}
      </select>
    </div>
  );
}
