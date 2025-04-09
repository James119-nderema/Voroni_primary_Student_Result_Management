(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/Components_ee6d5a47._.js", {

"[project]/Components/Services/HostConfig.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_API_URL || 'http://localhost:9921';
const __TURBOPACK__default__export__ = API_BASE_URL;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/dashboardService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuthHeaders
;
;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchTodaysSchedules = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/timetable/today`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/classes/total`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/lecturers/active`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/rooms/total`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/timetable/total`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/timetable/summary`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/rooms/utilization`, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/TimetableService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuthHeaders
;
;
const API_URL = "http://localhost:9921";
const TimetableService = {
    getTimetable: async ()=>{
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/timetable/`, {
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
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
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
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
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
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/lecturers/`, {
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
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/classes/all`, {
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
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}/rooms/`, {
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
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/LecturerService.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AddLecturer": (()=>AddLecturer),
    "deleteLecturer": (()=>deleteLecturer),
    "fetchLecturers": (()=>fetchLecturers),
    "updateLecturer": (()=>updateLecturer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuthHeaders
;
;
const lecturerUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/lecturers`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchLecturers = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${lecturerUrl}/`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${lecturerUrl}/create`, lecturer, {
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
_c = AddLecturer;
const updateLecturer = async (lecturer)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${lecturerUrl}/update`, lecturer, {
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${lecturerUrl}/delete/${lecturerId}`, {
            headers
        });
    } catch (error) {
        console.error("Error deleting lecturer:", error);
        throw error;
    }
};
var _c;
__turbopack_context__.k.register(_c, "AddLecturer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/LecturerScheduleService.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LecturerScheduleService": (()=>LecturerScheduleService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuthHeaders
;
;
const lecturerScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/lecturers`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const LecturerScheduleService = {
    // Get lecturer details by ID
    getLecturerDetails: async (lecturerId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/${lecturerId}`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/courses/${lecturerId}`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/schedules/${lecturerId}`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/availabilities/${lecturerId}`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${lecturerScheduleUrl}/availabilities/generate/${lecturerId}`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${lecturerScheduleUrl}/`, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/classService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addClass": (()=>addClass),
    "deleteClass": (()=>deleteClass),
    "fetchClassById": (()=>fetchClassById),
    "fetchClasses": (()=>fetchClasses),
    "updateClass": (()=>updateClass)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)");
;
;
const classServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/classes`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const addClass = async (classData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${classServiceUrl}/create`, classData, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${classServiceUrl}/`, {
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${classServiceUrl}/delete/${classId}`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${classServiceUrl}/update`, classData, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${classServiceUrl}/${classId}`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching class:", error);
        throw new Error("Failed to fetch class details.");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/classScheduleService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addSchedule": (()=>addSchedule),
    "deleteSchedule": (()=>deleteSchedule),
    "fetchAvailableSchedules": (()=>fetchAvailableSchedules),
    "fetchSelectedSchedules": (()=>fetchSelectedSchedules)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuth
;
;
const classScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/classes`;
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
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])({
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
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])({
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/programCourseService.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addCourseToProgram": (()=>addCourseToProgram),
    "fetchCourses": (()=>fetchCourses),
    "fetchPeriods": (()=>fetchPeriods),
    "fetchProgramCourses": (()=>fetchProgramCourses),
    "fetchPrograms": (()=>fetchPrograms),
    "removeCourseFromProgram": (()=>removeCourseFromProgram)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
;
;
const fetchPrograms = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/programs/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        throw error;
    }
};
const fetchPeriods = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/periods`);
        return response.data;
    } catch (error) {
        console.error('Error fetching periods:', error);
        throw error;
    }
};
const fetchCourses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/courses/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};
const fetchProgramCourses = async (programId, periodId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/courses/program/${programId}/${periodId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching program courses:', error);
        throw error;
    }
};
const addCourseToProgram = async (programId, periodId, courseId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/courses/program/create`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/courses/program/${programCourseId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing course from program:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/ProgramService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuthHeaders
;
;
const programUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/programs`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const ProgramService = {
    addProgram: async (programData)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${programUrl}/create`, programData, {
            headers
        });
        return response.data;
    },
    fetchAllPrograms: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${programUrl}/`, {
            headers
        });
        return response.data;
    }
};
const __TURBOPACK__default__export__ = ProgramService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/departmentService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addDepartment": (()=>addDepartment),
    "deleteDepartment": (()=>deleteDepartment),
    "fetchDepartments": (()=>fetchDepartments),
    "updateDepartment": (()=>updateDepartment)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-client] (ecmascript)"); // Import addAuthHeaders
;
;
;
const departmentServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/departments`;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchDepartments = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${departmentServiceUrl}/`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${departmentServiceUrl}/create`, departmentData, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${departmentServiceUrl}/update/${departmentId}`, departmentData, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${departmentServiceUrl}/delete${departmentId}`, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/RoomDepartmentService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addRoomToDepartment": (()=>addRoomToDepartment),
    "fetchAvailableRoomDepartments": (()=>fetchAvailableRoomDepartments),
    "fetchSelectedRoomDepartments": (()=>fetchSelectedRoomDepartments),
    "removeRoomFromDepartment": (()=>removeRoomFromDepartment)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
;
;
const roomDepartmentUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/rooms`;
const fetchSelectedRoomDepartments = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${roomDepartmentUrl}/department/selected/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching selected room departments:', error);
        throw error;
    }
};
const fetchAvailableRoomDepartments = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${roomDepartmentUrl}/department/available/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching available room departments:', error);
        throw error;
    }
};
const addRoomToDepartment = async (departmentId, roomId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${roomDepartmentUrl}/department/create`, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/timeslotService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/Services/roomScheduleService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addRoomSchedule": (()=>addRoomSchedule),
    "fetchAvailableRoomSchedules": (()=>fetchAvailableRoomSchedules),
    "fetchSelectedRoomSchedules": (()=>fetchSelectedRoomSchedules),
    "removeRoomSchedule": (()=>removeRoomSchedule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-client] (ecmascript)");
;
const roomScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/rooms`;
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
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/days`);
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
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]}/timeslots`);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/LoginService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/DashboardPage/DailyUtilizationChart.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/dashboardService.js [app-client] (ecmascript)"); // Import the fetchDaySummary function
;
var _s = __turbopack_context__.k.signature();
;
;
;
const DailyUtilizationChart = ()=>{
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DailyUtilizationChart.useEffect": ()=>{
            const fetchData = {
                "DailyUtilizationChart.useEffect.fetchData": async ()=>{
                    const summaryData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDaySummary"])(); // Fetch data from the API
                    setData(summaryData); // Update the state with the fetched data
                }
            }["DailyUtilizationChart.useEffect.fetchData"];
            fetchData();
        }
    }["DailyUtilizationChart.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-800 mb-2",
                        children: "Daily Resource Usage"
                    }, void 0, false, {
                        fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: data,
                        margin: {
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#e5e7eb"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/DailyUtilizationChart.jsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
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
_s(DailyUtilizationChart, "IEMTtLVFIuToo7X/raQbJAxzNQU=");
_c = DailyUtilizationChart;
const __TURBOPACK__default__export__ = DailyUtilizationChart;
var _c;
__turbopack_context__.k.register(_c, "DailyUtilizationChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/DashboardPage/StatCards.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
;
;
;
const StatCards = ({ dashboardData })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Total Classes"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 10,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-blue-50 text-blue-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Active Lecturers"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-green-50 text-green-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Total Rooms"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-purple-50 text-purple-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500 h-[120px] flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-2",
                                    children: "Timetables"
                                }, void 0, false, {
                                    fileName: "[project]/Components/DashboardPage/StatCards.jsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-red-50 text-red-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
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
_c = StatCards;
const __TURBOPACK__default__export__ = StatCards;
var _c;
__turbopack_context__.k.register(_c, "StatCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/DashboardPage/Schedules.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-xl shadow-sm p-6 border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-gray-800 text-lg",
                                children: "Today's Schedule"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 14,
                                className: "mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 max-h-96 overflow-y-auto pr-1 scrollbar-thin",
                children: sortedSchedules.length > 0 ? sortedSchedules.map((schedule, index)=>{
                    const { status, label } = getClassStatus(schedule.startTime);
                    const statusColor = status === 'ongoing' ? 'bg-green-100 text-green-700 border-green-200' : status === 'completed' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-blue-50 text-blue-700 border-blue-200';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center p-4 rounded-xl border transition-all hover:shadow-md ${status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `min-w-16 h-16 flex flex-col items-center justify-center rounded-lg ${getClassColor(schedule, index).replace('bg-', 'bg-opacity-10 text-').replace('-500', '-700')} ${getClassColor(schedule, index).replace('-500', '-50')}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-indigo-500",
                                        children: formatTime(schedule.startTime || '10:00')
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-4 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-semibold text-gray-800",
                                                children: schedule.className || schedule.title || 'Computer Science'
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                lineNumber: 107,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center text-xs text-gray-500 space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        size: 12,
                                                        className: "mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                        lineNumber: 117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 12,
                                                        className: "mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                                                        lineNumber: 121,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                            className: "mx-auto h-12 w-12 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/Components/DashboardPage/Schedules.jsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c = Schedules;
const __TURBOPACK__default__export__ = Schedules;
var _c;
__turbopack_context__.k.register(_c, "Schedules");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/DashboardPage/dashboard.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$DailyUtilizationChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DashboardPage/DailyUtilizationChart.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$StatCards$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DashboardPage/StatCards.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/dashboardService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$Schedules$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DashboardPage/Schedules.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const DashboardPage = ()=>{
    _s();
    const [dashboardData, setDashboardData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        schedules: [],
        totalClasses: 0,
        activeLecturers: 0,
        totalRooms: 0,
        totalTimetables: 0,
        resourceUtilization: []
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showProfileMenu, setShowProfileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [lastName, setLastName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            // Load user data from local storage
            const storedFirstName = localStorage.getItem('firstName') || 'User';
            const storedLastName = localStorage.getItem('lastName') || '';
            console.log('Retrieved from localStorage:', {
                storedFirstName,
                storedLastName
            });
            setFirstName(storedFirstName);
            setLastName(storedLastName);
        }
    }["DashboardPage.useEffect"], []);
    const handleLogout = ()=>{
        // Clear local storage and redirect to login page
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        window.location.href = '/login';
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            // Set current date
            const now = new Date();
            setCurrentDate(now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));
            const fetchData = {
                "DashboardPage.useEffect.fetchData": async ()=>{
                    setIsLoading(true);
                    try {
                        const [classes, lecturers, rooms, timetables, schedulesData, utilizationData] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTotalClasses"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchActiveLecturers"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTotalRooms"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTotalTimetables"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTodaysSchedules"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$dashboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchResourceUtilization"])()
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
                }
            }["DashboardPage.useEffect.fetchData"];
            fetchData();
        }
    }["DashboardPage.useEffect"], []);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-50 min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 shadow-sm flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 rounded-full hover:bg-gray-100 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowProfileMenu(!showProfileMenu),
                                        className: "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
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
                                    showProfileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleLogout,
                                            className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$StatCards$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-sm p-6 flex flex-col flex-grow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$Schedules$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-sm p-6 flex flex-col flex-grow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-gray-800",
                                                children: "Daily Utilization"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/DashboardPage/dashboard.jsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "p-1 rounded hover:bg-gray-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "p-1 rounded hover:bg-gray-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DashboardPage$2f$DailyUtilizationChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
_s(DashboardPage, "Z9IVDQt9BhCkZgGymuh5feE2ni0=");
_c = DashboardPage;
const __TURBOPACK__default__export__ = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/departmentService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const AddEditDepartmentPopup = ({ data, onClose, onSave })=>{
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        departmentName: "",
        facultyId: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddEditDepartmentPopup.useEffect": ()=>{
            if (data && data.departmentId) {
                setFormData(data); // Populate form with existing data for editing
            } else {
                setFormData({
                    departmentName: "",
                    facultyId: ""
                }); // Reset form for adding
            }
        }
    }["AddEditDepartmentPopup.useEffect"], [
        data
    ]);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if (data.departmentId) {
                const updatedDepartment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDepartment"])(data.departmentId, formData);
                onSave(updatedDepartment);
            } else {
                const newDepartment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDepartment"])(formData);
                onSave(newDepartment);
            }
        } catch (error) {
            console.error("Error saving department:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-white rounded-lg p-6 w-full max-w-md z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-4",
                        children: data.departmentId ? "Edit Department" : "Add New Department"
                    }, void 0, false, {
                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Department Name"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "departmentName",
                                        value: formData.departmentName,
                                        onChange: handleChange,
                                        className: "mt-1 px-4 py-2 border rounded-md w-full",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Faculty ID"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "facultyId",
                                        value: formData.facultyId,
                                        onChange: handleChange,
                                        className: "mt-1 px-4 py-2 border rounded-md w-full",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onClose,
                                        className: "px-4 py-2 bg-gray-300 rounded-md text-sm font-medium",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700",
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
};
_s(AddEditDepartmentPopup, "4EA7WkJ6/AoaxpleDRfLqBhKUAQ=");
_c = AddEditDepartmentPopup;
const __TURBOPACK__default__export__ = AddEditDepartmentPopup;
var _c;
__turbopack_context__.k.register(_c, "AddEditDepartmentPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/DepartmentPage/departments.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/departmentService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DepartmentPage$2f$AddEditDepartmentPopup$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/DepartmentPage/AddEditDepartmentPopup.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const DepartmentsPage = ()=>{
    _s();
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredDepartments, setFilteredDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [popupData, setPopupData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // State to control popup data
    const [feedbackMessage, setFeedbackMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // Feedback message state
    const [feedbackError, setFeedbackError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // Feedback error state
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DepartmentsPage.useEffect": ()=>{
            const getDepartments = {
                "DepartmentsPage.useEffect.getDepartments": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDepartments"])();
                        setDepartments(data);
                        setFilteredDepartments(data);
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            setFeedbackError("Departments not found.");
                        } else {
                            setFeedbackError(error.message);
                        }
                    } finally{
                        setLoading(false);
                    }
                }
            }["DepartmentsPage.useEffect.getDepartments"];
            getDepartments();
        }
    }["DepartmentsPage.useEffect"], []);
    const handleAddDepartment = ()=>{
        setPopupData({}); // Open popup with empty data for adding a new department
    };
    const handleEditDepartment = (department)=>{
        setPopupData(department); // Open popup with existing data for editing
    };
    const handleDeleteDepartment = async (departmentId)=>{
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDepartment"])(departmentId);
            const updatedDepartments = departments.filter((dept)=>dept.departmentId !== departmentId);
            setDepartments(updatedDepartments);
            setFilteredDepartments(updatedDepartments);
            setFeedbackMessage(response.message || "Department deleted successfully!");
        } catch (error) {
            setFeedbackError(error);
        } finally{
            setTimeout(()=>{
                setFeedbackMessage("");
                setFeedbackError("");
            }, 3000); // Clear message after 3 seconds
        }
    };
    const handleClosePopup = ()=>{
        setPopupData(null); // Close the popup
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-6",
        children: [
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg text-green-900 font-semibold",
                                children: "Departments Management"
                            }, void 0, false, {
                                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Manage and monitor all available Departments"
                            }, void 0, false, {
                                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAddDepartment,
                        className: "px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700",
                        children: "Add New Department"
                    }, void 0, false, {
                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            feedbackMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm",
                children: feedbackMessage
            }, void 0, false, {
                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                lineNumber: 80,
                columnNumber: 9
            }, this),
            feedbackError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm",
                children: feedbackError
            }, void 0, false, {
                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg overflow-hidden",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 text-center text-gray-500",
                    children: "Loading Departments..."
                }, void 0, false, {
                    fileName: "[project]/Components/DepartmentPage/departments.jsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Department ID"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Department Name"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Faculty ID"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/DepartmentPage/departments.jsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: filteredDepartments.length > 0 ? filteredDepartments.map((department)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                            children: department.departmentId
                                        }, void 0, false, {
                                            fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                            lineNumber: 115,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                            children: department.departmentName
                                        }, void 0, false, {
                                            fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                            lineNumber: 118,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                            children: department.facultyId
                                        }, void 0, false, {
                                            fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                            lineNumber: 121,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-indigo-600 hover:text-indigo-900",
                                                        onClick: ()=>handleEditDepartment(department),
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                                        lineNumber: 126,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-red-600 hover:text-red-900",
                                                        onClick: ()=>handleDeleteDepartment(department.departmentId),
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                                        lineNumber: 132,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                                lineNumber: 125,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                            lineNumber: 124,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, department.departmentId, true, {
                                    fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                    lineNumber: 114,
                                    columnNumber: 19
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: "4",
                                    className: "px-6 py-4 text-center text-gray-500",
                                    children: "No Departments found."
                                }, void 0, false, {
                                    fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                    lineNumber: 144,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                                lineNumber: 143,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/DepartmentPage/departments.jsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/DepartmentPage/departments.jsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            popupData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$DepartmentPage$2f$AddEditDepartmentPopup$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                data: popupData,
                onClose: handleClosePopup,
                onSave: (updatedDepartment)=>{
                    if (updatedDepartment.departmentId) {
                        // Update existing department
                        setDepartments((prev)=>prev.map((dept)=>dept.departmentId === updatedDepartment.departmentId ? updatedDepartment : dept));
                        setFeedbackMessage("Department updated successfully!");
                    } else {
                        // Add new department
                        setDepartments((prev)=>[
                                ...prev,
                                updatedDepartment
                            ]);
                        setFeedbackMessage("Department added successfully!");
                    }
                    setFilteredDepartments((prev)=>prev.map((dept)=>dept.departmentId === updatedDepartment.departmentId ? updatedDepartment : dept));
                    setTimeout(()=>setFeedbackMessage(""), 3000); // Clear message after 3 seconds
                    handleClosePopup();
                }
            }, void 0, false, {
                fileName: "[project]/Components/DepartmentPage/departments.jsx",
                lineNumber: 155,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/DepartmentPage/departments.jsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
};
_s(DepartmentsPage, "20C7LilWRLUdT74t2yOuvsX/hCg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DepartmentsPage;
const __TURBOPACK__default__export__ = DepartmentsPage;
var _c;
__turbopack_context__.k.register(_c, "DepartmentsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/RoomsDepartment/roomsDepartment.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/departmentService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$RoomDepartmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/RoomDepartmentService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const RoomsDepartment = ()=>{
    _s();
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [roomDepartments, setRoomDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableRoomDepartments, setAvailableRoomDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedRoomId, setSelectedRoomId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [actionStatus, setActionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: null,
        message: null
    });
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [roomSearchTerm, setRoomSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomsDepartment.useEffect": ()=>{
            const loadDepartments = {
                "RoomsDepartment.useEffect.loadDepartments": async ()=>{
                    try {
                        setLoading(true);
                        const allDepartments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDepartments"])();
                        setDepartments(allDepartments || []);
                    } catch (err) {
                        console.error("Error fetching departments:", err);
                        setError("Failed to load departments. Please try again.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["RoomsDepartment.useEffect.loadDepartments"];
            loadDepartments();
        }
    }["RoomsDepartment.useEffect"], []);
    const fetchRoomDepartmentData = async (departmentId)=>{
        if (!departmentId) {
            console.error("Invalid departmentId:", departmentId);
            return; // Prevent API calls with undefined departmentId
        }
        try {
            setLoading(true);
            setError(null);
            const [departmentRooms, allAvailableRooms] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$RoomDepartmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchSelectedRoomDepartments"])(departmentId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$RoomDepartmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAvailableRoomDepartments"])(departmentId)
            ]);
            setRoomDepartments(departmentRooms || []);
            setAvailableRoomDepartments(allAvailableRooms || []);
        } catch (err) {
            console.error("Error fetching room departments:", err);
            setError("Failed to load room departments. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomsDepartment.useEffect": ()=>{
            if (selectedDepartmentId) {
                fetchRoomDepartmentData(selectedDepartmentId);
            }
        }
    }["RoomsDepartment.useEffect"], [
        selectedDepartmentId
    ]);
    const handleDepartmentChange = (e)=>{
        setSelectedDepartmentId(e.target.value);
        setSelectedRoomId("");
    };
    const handleAddRoom = async ()=>{
        if (!selectedRoomId) {
            setActionStatus({
                type: 'error',
                message: 'Please select a room first'
            });
            setTimeout(()=>setActionStatus({
                    type: null,
                    message: null
                }), 3000);
            return;
        }
        try {
            setActionStatus({
                type: 'loading',
                message: 'Adding room...'
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$RoomDepartmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addRoomToDepartment"])(selectedDepartmentId, selectedRoomId);
            await fetchRoomDepartmentData(selectedDepartmentId);
            setSelectedRoomId("");
            setActionStatus({
                type: 'success',
                message: 'Room added successfully'
            });
            setTimeout(()=>setActionStatus({
                    type: null,
                    message: null
                }), 3000);
        } catch (err) {
            console.error("Error adding room:", err);
            setActionStatus({
                type: 'error',
                message: 'Failed to add room. Please try again.'
            });
        }
    };
    // Filter departments based on search term
    const filteredDepartments = departments.filter((dept)=>dept.departmentName?.toLowerCase().includes(searchTerm.toLowerCase()));
    // Filter rooms based on search term
    const filteredRooms = roomDepartments.filter((room)=>room.roomName?.toLowerCase().includes(roomSearchTerm.toLowerCase()) || room.roomCapacity?.toString().includes(roomSearchTerm));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 sm:p-6 mx-auto bg-white min-h-screen w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl text-gray-900 font-bold",
                        children: "Room Department Management"
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600",
                        children: "Manage room assignments for departments"
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border rounded-md p-6 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-lg font-semibold text-gray-900 mb-4",
                            children: "Select a Department"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row gap-4 items-start md:items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex-grow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-5 w-5 text-gray-400",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Search departments...",
                                            value: searchTerm,
                                            onChange: (e)=>setSearchTerm(e.target.value),
                                            className: "pl-10 w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                loading && !selectedDepartmentId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "animate-spin h-5 w-5 text-blue-500 mr-2",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    className: "opacity-25",
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "10",
                                                    stroke: "currentColor",
                                                    strokeWidth: "4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    className: "opacity-75",
                                                    fill: "currentColor",
                                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-600",
                                            children: "Loading departments..."
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedDepartmentId,
                                    onChange: handleDepartmentChange,
                                    className: "w-full md:w-1/2 px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "-- Select a Department --"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this),
                                        filteredDepartments.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: dept.departmentId,
                                                children: dept.departmentName
                                            }, dept.departmentId, false, {
                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-5 w-5 mr-2 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            actionStatus.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mb-6 p-3 rounded-md text-sm flex items-center ${actionStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : actionStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`,
                children: [
                    actionStatus.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-5 w-5 mr-2 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 174,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 173,
                        columnNumber: 13
                    }, this),
                    actionStatus.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-5 w-5 mr-2 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 179,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this),
                    actionStatus.type === 'loading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "animate-spin h-5 w-5 mr-2 text-blue-500",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                className: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                strokeWidth: "4"
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 184,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                className: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, this),
                    actionStatus.message
                ]
            }, void 0, true, {
                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                lineNumber: 167,
                columnNumber: 9
            }, this),
            selectedDepartmentId ? loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border rounded-md p-8 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "animate-spin h-8 w-8 text-blue-500 mb-4",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4"
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                    lineNumber: 197,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                    lineNumber: 198,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700",
                            children: "Loading rooms..."
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 200,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                    lineNumber: 195,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                lineNumber: 194,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 border rounded-md p-6 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-lg font-semibold text-gray-900 mb-4",
                                children: "Add Room to Department"
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedRoomId,
                                        onChange: (e)=>setSelectedRoomId(e.target.value),
                                        className: "flex-1 px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500",
                                        disabled: availableRoomDepartments.length === 0,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select an available room"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this),
                                            availableRoomDepartments.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: room.roomId,
                                                    children: [
                                                        room.roomName,
                                                        " (Capacity: ",
                                                        room.roomCapacity,
                                                        ")"
                                                    ]
                                                }, room.roomId, true, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 216,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddRoom,
                                        disabled: !selectedRoomId,
                                        className: "px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors",
                                        children: "Add Room"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 221,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 207,
                                columnNumber: 15
                            }, this),
                            availableRoomDepartments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-gray-600",
                                children: "No available rooms to add."
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 230,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 205,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 border rounded-md p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex flex-col md:flex-row justify-between items-start md:items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-lg font-semibold text-gray-900 mb-2 md:mb-0",
                                        children: "Rooms in Selected Department"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 236,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full md:w-64",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "h-5 w-5 text-gray-400",
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    viewBox: "0 0 20 20",
                                                    fill: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                        lineNumber: 240,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 239,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search rooms...",
                                                value: roomSearchTerm,
                                                onChange: (e)=>setRoomSearchTerm(e.target.value),
                                                className: "pl-10 w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 237,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, this),
                            roomDepartments.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto border border-gray-200 rounded-md",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "min-w-full divide-y divide-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "bg-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left text-sm font-medium text-gray-900",
                                                                children: "Room Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                                lineNumber: 259,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left text-sm font-medium text-gray-900",
                                                                children: "Capacity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                                lineNumber: 260,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                        lineNumber: 258,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 257,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: filteredRooms.length > 0 ? filteredRooms.map((room, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: `${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900",
                                                                    children: room.roomName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                                    lineNumber: 268,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-3 whitespace-nowrap text-sm text-gray-900",
                                                                    children: room.roomCapacity
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                                    lineNumber: 271,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, room.roomId, true, {
                                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                            lineNumber: 266,
                                                            columnNumber: 29
                                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: "2",
                                                            className: "px-6 py-4 text-center text-sm text-gray-700",
                                                            children: "No rooms match your search"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                            lineNumber: 278,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                                    lineNumber: 263,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 256,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 255,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm text-gray-600",
                                        children: [
                                            "Showing ",
                                            filteredRooms.length,
                                            " of ",
                                            roomDepartments.length,
                                            " rooms"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-8 bg-white rounded-md border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "mx-auto h-12 w-12 text-gray-400",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 1,
                                            d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                            lineNumber: 293,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 292,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-2 text-sm font-medium text-gray-900",
                                        children: "No rooms"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 295,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-gray-700",
                                        children: "No rooms assigned to this department yet."
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                        lineNumber: 296,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 291,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                        lineNumber: 234,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border rounded-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center p-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "mx-auto h-16 w-16 text-blue-400",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 1,
                                d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                                lineNumber: 306,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 305,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "mt-4 text-lg font-medium text-gray-900",
                            children: "Select a department to manage rooms"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-base text-gray-700",
                            children: "Please select a department from the dropdown above to view and manage its rooms."
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                            lineNumber: 309,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                    lineNumber: 304,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
                lineNumber: 303,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/RoomsDepartment/roomsDepartment.jsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
};
_s(RoomsDepartment, "G38/adx3uG7BgdVmDoO9Ck8eVr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RoomsDepartment;
const __TURBOPACK__default__export__ = RoomsDepartment;
var _c;
__turbopack_context__.k.register(_c, "RoomsDepartment");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/RoomSchedule/roomSchedule.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/departmentService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$timeslotService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/timeslotService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$roomScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/roomScheduleService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const RoomSchedule = ()=>{
    _s();
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [days, setDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [timeslots, setTimeslots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [availableRoomSchedules, setAvailableRoomSchedules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedRoomSchedules, setSelectedRoomSchedules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [actionStatus, setActionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: null,
        message: null
    });
    const [searchAvailable, setSearchAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchSelected, setSearchSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchDepartment, setSearchDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomSchedule.useEffect": ()=>{
            const loadInitialData = {
                "RoomSchedule.useEffect.loadInitialData": async ()=>{
                    try {
                        setLoading(true);
                        const [allDepartments, allDays, allTimeslots] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$departmentService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDepartments"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$timeslotService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDays"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$timeslotService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTimeslots"])()
                        ]);
                        setDepartments(allDepartments || []);
                        setDays(allDays || []);
                        setTimeslots(allTimeslots || []);
                    } catch (err) {
                        console.error("Error loading initial data:", err);
                        setError("Failed to load initial data. Please try again.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["RoomSchedule.useEffect.loadInitialData"];
            loadInitialData();
        }
    }["RoomSchedule.useEffect"], []);
    const fetchRoomScheduleData = async (departmentId)=>{
        if (!departmentId) {
            console.error("Invalid departmentId:", departmentId);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const [availableSchedules, selectedSchedules] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$roomScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAvailableRoomSchedules"])(departmentId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$roomScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchSelectedRoomSchedules"])(departmentId)
            ]);
            console.log("Available Room Schedules:", availableSchedules); // Debugging log
            console.log("Selected Room Schedules:", selectedSchedules); // Debugging log
            setAvailableRoomSchedules(availableSchedules || []);
            setSelectedRoomSchedules(selectedSchedules || []);
        } catch (err) {
            console.error("Error fetching room schedules:", err);
            setError("Failed to load room schedules. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomSchedule.useEffect": ()=>{
            if (selectedDepartmentId) {
                fetchRoomScheduleData(selectedDepartmentId);
            }
        }
    }["RoomSchedule.useEffect"], [
        selectedDepartmentId
    ]);
    const handleDepartmentChange = (e)=>{
        setSelectedDepartmentId(e.target.value);
    };
    const handleAddSchedule = async (schedule)=>{
        try {
            // Use the IDs directly from the mapped schedule
            const payload = {
                roomId: schedule.roomId,
                dayId: schedule.dayId,
                timeslotId: schedule.timeslotId,
                isOccupied: schedule.isOccupied || false,
                departmentId: selectedDepartmentId,
                isChosen: true
            };
            console.log("Adding schedule with payload:", payload);
            setActionStatus({
                type: 'loading',
                message: 'Adding schedule...'
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$roomScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addRoomSchedule"])(payload);
            await fetchRoomScheduleData(selectedDepartmentId);
            setActionStatus({
                type: 'success',
                message: 'Schedule added successfully'
            });
            setTimeout(()=>setActionStatus({
                    type: null,
                    message: null
                }), 3000);
        } catch (err) {
            console.error("Error adding schedule:", err);
            setActionStatus({
                type: 'error',
                message: 'Failed to add schedule. Please try again.'
            });
            setTimeout(()=>setActionStatus({
                    type: null,
                    message: null
                }), 3000);
        }
    };
    const handleRemoveSchedule = async (schedule)=>{
        try {
            setActionStatus({
                type: 'loading',
                message: 'Removing schedule...'
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$roomScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeRoomSchedule"])(schedule); // Pass the full schedule object
            await fetchRoomScheduleData(selectedDepartmentId);
            setActionStatus({
                type: 'success',
                message: 'Schedule removed successfully'
            });
            setTimeout(()=>setActionStatus({
                    type: null,
                    message: null
                }), 3000);
        } catch (err) {
            console.error("Error removing schedule:", err);
            setActionStatus({
                type: 'error',
                message: 'Failed to remove schedule. Please try again.'
            });
            setTimeout(()=>setActionStatus({
                    type: null,
                    message: null
                }), 3000);
        }
    };
    // Filter departments based on search
    const filteredDepartments = departments.filter((dept)=>dept.departmentName.toLowerCase().includes(searchDepartment.toLowerCase()));
    // Filter available schedules based on search
    const filteredAvailableSchedules = availableRoomSchedules.filter((schedule)=>(schedule.roomName?.toLowerCase() || "").includes(searchAvailable.toLowerCase()) || (schedule.dayName?.toLowerCase() || "").includes(searchAvailable.toLowerCase()) || (schedule.startTime?.toLowerCase() || "").includes(searchAvailable.toLowerCase()));
    // Filter selected schedules based on search
    const filteredSelectedSchedules = selectedRoomSchedules.filter((schedule)=>(schedule.roomName?.toLowerCase() || "").includes(searchSelected.toLowerCase()) || (schedule.dayName?.toLowerCase() || "").includes(searchSelected.toLowerCase()) || (schedule.startTime?.toLowerCase() || "").includes(searchSelected.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 sm:p-6 mx-auto bg-gray-100 min-h-screen w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold text-gray-800 mb-4",
                children: "Room Schedules"
            }, void 0, false, {
                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-blue-800",
                    children: "It lets you view the available rooms and their schedules, and you can select the one that fits a department."
                }, void 0, false, {
                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-md overflow-hidden mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-lg font-semibold text-gray-800 mb-4",
                            children: "Department Selection"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        loading && !selectedDepartmentId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "animate-spin h-5 w-5 text-blue-500 mr-2",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: "Loading departments..."
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: selectedDepartmentId,
                            onChange: handleDepartmentChange,
                            className: "w-full px-4 py-2 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "-- Select a Department --"
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                departments.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: dept.departmentId,
                                        children: dept.departmentName
                                    }, dept.departmentId, false, {
                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            selectedDepartmentId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md p-8 flex items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "animate-spin h-8 w-8 text-blue-500 mr-3",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4"
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 195,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 193,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-700",
                            children: "Loading room schedules..."
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                    lineNumber: 192,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        actionStatus.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mb-6 p-4 rounded-lg text-sm flex items-center shadow-lg ${actionStatus.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : actionStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`,
                            children: [
                                actionStatus.type === 'loading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "animate-spin h-4 w-4 mr-2",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 210,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 211,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 209,
                                    columnNumber: 21
                                }, this),
                                actionStatus.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-4 w-4 mr-2",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                        lineNumber: 216,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 215,
                                    columnNumber: 21
                                }, this),
                                actionStatus.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-4 w-4 mr-2",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                        lineNumber: 221,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 220,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: actionStatus.message
                                }, void 0, false, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 224,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 203,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold text-blue-800 mb-1",
                                                    children: "Available Room Schedules"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 233,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 mb-4",
                                                    children: "Click to add a schedule to your department"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 234,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: searchAvailable,
                                                            onChange: (e)=>setSearchAvailable(e.target.value),
                                                            placeholder: "Search available schedules...",
                                                            className: "w-full px-4 py-2 pr-10 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 237,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-5 w-5 text-gray-400",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                    lineNumber: 246,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 245,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 244,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 236,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "available-schedules-container h-[60vh] overflow-y-auto",
                                                children: filteredAvailableSchedules.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "overflow-x-auto ring-1 ring-gray-200 rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                        className: "min-w-full divide-y divide-gray-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                className: "bg-gray-50 sticky top-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Room"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 258,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Type"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 259,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Day"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 260,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Time"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 261,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Action"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 262,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                    lineNumber: 257,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 256,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                className: "bg-white divide-y divide-gray-200",
                                                                children: filteredAvailableSchedules.map((schedule, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        className: "hover:bg-blue-50 transition-colors",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800",
                                                                                children: schedule.roomName || "N/A"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 268,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600",
                                                                                children: schedule.roomType || "N/A"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 271,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600",
                                                                                children: schedule.dayName || "N/A"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 274,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600",
                                                                                children: schedule.startTime && schedule.endTime ? `${schedule.startTime} - ${schedule.endTime}` : "N/A"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 277,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleAddSchedule(schedule),
                                                                                    className: "px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors flex items-center",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-3 w-3 mr-1",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                                lineNumber: 288,
                                                                                                columnNumber: 41
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                            lineNumber: 287,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        "Add"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                    lineNumber: 283,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 282,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, index, true, {
                                                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                        lineNumber: 267,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 265,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                        lineNumber: 255,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 254,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center p-8 bg-gray-50 rounded-lg border border-gray-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "mx-auto h-12 w-12 text-gray-400",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 1,
                                                                d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 301,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 300,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "mt-2 text-sm font-medium text-gray-900",
                                                            children: "No available schedules"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 303,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-sm text-gray-500",
                                                            children: "There are no available room schedules for this department."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 304,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 299,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                lineNumber: 252,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 251,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 px-4 py-3 border-t border-gray-200 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    filteredAvailableSchedules.length,
                                                    " schedule",
                                                    filteredAvailableSchedules.length !== 1 ? 's' : '',
                                                    " available"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                lineNumber: 310,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 309,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 231,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold text-green-800 mb-1",
                                                    children: "Department Room Schedules"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 319,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 mb-4",
                                                    children: "Currently assigned room schedules for this department"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 320,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: searchSelected,
                                                            onChange: (e)=>setSearchSelected(e.target.value),
                                                            placeholder: "Search selected schedules...",
                                                            className: "w-full px-4 py-2 pr-10 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 323,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-5 w-5 text-gray-400",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                    lineNumber: 332,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 331,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 330,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 322,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 318,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "selected-schedules-container h-[60vh] overflow-y-auto",
                                                children: filteredSelectedSchedules.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "overflow-x-auto ring-1 ring-gray-200 rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                        className: "min-w-full divide-y divide-gray-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                className: "bg-gray-50 sticky top-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Room"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 344,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Type"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 345,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Day"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 346,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Time"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 347,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                            children: "Action"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                            lineNumber: 348,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                    lineNumber: 343,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 342,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                className: "bg-white divide-y divide-gray-200",
                                                                children: filteredSelectedSchedules.map((schedule, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        className: "hover:bg-green-50 transition-colors",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800",
                                                                                children: schedule.roomName
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 354,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600",
                                                                                children: schedule.roomType
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 357,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600",
                                                                                children: schedule.dayName
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 360,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600",
                                                                                children: [
                                                                                    schedule.startTime,
                                                                                    " - ",
                                                                                    schedule.endTime
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 363,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "px-4 py-3 whitespace-nowrap text-sm",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleRemoveSchedule(schedule),
                                                                                    className: "px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors flex items-center",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-3 w-3 mr-1",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                                lineNumber: 372,
                                                                                                columnNumber: 41
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                            lineNumber: 371,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        "Remove"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                    lineNumber: 367,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                                lineNumber: 366,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, index, true, {
                                                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                        lineNumber: 353,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 351,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                        lineNumber: 341,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 340,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center p-8 bg-gray-50 rounded-lg border border-gray-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "mx-auto h-12 w-12 text-gray-400",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 1,
                                                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                                lineNumber: 385,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 384,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "mt-2 text-sm font-medium text-gray-900",
                                                            children: "No schedules"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 387,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-sm text-gray-500",
                                                            children: "No room schedules assigned to this department yet."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                            lineNumber: 388,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                    lineNumber: 383,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                lineNumber: 338,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 337,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 px-4 py-3 border-t border-gray-200 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    filteredSelectedSchedules.length,
                                                    " schedule",
                                                    filteredSelectedSchedules.length !== 1 ? 's' : '',
                                                    " selected"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                                lineNumber: 394,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                            lineNumber: 393,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 229,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                    lineNumber: 200,
                    columnNumber: 13
                }, this)
            }, void 0, false),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-5 w-5 mr-2 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                        lineNumber: 407,
                        columnNumber: 11
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                lineNumber: 406,
                columnNumber: 9
            }, this),
            actionStatus.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-4 right-4 p-4 rounded-lg text-sm flex items-center shadow-lg animate-fadeIn ${actionStatus.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : actionStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`,
                children: [
                    actionStatus.type === 'loading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "animate-spin h-4 w-4 mr-2",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                className: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                strokeWidth: "4"
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                lineNumber: 422,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                className: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            }, void 0, false, {
                                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                                lineNumber: 423,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                        lineNumber: 421,
                        columnNumber: 13
                    }, this),
                    actionStatus.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-4 w-4 mr-2",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 428,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                        lineNumber: 427,
                        columnNumber: 13
                    }, this),
                    actionStatus.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-4 w-4 mr-2",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                            lineNumber: 433,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                        lineNumber: 432,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: actionStatus.message
                    }, void 0, false, {
                        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                        lineNumber: 436,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
                lineNumber: 415,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/RoomSchedule/roomSchedule.jsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
};
_s(RoomSchedule, "wIZQn2pSPMuVsKMekcVz9eXRUHY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RoomSchedule;
const __TURBOPACK__default__export__ = RoomSchedule;
var _c;
__turbopack_context__.k.register(_c, "RoomSchedule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/FailedSchedule/failedScheduleService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchFailedSchedules": (()=>fetchFailedSchedules)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const BASE_URL = 'http://localhost:9921';
const fetchFailedSchedules = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${BASE_URL}/timetable/failedSchedules`);
        return response.data;
    } catch (error) {
        console.error('Error fetching failed schedules:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Components/FailedSchedule/failedSchedule.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$FailedSchedule$2f$failedScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/FailedSchedule/failedScheduleService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-client] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-client] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-client] (ecmascript) <export default as TableContainer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-client] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-client] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/AlertTitle/AlertTitle.js [app-client] (ecmascript) <export default as AlertTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Info.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ErrorOutline.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const FailedSchedule = ()=>{
    _s();
    const [failedSchedules, setFailedSchedules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FailedSchedule.useEffect": ()=>{
            const getFailedSchedules = {
                "FailedSchedule.useEffect.getFailedSchedules": async ()=>{
                    try {
                        setLoading(true);
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$FailedSchedule$2f$failedScheduleService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchFailedSchedules"])();
                        const sortedData = data.sort({
                            "FailedSchedule.useEffect.getFailedSchedules.sortedData": (a, b)=>a.courseId - b.courseId
                        }["FailedSchedule.useEffect.getFailedSchedules.sortedData"]);
                        setFailedSchedules(sortedData);
                    } catch (err) {
                        setError('Failed to load data. Please try again later.');
                        console.error(err);
                    } finally{
                        setLoading(false);
                    }
                }
            }["FailedSchedule.useEffect.getFailedSchedules"];
            getFailedSchedules();
        }
    }["FailedSchedule.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {}, void 0, false, {
                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
            severity: "error",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__["AlertTitle"], {
                    children: "Error"
                }, void 0, false, {
                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                error
            ]
        }, void 0, true, {
            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
            lineNumber: 58,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            padding: 3
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "h5",
                gutterBottom: true,
                sx: {
                    fontWeight: 'bold',
                    color: 'black'
                },
                children: "Failed Schedules"
            }, void 0, false, {
                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                sx: {
                    mb: 4,
                    bgcolor: '#f8f9fa',
                    border: '1px solid #e0e0e0'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        mr: 1,
                                        color: 'primary.main'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "h6",
                                    sx: {
                                        color: 'black'
                                    },
                                    children: "Information"
                                }, void 0, false, {
                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "body1",
                            sx: {
                                color: 'black'
                            },
                            children: "These are the failed schedules during the last timetable generation process. Each entry represents a class that could not be scheduled due to various constraints or conflicts."
                        }, void 0, false, {
                            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            failedSchedules.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                severity: "success",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$AlertTitle$2f$AlertTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTitle$3e$__["AlertTitle"], {
                        children: "Success"
                    }, void 0, false, {
                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    "No failed schedules found. All classes were successfully scheduled."
                ]
            }, void 0, true, {
                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                lineNumber: 85,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "subtitle1",
                        sx: {
                            mb: 2,
                            color: 'black'
                        },
                        children: [
                            "Total Failed Scheduled: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                label: failedSchedules.length,
                                color: "error",
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                lineNumber: 92,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__["TableContainer"], {
                        component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"],
                        sx: {
                            mb: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                                    sx: {
                                        bgcolor: '#e3f2fd'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    fontWeight: "bold",
                                                    sx: {
                                                        color: '#0d47a1'
                                                    },
                                                    children: "#"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 99,
                                                    columnNumber: 30
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    fontWeight: "bold",
                                                    sx: {
                                                        color: '#0d47a1'
                                                    },
                                                    children: "Course ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 100,
                                                    columnNumber: 30
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    fontWeight: "bold",
                                                    sx: {
                                                        color: '#0d47a1'
                                                    },
                                                    children: "Class ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 101,
                                                    columnNumber: 30
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 101,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    fontWeight: "bold",
                                                    sx: {
                                                        color: '#0d47a1'
                                                    },
                                                    children: "Period ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 102,
                                                    columnNumber: 30
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 102,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    fontWeight: "bold",
                                                    sx: {
                                                        color: '#0d47a1'
                                                    },
                                                    children: "Reason"
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 103,
                                                    columnNumber: 30
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                                    children: failedSchedules.map((schedule, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            sx: {
                                                bgcolor: index % 2 === 0 ? '#f1f8e9' : '#ffffff',
                                                '&:hover': {
                                                    bgcolor: '#c8e6c9'
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 115,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    children: schedule.courseId
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    children: schedule.classId
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    children: schedule.periodId
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 118,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: 'flex',
                                                            alignItems: 'flex-start'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ErrorOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                color: "error",
                                                                sx: {
                                                                    mr: 1,
                                                                    mt: 0.3,
                                                                    fontSize: '1rem'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                                lineNumber: 121,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                children: schedule.reason.split('.')[0] + '.'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                                lineNumber: 122,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                        lineNumber: 120,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                    lineNumber: 119,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                            lineNumber: 108,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        spacing: 2,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            item: true,
                            xs: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                sx: {
                                    p: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "h6",
                                        gutterBottom: true,
                                        sx: {
                                            color: 'black'
                                        },
                                        children: "Common Failure Reasons"
                                    }, void 0, false, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            mb: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: 'black'
                                        },
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Time conflicts"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 141,
                                                columnNumber: 21
                                            }, this),
                                            ": The class overlaps with other scheduled classes"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: 'black'
                                        },
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Resource constraints"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 144,
                                                columnNumber: 21
                                            }, this),
                                            ": Required resources (rooms, equipment) are unavailable"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: 'black'
                                        },
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Faculty constraints"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 147,
                                                columnNumber: 21
                                            }, this),
                                            ": Instructor availability issues"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: 'black'
                                        },
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "No available lecture spots"
                                            }, void 0, false, {
                                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                                lineNumber: 150,
                                                columnNumber: 21
                                            }, this),
                                            ": All possible time slots are already occupied"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/Components/FailedSchedule/failedSchedule.jsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
};
_s(FailedSchedule, "cx0aZT1OQP5RWZ7CCaDkV4+ODMw=");
_c = FailedSchedule;
const __TURBOPACK__default__export__ = FailedSchedule;
var _c;
__turbopack_context__.k.register(_c, "FailedSchedule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=Components_ee6d5a47._.js.map