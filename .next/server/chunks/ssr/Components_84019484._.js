module.exports = {

"[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9921';
const __TURBOPACK__default__export__ = API_BASE_URL;
}}),
"[project]/Components/Services/dashboardService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchActiveLecturers": (()=>fetchActiveLecturers),
    "fetchDaySummary": (()=>fetchDaySummary),
    "fetchResourceUtilization": (()=>fetchResourceUtilization),
    "fetchTodaysSchedules": (()=>fetchTodaysSchedules),
    "fetchTotalClasses": (()=>fetchTotalClasses),
    "fetchTotalRooms": (()=>fetchTotalRooms),
    "fetchTotalTimetables": (()=>fetchTotalTimetables)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchTodaysSchedules = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/timetable/today`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching today\'s schedules:', error);
        return [];
    }
};
const fetchTotalClasses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/classes/total`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total classes:', error);
        return 0;
    }
};
const fetchActiveLecturers = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/lecturers/active`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching active lecturers:', error);
        return 0;
    }
};
const fetchTotalRooms = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms/total`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total rooms:', error);
        return 0;
    }
};
const fetchTotalTimetables = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/timetable/total`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total timetables:', error);
        return 0;
    }
};
const fetchDaySummary = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/timetable/summary`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching day summary:', error);
        return [];
    }
};
const fetchResourceUtilization = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms/utilization`, {
            headers
        });
        // Filter and aggregate data for "labs" and "class"
        const aggregatedData = response.data.reduce((acc, item)=>{
            const roomType = item.roomType.trim().toLowerCase(); // Normalize room type
            if (roomType === 'lab' || roomType === 'class') {
                const existing = acc.find((entry)=>entry.name === roomType);
                if (existing) {
                    existing.value += parseInt(item.count, 10); // Aggregate count
                } else {
                    acc.push({
                        name: roomType,
                        value: parseInt(item.count, 10)
                    });
                }
            }
            return acc;
        }, []);
        return aggregatedData;
    } catch (error) {
        console.error('Error fetching resource utilization:', error);
        // Return sample data if API is not available
        return [
            {
                name: 'class',
                value: 61
            },
            {
                name: 'lab',
                value: 16
            }
        ];
    }
};
}}),
"[project]/Components/Services/TimetableService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
const API_URL = "http://localhost:9921";
const TimetableService = {
    getTimetable: async ()=>{
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/timetable/`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching timetable:", error);
            return [];
        }
    },
    generateTimetable: async ()=>{
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await fetch(`${API_URL}/timetable/generate`, {
                method: "GET",
                headers
            });
            if (!response.ok) throw new Error("Failed to generate timetable");
        } catch (error) {
            console.error(error);
        }
    },
    downloadTimetable: async (activeDay, daysWithDates)=>{
        const dayIndex = daysWithDates.findIndex((day)=>day.name === activeDay) + 1; // 1-based index
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
        const response = await fetch(`${API_URL}/timetable/pdf/days/${dayIndex}`, {
            headers
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeDay}-Timetable.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    },
    getLecturers: async ()=>{
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/lecturers/`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            return [];
        }
    },
    getClasses: async ()=>{
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/classes/all`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching classes:", error);
            return [];
        }
    },
    getRooms: async ()=>{
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/rooms/`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching rooms:", error);
            return [];
        }
    },
    downloadEntityTimetable: async (entityType, entityId, dayIndex, entityName)=>{
        try {
            let endpoint;
            let isZip = false;
            switch(entityType){
                case 'lecturer':
                    if (entityId === 'all') {
                        endpoint = `${API_URL}/timetable/pdf/lecturers/all`;
                        isZip = true;
                    } else {
                        endpoint = `${API_URL}/timetable/pdf/lecturers/${entityId}`;
                    }
                    break;
                case 'class':
                    if (entityId === 'all') {
                        endpoint = `${API_URL}/timetable/pdf/classes/all`;
                        isZip = true;
                    } else {
                        endpoint = `${API_URL}/timetable/pdf/classes/${entityId}`;
                    }
                    break;
                case 'room':
                    endpoint = `${API_URL}/timetable/pdf/rooms/${entityId}`;
                    break;
                case 'day':
                    endpoint = `${API_URL}/timetable/pdf/days/${dayIndex}`;
                    break;
                case "All":
                    endpoint = `${API_URL}/timetable/pdf/all`;
                    break;
                default:
                    throw new Error('Invalid entity type');
            }
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await fetch(endpoint, {
                headers
            });
            if (!response.ok) throw new Error(`Failed to download ${entityType} timetable`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = isZip ? `${entityName}-Timetables.zip` : `${entityName}-Timetable.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error("Error downloading timetable:", error);
            return false;
        }
    }
};
const __TURBOPACK__default__export__ = TimetableService;
}}),
"[project]/Components/Services/LecturerService.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AddLecturer": (()=>AddLecturer),
    "deleteLecturer": (()=>deleteLecturer),
    "fetchLecturers": (()=>fetchLecturers),
    "updateLecturer": (()=>updateLecturer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
const lecturerUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/lecturers`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchLecturers = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${lecturerUrl}/`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching lecturers:", error);
        return [];
    }
};
const AddLecturer = async (lecturer)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${lecturerUrl}/create`, lecturer, {
            headers
        });
        return {
            success: true,
            message: response.data.message || "Lecturer added successfully!"
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to add lecturer"
        };
    }
};
const updateLecturer = async (lecturer)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${lecturerUrl}/update`, lecturer, {
            headers
        });
        return {
            success: true,
            message: response.data.message || "Lecturer updated successfully!"
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update lecturer"
        };
    }
};
const deleteLecturer = async (lecturerId)=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${lecturerUrl}/delete/${lecturerId}`, {
            headers
        });
    } catch (error) {
        console.error("Error deleting lecturer:", error);
        throw error;
    }
};
}}),
"[project]/Components/Services/LecturerScheduleService.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LecturerScheduleService": (()=>LecturerScheduleService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
const lecturerScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/lecturers`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const LecturerScheduleService = {
    // Get lecturer details by ID
    getLecturerDetails: async (lecturerId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/${lecturerId}`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching lecturer details:', error);
            throw error;
        }
    },
    // Get courses taught by a lecturer
    getLecturerCourses: async (lecturerId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/courses/${lecturerId}`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching lecturer courses:', error);
            throw error;
        }
    },
    // Get schedules for a lecturer
    getLecturerSchedules: async (lecturerId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/schedules/${lecturerId}`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching lecturer schedules:', error);
            throw error;
        }
    },
    // Get availability for a lecturer
    getLecturerAvailability: async (lecturerId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/availabilities/${lecturerId}`, {
                headers
            });
            console.log('Lecturer availability:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching lecturer availability:', error);
            throw error;
        }
    },
    // Regenerate schedules for a lecturer
    regenerateLecturerSchedule: async (lecturerId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${lecturerScheduleUrl}/availabilities/generate/${lecturerId}`, {
                headers
            });
            console.log('Regenerated lecturer schedule:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error regenerating lecturer schedule:', error);
            throw error;
        }
    },
    // Get all lecturers
    getAllLecturers: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching all lecturers:', error);
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = LecturerScheduleService;
}}),
"[project]/Components/Services/classService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addClass": (()=>addClass),
    "deleteClass": (()=>deleteClass),
    "fetchClassById": (()=>fetchClassById),
    "fetchClasses": (()=>fetchClasses),
    "updateClass": (()=>updateClass)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
;
;
const classServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/classes`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const addClass = async (classData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${classServiceUrl}/create`, classData, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("Error adding class:", error);
        throw new Error("Failed to add class.");
    }
};
const fetchClasses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${classServiceUrl}/`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw new Error("Failed to fetch classes.");
    }
};
const deleteClass = async (classId)=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${classServiceUrl}/delete/${classId}`, {
            headers
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting class:", error);
        throw new Error("Failed to delete class.");
    }
};
const updateClass = async (classId, classData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${classServiceUrl}/update`, classData, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("Error updating class:", error);
        throw new Error("Failed to update class.");
    }
};
const fetchClassById = async (classId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${classServiceUrl}/${classId}`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching class:", error);
        throw new Error("Failed to fetch class details.");
    }
};
}}),
"[project]/Components/Services/classScheduleService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addSchedule": (()=>addSchedule),
    "deleteSchedule": (()=>deleteSchedule),
    "fetchAvailableSchedules": (()=>fetchAvailableSchedules),
    "fetchSelectedSchedules": (()=>fetchSelectedSchedules)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuth
;
;
const classScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/classes`;
const fetchSelectedSchedules = async (classId)=>{
    try {
        const response = await fetch(`${classScheduleUrl}/schedule/selected/${classId}`, {
            headers
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch selected schedules: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching selected schedules:", error);
        throw error;
    }
};
const fetchAvailableSchedules = async (classId)=>{
    try {
        const response = await fetch(`${classScheduleUrl}/schedule/available/${classId}`, {});
        if (!response.ok) {
            throw new Error(`Failed to fetch available schedules: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching available schedules:", error);
        throw error;
    }
};
const addSchedule = async (scheduleData)=>{
    try {
        if (!scheduleData.classId || !scheduleData.dayName || !scheduleData.startTime || !scheduleData.endTime) {
            console.error("Missing required schedule data:", scheduleData);
            throw new Error("Missing required schedule data");
        }
        const response = await fetch(`${classScheduleUrl}/schedule/create`, {
            method: 'POST',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(scheduleData)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error(`Failed to add schedule: ${response.status}`);
        }
        const responseText = await response.text();
        return {
            message: responseText
        }; // Wrap plain text in an object
    } catch (error) {
        console.error("Error adding schedule:", error);
        throw error;
    }
};
const deleteSchedule = async (schedule)=>{
    try {
        if (!schedule.classId || !schedule.dayName || !schedule.startTime || !schedule.endTime) {
            console.error("Missing required schedule data for deletion:", schedule);
            throw new Error("Missing required schedule data for deletion");
        }
        const response = await fetch(`${classScheduleUrl}/schedule/delete`, {
            method: 'DELETE',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(schedule)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error(`Failed to delete schedule: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error deleting schedule:", error);
        throw error;
    }
};
}}),
"[project]/Components/Services/programCourseService.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addCourseToProgram": (()=>addCourseToProgram),
    "fetchCourses": (()=>fetchCourses),
    "fetchPeriods": (()=>fetchPeriods),
    "fetchProgramCourses": (()=>fetchProgramCourses),
    "fetchPrograms": (()=>fetchPrograms),
    "removeCourseFromProgram": (()=>removeCourseFromProgram)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const fetchPrograms = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/programs/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        throw error;
    }
};
const fetchPeriods = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/periods`);
        return response.data;
    } catch (error) {
        console.error('Error fetching periods:', error);
        throw error;
    }
};
const fetchCourses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};
const fetchProgramCourses = async (programId, periodId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/program/${programId}/${periodId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching program courses:', error);
        throw error;
    }
};
const addCourseToProgram = async (programId, periodId, courseId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/program/create`, {
            programId,
            periodId,
            courseId
        });
        return response.data;
    } catch (error) {
        console.error('Error adding course to program:', error);
        throw error;
    }
};
const removeCourseFromProgram = async (programCourseId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/program/${programCourseId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing course from program:', error);
        throw error;
    }
};
}}),
"[project]/Components/Services/ProgramService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
const programUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/programs`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const ProgramService = {
    addProgram: async (programData)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${programUrl}/create`, programData, {
            headers
        });
        return response.data;
    },
    fetchAllPrograms: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${programUrl}/`, {
            headers
        });
        return response.data;
    }
};
const __TURBOPACK__default__export__ = ProgramService;
}}),
"[project]/Components/Services/departmentService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addDepartment": (()=>addDepartment),
    "deleteDepartment": (()=>deleteDepartment),
    "fetchDepartments": (()=>fetchDepartments),
    "updateDepartment": (()=>updateDepartment)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
;
const departmentServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/departments`;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchDepartments = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${departmentServiceUrl}/`, {
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw "No departments found.";
        }
        console.error("Error fetching departments:", error);
        throw error.response?.data?.message || "Failed to fetch departments.";
    }
};
const addDepartment = async (departmentData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${departmentServiceUrl}/create`, departmentData, {
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw "Faculty not found. Please provide a valid Faculty ID.";
        }
        console.error("Error adding department:", error);
        throw error.response?.data?.message || "Failed to add department.";
    }
};
const updateDepartment = async (departmentId, departmentData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${departmentServiceUrl}/update/${departmentId}`, departmentData, {
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw "Department or Faculty not found. Please verify the IDs.";
        }
        console.error("Error updating department:", error);
        throw error.response?.data?.message || "Failed to update department.";
    }
};
const deleteDepartment = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${departmentServiceUrl}/delete${departmentId}`, {
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw "Department not found. It may have already been deleted.";
        }
        console.error("Error deleting department:", error);
        throw error.response?.data?.message || "Failed to delete department.";
    }
};
}}),
"[project]/Components/Services/RoomDepartmentService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addRoomToDepartment": (()=>addRoomToDepartment),
    "fetchAvailableRoomDepartments": (()=>fetchAvailableRoomDepartments),
    "fetchSelectedRoomDepartments": (()=>fetchSelectedRoomDepartments),
    "removeRoomFromDepartment": (()=>removeRoomFromDepartment)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const roomDepartmentUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms`;
const fetchSelectedRoomDepartments = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${roomDepartmentUrl}/department/selected/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching selected room departments:', error);
        throw error;
    }
};
const fetchAvailableRoomDepartments = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${roomDepartmentUrl}/department/available/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching available room departments:', error);
        throw error;
    }
};
const addRoomToDepartment = async (departmentId, roomId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${roomDepartmentUrl}/department/create`, {
            departmentId,
            roomId
        });
        return response.data;
    } catch (error) {
        console.error('Error adding room to department:', error);
        throw error;
    }
};
const removeRoomFromDepartment = async (schedule)=>{
    try {
        console.log("Sending schedule data to API for deletion:", schedule);
        // Ensure the schedule object contains all required fields
        if (!schedule.roomId || !schedule.departmentName) {
            console.error("Missing required schedule data for deletion:", schedule);
            throw new Error("Missing required schedule data for deletion");
        }
        const response = await fetch(`${roomDepartmentUrl}/department/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error(`Failed to delete schedule: ${response.status}`);
        }
        console.log("Schedule deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting schedule:", error);
        throw error;
    }
};
}}),
"[project]/Components/Services/timeslotService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Fetch timeslot data from API
__turbopack_context__.s({
    "fetchDays": (()=>fetchDays),
    "fetchTimeslots": (()=>fetchTimeslots)
});
const fetchTimeslots = async ()=>{
    try {
        const response = await fetch("http://localhost:9921/timeslots");
        if (!response.ok) {
            throw new Error(`Error fetching timeslots: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
const fetchDays = async ()=>{
    try {
        const response = await fetch("http://localhost:9921/days");
        if (!response.ok) {
            throw new Error(`Error fetching days: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
}}),
"[project]/Components/Services/roomScheduleService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addRoomSchedule": (()=>addRoomSchedule),
    "fetchAvailableRoomSchedules": (()=>fetchAvailableRoomSchedules),
    "fetchSelectedRoomSchedules": (()=>fetchSelectedRoomSchedules),
    "removeRoomSchedule": (()=>removeRoomSchedule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
const roomScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms`;
// Fetch rooms data from API
const fetchRooms = async ()=>{
    try {
        const response = await fetch(`${roomScheduleUrl}/`);
        if (!response.ok) {
            throw new Error(`Error fetching rooms: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
// Fetch days data from API
const fetchDays = async ()=>{
    try {
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/days`);
        if (!response.ok) {
            throw new Error(`Error fetching days: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
// Fetch timeslots data from API
const fetchTimeslots = async ()=>{
    try {
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/timeslots`);
        if (!response.ok) {
            throw new Error(`Error fetching timeslots: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
const fetchAvailableRoomSchedules = async (departmentId)=>{
    const response = await fetch(`${roomScheduleUrl}/schedule/available/${departmentId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch available room schedules");
    }
    const data = await response.json();
    console.log("Raw available schedules:", data);
    // Fetch rooms, days, and timeslots for mapping
    const [rooms, days, timeslots] = await Promise.all([
        fetchRooms(),
        fetchDays(),
        fetchTimeslots()
    ]);
    // Log fetched data before mapping
    console.log("Fetched Rooms:", rooms);
    console.log("Fetched Days:", days);
    console.log("Fetched Timeslots:", timeslots);
    // Map IDs to names but preserve original IDs for adding
    return data.map((schedule)=>{
        const room = rooms.find((r)=>r.roomId === schedule.roomId);
        const day = days.find((d)=>d.dayId === schedule.dayId);
        const timeslot = timeslots.find((t)=>t.id === schedule.timeslotId);
        return {
            // Display names for UI
            roomName: room ? room.roomName : "Unknown Room",
            roomType: room ? room.roomType : "Unknown Type",
            dayName: day ? day.dayName : "Unknown Day",
            startTime: timeslot ? timeslot.startTime : "Unknown Start Time",
            endTime: timeslot ? timeslot.endTime : "Unknown End Time",
            // Preserve original IDs for adding
            roomId: schedule.roomId,
            dayId: schedule.dayId,
            timeslotId: schedule.timeslotId,
            departmentId: schedule.departmentId,
            isOccupied: schedule.isOccupied,
            isChosen: schedule.isChosen
        };
    });
};
const fetchSelectedRoomSchedules = async (departmentId)=>{
    const response = await fetch(`${roomScheduleUrl}/schedule/selected/${departmentId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch selected room schedules");
    }
    const data = await response.json();
    console.log("Raw selected schedules:", data);
    // Fetch rooms, days, and timeslots for mapping
    const [rooms, days, timeslots] = await Promise.all([
        fetchRooms(),
        fetchDays(),
        fetchTimeslots()
    ]);
    // Log fetched data before mapping
    console.log("Fetched Rooms:", rooms);
    console.log("Fetched Days:", days);
    console.log("Fetched Timeslots:", timeslots);
    // Map IDs to names but preserve original IDs for adding
    return data.map((schedule)=>{
        const room = rooms.find((r)=>r.roomId === schedule.roomId);
        const day = days.find((d)=>d.dayId === schedule.dayId);
        const timeslot = timeslots.find((t)=>t.id === schedule.timeslotId);
        return {
            // Display names for UI
            roomName: room ? room.roomName : "Unknown Room",
            roomType: room ? room.roomType : "Unknown Type",
            dayName: day ? day.dayName : "Unknown Day",
            startTime: timeslot ? timeslot.startTime : "Unknown Start Time",
            endTime: timeslot ? timeslot.endTime : "Unknown End Time",
            // Preserve original IDs for adding or deleting
            roomId: schedule.roomId,
            dayId: schedule.dayId,
            timeslotId: schedule.timeslotId,
            departmentId: schedule.departmentId,
            isOccupied: schedule.isOccupied,
            isChosen: schedule.isChosen
        };
    });
};
const addRoomSchedule = async (schedule)=>{
    const response = await fetch(`${roomScheduleUrl}/schedule/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    });
    if (!response.ok) {
        throw new Error("Failed to add room schedule");
    }
};
const removeRoomSchedule = async (schedule)=>{
    const response = await fetch(`${roomScheduleUrl}/schedule/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    });
    if (!response.ok) {
        throw new Error("Failed to remove room schedule");
    }
};
}}),
"[project]/Components/LoginService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addAuthHeaders": (()=>addAuthHeaders),
    "loginUser": (()=>loginUser),
    "registerUser": (()=>registerUser)
});
const loginUser = async (username, password)=>{
    try {
        const response = await fetch('http://localhost:9921/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Login response:', data);
            // Check for tokens and save them securely
            if (data.tokens && data.tokens.accessToken && data.tokens.refreshToken) {
                console.log('Tokens received:', data.tokens);
                localStorage.setItem('accessToken', data.tokens.accessToken);
                localStorage.setItem('refreshToken', data.tokens.refreshToken);
            } else {
                console.warn('Tokens not found in the response');
            }
            return data;
        } else {
            const text = await response.text();
            console.log('Login response (text):', text);
            return {
                errorMessage: text
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        return {
            errorMessage: 'Network error occurred'
        };
    }
};
const registerUser = async (username, password, firstName, lastName)=>{
    try {
        const response = await fetch('http://localhost:9921/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                firstName,
                lastName
            })
        });
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Register response:', data);
            return data;
        } else {
            // Handle text response
            const text = await response.text();
            console.log('Register response (text):', text);
            // For a successful text response like "User registered Successfully"
            if (response.ok) {
                return {
                    username,
                    firstName,
                    lastName
                }; // Create a mock profile to indicate success
            }
            return {
                errorMessage: text
            };
        }
    } catch (error) {
        console.error('Register error:', error);
        return {
            errorMessage: 'Network error occurred'
        };
    }
};
const addAuthHeaders = (headers = {})=>{
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return {
            ...headers,
            Authorization: `Bearer ${accessToken}`
        };
    }
    return headers;
};
}}),
"[project]/Components/DashboardPage/DailyUtilizationChart.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/dashboardService.js [app-ssr] (ecmascript)"); // Import the fetchDaySummary function
;
;
;
;
const DailyUtilizationChart = ()=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            const summaryData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchDaySummary"])(); // Fetch data from the API
            setData(summaryData); // Update the state with the fetched data
        };
        fetchData();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-800 mb-2",
                        children: "Daily Resource Usage"
                    }, void 0, false, {
                        fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "This chart shows the daily distribution of lecturers, classes, and room utilization across the week. Higher bars indicate higher resource usage for that particular day."
                    }, void 0, false, {
                        fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: data,
                        margin: {
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e5e7eb"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "day",
                                tick: {
                                    fontSize: 10,
                                    fill: '#000000'
                                },
                                tickLine: false,
                                axisLine: {
                                    stroke: '#d1d5db'
                                },
                                interval: 0
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fontSize: 10,
                                    fill: '#000000'
                                },
                                tickLine: false,
                                axisLine: {
                                    stroke: '#d1d5db'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    backgroundColor: '#f9fafb',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px'
                                },
                                itemStyle: {
                                    fontSize: 10,
                                    color: '#000000'
                                },
                                labelStyle: {
                                    fontSize: 12,
                                    color: '#000000',
                                    fontWeight: 'bold'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                wrapperStyle: {
                                    fontSize: 10,
                                    color: '#6b7280'
                                },
                                iconType: "circle"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "lecturers",
                                name: "Lecturers",
                                fill: "#3b82f6",
                                radius: [
                                    4,
                                    4,
                                    0,
                                    0
                                ]
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "classes",
                                name: "Classes",
                                fill: "#10b981",
                                radius: [
                                    4,
                                    4,
                                    0,
                                    0
                                ]
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "rooms",
                                name: "Rooms",
                                fill: "#f59e0b",
                                radius: [
                                    4,
                                    4,
                                    0,
                                    0
                                ]
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = DailyUtilizationChart;
}}),
"[project]/Components/DashboardPage/StatCards.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
;
;
;
const StatCards = ({ dashboardData })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Total Classes"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 10,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl font-extrabold text-gray-800",
                                    children: dashboardData.totalClasses
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 11,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-blue-50 text-blue-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                lineNumber: 14,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Active Lecturers"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl font-extrabold text-gray-800",
                                    children: dashboardData.activeLecturers
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-green-50 text-green-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Total Rooms"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl font-extrabold text-gray-800",
                                    children: dashboardData.totalRooms
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-purple-50 text-purple-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Timetables"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl font-extrabold text-gray-800",
                                    children: dashboardData.totalTimetables
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-red-50 text-red-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/DashboardPage/StatCards.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = StatCards;
}}),
"[project]/Components/DashboardPage/Schedules.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
;
;
;
const Schedules = ({ schedules })=>{
    // Sort schedules by startTime in 24-hour format
    const sortedSchedules = [
        ...schedules
    ].sort((a, b)=>{
        const [hoursA, minutesA] = (a.startTime || '00:00').split(':').map(Number);
        const [hoursB, minutesB] = (b.startTime || '00:00').split(':').map(Number);
        return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
    });
    // Format current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
    // Get current time to highlight current/upcoming classes
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    // Helper function to determine class status
    const getClassStatus = (timeString)=>{
        if (!timeString) return {
            status: 'upcoming',
            label: 'Upcoming'
        };
        const [hours, minutes] = timeString.split(':').map(Number);
        const classTotalMinutes = hours * 60 + minutes;
        // Assuming each class is 1 hour
        if (classTotalMinutes + 60 < currentTotalMinutes) {
            return {
                status: 'completed',
                label: 'Completed'
            };
        } else if (classTotalMinutes <= currentTotalMinutes) {
            return {
                status: 'ongoing',
                label: 'Ongoing'
            };
        } else {
            return {
                status: 'upcoming',
                label: 'Upcoming'
            };
        }
    };
    // Get time period (AM/PM)
    const getTimePeriod = (timeString)=>{
        if (!timeString) return 'AM';
        const hours = parseInt(timeString.split(':')[0]);
        return hours >= 12 ? 'PM' : 'AM';
    };
    // Format time to 12-hour format
    const formatTime = (timeString)=>{
        if (!timeString) return '10:00';
        const [hours, minutes] = timeString.split(':');
        const hourNum = parseInt(hours);
        return `${hourNum % 12 || 12}:${minutes}`;
    };
    // Get class color based on subject or index
    const getClassColor = (schedule, index)=>{
        const className = schedule.className || schedule.title || '';
        if (className.toLowerCase().includes('math')) return 'bg-purple-500';
        if (className.toLowerCase().includes('science') || className.toLowerCase().includes('computer')) return 'bg-blue-500';
        if (className.toLowerCase().includes('english') || className.toLowerCase().includes('literature')) return 'bg-green-500';
        if (className.toLowerCase().includes('history')) return 'bg-amber-500';
        // Fallback to rotating colors
        const colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-green-500',
            'bg-amber-500',
            'bg-rose-500'
        ];
        return colors[index % colors.length];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-xl shadow-sm p-6 border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-gray-800 text-lg",
                                children: "Today's Schedule"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-1",
                                children: [
                                    sortedSchedules.length,
                                    " total classes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 14,
                                className: "mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: formattedDate
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 max-h-96 overflow-y-auto pr-1 scrollbar-thin",
                children: sortedSchedules.length > 0 ? sortedSchedules.map((schedule, index)=>{
                    const { status, label } = getClassStatus(schedule.startTime);
                    const statusColor = status === 'ongoing' ? 'bg-green-100 text-green-700 border-green-200' : status === 'completed' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-blue-50 text-blue-700 border-blue-200';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center p-4 rounded-xl border transition-all hover:shadow-md ${status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `min-w-16 h-16 flex flex-col items-center justify-center rounded-lg ${getClassColor(schedule, index).replace('bg-', 'bg-opacity-10 text-').replace('-500', '-700')} ${getClassColor(schedule, index).replace('-500', '-50')}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-indigo-500",
                                        children: formatTime(schedule.startTime || '10:00')
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-indigo-500",
                                        children: getTimePeriod(schedule.startTime)
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 100,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-4 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-semibold text-gray-800",
                                                children: schedule.className || schedule.title || 'Computer Science'
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                lineNumber: 107,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `ml-2 text-xs px-2 py-0.5 rounded-full ${statusColor}`,
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                lineNumber: 110,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                        lineNumber: 106,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center text-xs text-gray-500 space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        size: 12,
                                                        className: "mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                        lineNumber: 117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: schedule.lecturerName || 'Dr. Smith'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                lineNumber: 116,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 12,
                                                        className: "mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                        lineNumber: 121,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Room ",
                                                            schedule.roomName || 'LH1'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                        lineNumber: 122,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                        lineNumber: 115,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-3 w-3 rounded-full ${getClassColor(schedule, index)}`
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                    lineNumber: 128,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 127,
                                columnNumber: 17
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                        lineNumber: 94,
                        columnNumber: 15
                    }, this);
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                            className: "mx-auto h-12 w-12 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm font-medium text-gray-500",
                            children: "No classes scheduled for today"
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Schedules;
}}),
"[project]/Components/DashboardPage/dashboard.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$DailyUtilizationChart$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DashboardPage/DailyUtilizationChart.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$StatCards$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DashboardPage/StatCards.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/dashboardService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-ssr] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$Schedules$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DashboardPage/Schedules.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const DashboardPage = ()=>{
    const [dashboardData, setDashboardData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        schedules: [],
        totalClasses: 0,
        activeLecturers: 0,
        totalRooms: 0,
        totalTimetables: 0,
        resourceUtilization: []
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [showProfileMenu, setShowProfileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [lastName, setLastName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load user data from local storage
        const storedFirstName = localStorage.getItem('firstName') || 'User';
        const storedLastName = localStorage.getItem('lastName') || '';
        console.log('Retrieved from localStorage:', {
            storedFirstName,
            storedLastName
        });
        setFirstName(storedFirstName);
        setLastName(storedLastName);
    }, []);
    const handleLogout = ()=>{
        // Clear local storage and redirect to login page
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        window.location.href = '/login';
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Set current date
        const now = new Date();
        setCurrentDate(now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
        const fetchData = async ()=>{
            setIsLoading(true);
            try {
                const [classes, lecturers, rooms, timetables, schedulesData, utilizationData] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTotalClasses"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchActiveLecturers"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTotalRooms"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTotalTimetables"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTodaysSchedules"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchResourceUtilization"])()
                ]);
                setDashboardData({
                    schedules: schedulesData,
                    totalClasses: classes,
                    activeLecturers: lecturers,
                    totalRooms: rooms,
                    totalTimetables: timetables,
                    resourceUtilization: utilizationData
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally{
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            }, void 0, false, {
                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                lineNumber: 108,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Components/DashboardPage/dashboard.jsx",
            lineNumber: 107,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-50 min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 shadow-sm flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-medium text-gray-800",
                            children: currentDate
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 rounded-full hover:bg-gray-100 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowProfileMenu(!showProfileMenu),
                                        className: "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: [
                                                        firstName.charAt(0),
                                                        lastName.charAt(0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-700 hidden md:block",
                                                children: [
                                                    firstName,
                                                    " ",
                                                    lastName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                lineNumber: 135,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 16,
                                                className: "text-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    showProfileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleLogout,
                                            className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    size: 16,
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this),
                                                "Log Out"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$StatCards$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            dashboardData: dashboardData
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-sm p-6 flex flex-col flex-grow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$Schedules$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    schedules: dashboardData.schedules
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-sm p-6 flex flex-col flex-grow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-gray-800",
                                                children: "Daily Utilization"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "p-1 rounded hover:bg-gray-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                            lineNumber: 175,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                        lineNumber: 174,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "p-1 rounded hover:bg-gray-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                            lineNumber: 178,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                        lineNumber: 177,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                lineNumber: 173,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$DailyUtilizationChart$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = DashboardPage;
}}),

};

//# sourceMappingURL=Components_84019484._.js.map