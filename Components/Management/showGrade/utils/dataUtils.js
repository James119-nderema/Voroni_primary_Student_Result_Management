import { format } from "date-fns";

export const filterData = (data, filters) => {
  const { searchTerm, filteredMonth, filteredClass, students } = filters;
  if (!data || !Array.isArray(data)) return [];
  
  return data.filter(item => {
    // Filter by student name
    if (searchTerm) {
      const student = students[item.student];
      if (!student) return false;
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      if (!fullName.includes(searchTerm.toLowerCase())) return false;
    }
    
    // Filter by month
    if (filteredMonth && item.submission_date) {
      const date = new Date(item.submission_date);
      if (format(date, "yyyy-MM") !== filteredMonth) return false;
    }
    
    // Filter by class
    if (filteredClass) {
      const student = students[item.student];
      if (!student || student.class_name !== filteredClass) return false;
    }
    
    return true;
  });
};

export const calculateStats = (data) => {
  if (!data || !data.length) {
    return {
      totalStudents: 0,
      avgScore: '0',
      topGrade: '0',
      passingRate: '0'
    };
  }

  const totalStudents = data.length;
  const totalScores = data.reduce((sum, item) => sum + (Number(item.total_marks) || 0), 0);
  const avgScore = totalScores / (totalStudents * 5); // Average per subject (5 subjects)

  // Count students with average mark > 70%
  const topGradeCount = data.filter(item => {
    const avgMarkPerSubject = item.total_marks / 5;
    return avgMarkPerSubject >= 70;
  }).length;

  // Count students with average mark > 40%
  const passingCount = data.filter(item => {
    const avgMarkPerSubject = item.total_marks / 5;
    return avgMarkPerSubject >= 40;
  }).length;

  return {
    totalStudents,
    avgScore: avgScore.toFixed(1),
    topGrade: ((topGradeCount / totalStudents) * 100).toFixed(1),
    passingRate: ((passingCount / totalStudents) * 100).toFixed(1)
  };
};
