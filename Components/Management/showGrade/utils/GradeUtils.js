export const getGrade = (marks) => {
  if (marks > 70) return "E.E";
  if (marks > 60) return "M.E";
  if (marks > 40) return "A.E";
  return "B.E";
};

export const GradeColorMap = {
  "E.E": "text-green-600 font-semibold",
  "M.E": "text-blue-600 font-semibold",
  "A.E": "text-yellow-600 font-semibold",
  "B.E": "text-red-600 font-semibold"
};

export const gradeBackgroundColors = {
  "E.E": "bg-green-100 border-green-500",
  "M.E": "bg-blue-100 border-blue-500",
  "A.E": "bg-yellow-100 border-yellow-500",
  "B.E": "bg-red-100 border-red-500"
};
