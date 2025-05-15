/**
 * Process the raw data into structured format for the marks table
 */
export function processTableData(allMarks, subjects, students) {
  console.log('Processing data with:', {
    marksLength: allMarks.length,
    subjectsLength: subjects.length,
    studentsLength: students.length
  });
  
  // If we have no marks data yet, don't process further
  if (allMarks.length === 0) {
    console.log('No marks data to process');
    return { tableSubjects: [], studentRows: [] };
  }
  
  // Extract unique subject IDs from marks data
  const uniqueSubjectIds = [...new Set(
    allMarks
      .filter(mark => mark && mark.subject_id) // Ensure we have valid marks with subject_id
      .map(mark => mark.subject_id)
  )];
  
  console.log('Unique subject IDs:', uniqueSubjectIds);
  
  // Sort subject IDs in ascending order
  uniqueSubjectIds.sort((a, b) => a - b);
  
  // Map subject IDs to their full subject objects
  const tableSubjects = uniqueSubjectIds
    .map(id => subjects.find(subject => subject && subject.id === id))
    .filter(subject => subject !== undefined); // Filter out any undefined subjects
  
  console.log('Table subjects:', tableSubjects);
  
  // Create a map of student marks by student ID and subject ID
  const marksMap = {};
  allMarks.forEach(mark => {
    if (!mark || !mark.student_id || !mark.subject_id) return; // Skip invalid marks
    
    if (!marksMap[mark.student_id]) {
      marksMap[mark.student_id] = {};
    }
    marksMap[mark.student_id][mark.subject_id] = mark;
  });
  
  console.log('Marks map:', marksMap);
  
  // Create row data for each student
  const studentRows = students
    .filter(student => student && student.id) // Ensure we have valid students
    .map(student => {
      const studentMarks = marksMap[student.id] || {};
      const marks = tableSubjects.map(subject => studentMarks[subject.id] || null);
      
      // Calculate average and total for student using calculated_mark field
      const validMarks = marks.filter(mark => 
        mark && 
        mark.calculated_mark !== undefined && 
        mark.calculated_mark !== null && 
        mark.calculated_mark !== '-'
      );
      
      const total = validMarks.reduce((sum, mark) => {
        const markValue = parseFloat(mark.calculated_mark);
        return isNaN(markValue) ? sum : sum + markValue;
      }, 0);
      
      const average = validMarks.length > 0 
        ? (total / validMarks.length).toFixed(1) 
        : '-';
      
      return {
        student: student,
        marks: marks,
        average: average,
        total: validMarks.length > 0 ? total.toFixed(1) : '-'
      };
    });
  
  console.log('Student rows:', studentRows);
  
  return {
    tableSubjects,
    studentRows
  };
}

/**
 * Extract unique grades from students
 */
export function extractUniqueGrades(students) {
  if (!students.length) return [];
  
  const grades = new Set();
  students.forEach(student => {
    const grade = student.class_name || student.grade;
    if (grade) grades.add(grade);
  });
  
  return Array.from(grades).sort();
}

/**
 * Filter rows based on selected grade and search term
 */
export const filterStudentRowsByMonth = (rows, selectedMonth) => {
  if (!selectedMonth) {
    return rows; // Return all rows if no month is selected
  }
  
  console.log('Filtering by month:', selectedMonth);
  
  return rows.filter(student => {
    // Debug logging to understand the data structure
    if (student.marks.some(m => m && m.submission_date)) {
      console.log('Student has marks with dates:', 
        student.student.fullName || `Student ${student.student.id}`,
        student.marks.filter(m => m && m.submission_date).map(m => m.submission_date)
      );
    }
    
    // Check if any of the student's marks were submitted in the selected month
    const hasMarksInMonth = student.marks.some(mark => {
      if (!mark || !mark.submission_date) return false;
      
      try {
        const markDate = new Date(mark.submission_date);
        // Check if date is valid
        if (isNaN(markDate.getTime())) {
          console.log('Invalid date:', mark.submission_date);
          return false;
        }
        
        const markMonth = markDate.getMonth();
        const selectedMonthInt = parseInt(selectedMonth);
        
        console.log(
          'Comparing mark month:', markMonth, 
          'with selected month:', selectedMonthInt,
          'Date:', mark.submission_date
        );
        
        return markMonth === selectedMonthInt;
      } catch (error) {
        console.error('Error processing date:', error, mark.submission_date);
        return false;
      }
    });
    
    return hasMarksInMonth;
  });
};

export function filterStudentRows(studentRows, selectedGrade, searchTerm, selectedMonth) {
  if (!studentRows.length) return [];
  
  let filteredRows = studentRows;
  
  // Filter by grade if selected
  if (selectedGrade) {
    filteredRows = filteredRows.filter(row => 
      row.student.class_name === selectedGrade || 
      row.student.grade === selectedGrade
    );
  }
  
  // Filter by search term if provided
  if (searchTerm) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    filteredRows = filteredRows.filter(row => {
      const studentName = row.student.fullName || `Student ${row.student.id}`;
      return studentName.toLowerCase().includes(lowerCaseTerm);
    });
  }
  
  // Filter by month if selected
  if (selectedMonth) {
    filteredRows = filterStudentRowsByMonth(filteredRows, selectedMonth);
  }
  
  return filteredRows;
}
