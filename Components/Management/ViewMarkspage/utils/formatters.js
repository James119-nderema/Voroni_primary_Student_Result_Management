/**
 * Format the mark for display
 */
export function formatMark(mark) {
  if (!mark) return '-';
  if (mark.raw_mark === '-') return 'Absent';
  
  // Use calculated_marks from backend if available
  if (mark.calculated_mark !== undefined) {
    return `${mark.calculated_mark}%`;
  }
  
  // If no calculated_marks available, return a dash
  return '-';
}

/**
 * Determine color based on average mark
 */
export function getAverageColor(average) {
  if (average === '-') return '';
  
  const value = parseFloat(average);
  if (value >= 90) return 'text-green-700 font-bold';
  if (value >= 75) return 'text-green-600 font-semibold';
  if (value >= 58) return 'text-blue-600 font-semibold';
  if (value >= 41) return 'text-blue-500';
  if (value >= 31) return 'text-yellow-600';
  if (value >= 21) return 'text-yellow-500';
  if (value >= 11) return 'text-red-600';
  return 'text-red-500';
}
