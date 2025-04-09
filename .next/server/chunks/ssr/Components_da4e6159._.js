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

};

//# sourceMappingURL=Components_da4e6159._.js.map