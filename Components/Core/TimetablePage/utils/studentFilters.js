/**
 * Filter students based on a search term and grade
 * @param {Array} students - The array of student objects
 * @param {string} searchTerm - The search term to filter by
 * @param {number|null} selectedGrade - The grade to filter by
 * @returns {Array} Filtered student array
 */
export const filterStudents = (students, searchTerm, selectedGrade = null) => {
  if (!Array.isArray(students)) return [];
  
  return students.filter(student => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      Object.values(student).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // If no grade selected, only apply search filter
    if (selectedGrade === null) return matchesSearch;
    
    // Convert selected grade to number for comparison
    const gradeToMatch = Number(selectedGrade);
    
    // Direct grade property match (most common case)
    if (student.grade !== undefined) {
      const studentGrade = Number(student.grade);
      if (!isNaN(studentGrade) && studentGrade === gradeToMatch) {
        return matchesSearch;
      }
    }
    
    // Check for grade level property
    if (student.gradeLevel !== undefined) {
      const studentGradeLevel = Number(student.gradeLevel);
      if (!isNaN(studentGradeLevel) && studentGradeLevel === gradeToMatch) {
        return matchesSearch;
      }
    }
    
    // Check if class property contains the grade number
    if (student.class) {
      const classStr = String(student.class).toLowerCase();
      if (
        classStr === String(gradeToMatch) ||
        classStr === `grade ${gradeToMatch}` ||
        classStr.includes(`grade ${gradeToMatch}`) ||
        classStr.includes(`g${gradeToMatch}`) ||
        classStr.includes(`gr ${gradeToMatch}`) ||
        classStr.includes(`gr${gradeToMatch}`)
      ) {
        return matchesSearch;
      }
    }
    
    // Check className if available
    if (student.className) {
      const classNameStr = String(student.className).toLowerCase();
      if (
        classNameStr === String(gradeToMatch) ||
        classNameStr.includes(`grade ${gradeToMatch}`) ||
        classNameStr.includes(`g${gradeToMatch}`)
      ) {
        return matchesSearch;
      }
    }
    
    // Check level if available
    if (student.level !== undefined) {
      const studentLevel = Number(student.level);
      if (!isNaN(studentLevel) && studentLevel === gradeToMatch) {
        return matchesSearch;
      }
    }
    
    // Check for year or class_year if tracking by year
    if (student.year !== undefined && Number(student.year) === gradeToMatch) {
      return matchesSearch;
    }
    
    // As a last resort, check all properties for the grade number
    for (const [key, value] of Object.entries(student)) {
      if (
        key.toLowerCase().includes('grade') || 
        key.toLowerCase().includes('class') || 
        key.toLowerCase().includes('level')
      ) {
        if (String(value).includes(String(gradeToMatch))) {
          return matchesSearch;
        }
      }
    }
    
    return false; // Not matching the grade filter
  });
};

/**
 * Paginate an array of students
 * @param {Array} students - The array of student objects
 * @param {number} currentPage - The current page number
 * @param {number} pageSize - Number of items per page
 * @returns {Array} Paginated students array
 */
export const paginateStudents = (students, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return students.slice(startIndex, startIndex + pageSize);
};
