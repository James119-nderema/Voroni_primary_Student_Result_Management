module.exports = {

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
            //check user profile
            if (data.profile && data.profile.firstName && data.profile.lastName) {
                console.log('User profile:', data.profile);
                localStorage.setItem('firstName', data.profile.firstName);
                localStorage.setItem('lastName', data.profile.lastName);
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
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return headers;
};
}}),
"[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9921';
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
;
const fetchTodaysSchedules = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/timetable/today`, {
            headers: header
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
            headers: header
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
            headers: header
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
            headers: header
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
            headers: header
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
            headers: header
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
            headers: header
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)"); // Import addAuthHeaders
;
;
;
const header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])(); // Add authorization headers
const timetableServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}`;
const TimetableService = {
    getTimetable: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${timetableServiceUrl}/timetable/`, {
                headers: header
            });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            return [];
        }
    },
    generateTimetable: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${timetableServiceUrl}/timetable/generate`, {
                headers: header
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    downloadTimetable: async (activeDay, daysWithDates)=>{
        const dayIndex = daysWithDates.findIndex((day)=>day.name === activeDay) + 1; // 1-based index
        const response = await fetch(`${timetableServiceUrl}/timetable/pdf/days/${dayIndex}`);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${timetableServiceUrl}/lecturers/`, {
                headers: header
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            return [];
        }
    },
    getClasses: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${timetableServiceUrl}/classes/all`, {
                headers: header
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching classes:", error);
            return [];
        }
    },
    getRooms: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${timetableServiceUrl}/rooms/`, {
                headers: header
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
            switch(entityType){
                case 'lecturer':
                    endpoint = `${timetableServiceUrl}/timetable/pdf/lecturers/${entityId}`;
                    break;
                case 'class':
                    endpoint = `${timetableServiceUrl}/timetable/pdf/classes/${entityId}`;
                    break;
                case 'room':
                    endpoint = `${timetableServiceUrl}/timetable/pdf/rooms/${entityId}`;
                    break;
                case 'day':
                    endpoint = `${timetableServiceUrl}/timetable/pdf/days/${dayIndex}`;
                    break;
                default:
                    throw new Error('Invalid entity type');
            }
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`Failed to download ${entityType} timetable`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${entityName}-Timetable.zip`;
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
"[project]/Components/Services/rooms.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// services/rooms.js
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "roomsService": (()=>roomsService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
;
const roomServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms`;
const roomsService = {
    getAllRooms: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${roomServiceUrl}/`);
            console.log("Fetched rooms:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching rooms:", error);
            return [];
        }
    },
    deleteRoom: async (roomId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${roomServiceUrl}/${roomId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting room:", error);
            throw error;
        }
    },
    createRoom: async (roomData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${roomServiceUrl}/create`, roomData);
            return response.data;
        } catch (error) {
            console.error("Error creating room:", error);
            throw error;
        }
    },
    updateRoom: async (roomId, roomData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${roomServiceUrl}/${roomId}`, roomData);
            return response.data;
        } catch (error) {
            console.error("Error updating room:", error);
            throw error;
        }
    },
    getRoomById: async (roomId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${roomServiceUrl}/rooms/${roomId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching room with id ${roomId}:`, error);
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = roomsService;
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${lecturerScheduleUrl}/availabilities/generate/${lecturerId}`, {}, {
                headers
            } // Pass headers in the config object
            );
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
;
;
const classServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/classes`;
const addClass = async (classData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${classServiceUrl}/create`, classData);
        return response.data;
    } catch (error) {
        console.error("Error adding class:", error);
        throw new Error("Failed to add class.");
    }
};
const fetchClasses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${classServiceUrl}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw new Error("Failed to fetch classes.");
    }
};
const deleteClass = async (classId)=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${classServiceUrl}/delete/${classId}`);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${classServiceUrl}/update`, classData);
        return response.data;
    } catch (error) {
        console.error("Error updating class:", error);
        throw new Error("Failed to update class.");
    }
};
const fetchClassById = async (classId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${classServiceUrl}/${classId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching class:", error);
        throw new Error("Failed to fetch class details.");
    }
};
}}),
"[project]/Components/Services/periodService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// services/periodService.js
__turbopack_context__.s({
    "createPeriod": (()=>createPeriod),
    "default": (()=>__TURBOPACK__default__export__),
    "deletePeriod": (()=>deletePeriod),
    "getPeriodById": (()=>getPeriodById),
    "getPeriods": (()=>getPeriods),
    "updatePeriod": (()=>updatePeriod)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
;
const periodServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/periods`;
const getPeriods = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${periodServiceUrl}`, header);
        console.log("Fetched periods:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching periods:", error);
        return [];
    }
};
const deletePeriod = async (periodId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${periodServiceUrl}/${periodId}`, header);
        return response.data;
    } catch (error) {
        console.error("Error deleting period:", error);
        throw error;
    }
};
const createPeriod = async (periodData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${periodServiceUrl}/create`, periodData, header);
        return response.data;
    } catch (error) {
        console.error("Error creating period:", error);
        throw error;
    }
};
const updatePeriod = async (periodId, periodData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${periodServiceUrl}/${periodId}`, periodData, header);
        return response.data;
    } catch (error) {
        console.error("Error updating period:", error);
        throw error;
    }
};
const getPeriodById = async (periodId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${periodServiceUrl}/${periodId}`, header);
        return response.data;
    } catch (error) {
        console.error(`Error fetching period with id ${periodId}:`, error);
        throw error;
    }
};
const __TURBOPACK__default__export__ = {
    getPeriods,
    deletePeriod,
    createPeriod,
    updatePeriod,
    getPeriodById
};
}}),
"[project]/Components/Services/ProgramService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ProgramService": (()=>ProgramService),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const programServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/programs`;
const ProgramService = {
    // Fetch all programs
    getPrograms: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${programServiceUrl}/`);
            if (Array.isArray(response.data)) {
                return response.data.map((program, index)=>({
                        ...program,
                        uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
                        programId: program.programId,
                        programName: program.programName,
                        departmentId: program.departmentId,
                        departmentName: program.departmentName,
                        name: program.programName || `Unnamed Program ${index + 1}`,
                        numericId: program.programId || index + 1
                    }));
            } else if (response.data && Array.isArray(response.data.data)) {
                return response.data.data.map((program, index)=>({
                        ...program,
                        uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
                        programId: program.programId,
                        programName: program.programName,
                        departmentId: program.departmentId,
                        departmentName: program.departmentName,
                        name: program.programName || `Unnamed Program ${index + 1}`,
                        numericId: program.programId || index + 1
                    }));
            } else if (response.data && Array.isArray(response.data.programs)) {
                return response.data.programs.map((program, index)=>({
                        ...program,
                        uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
                        programId: program.programId,
                        programName: program.programName,
                        departmentId: program.departmentId,
                        departmentName: program.departmentName,
                        name: program.programName || `Unnamed Program ${index + 1}`,
                        numericId: program.programId || index + 1
                    }));
            } else if (response.data && typeof response.data === 'object') {
                console.warn('Unexpected response format:', response.data);
                const programsArray = Object.values(response.data);
                if (programsArray.length > 0) {
                    return programsArray.map((program, index)=>({
                            ...program,
                            uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
                            programId: program.programId,
                            programName: program.programName,
                            departmentId: program.departmentId,
                            departmentName: program.departmentName,
                            name: program.programName || `Unnamed Program ${index + 1}`,
                            numericId: program.programId || index + 1
                        }));
                }
                return [];
            }
            return [];
        } catch (error) {
            console.error('Programs Fetch Error:', error);
            return [];
        }
    },
    // Create a new program
    createProgram: async (programData)=>{
        try {
            console.log('Sending program data:', programData);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${programServiceUrl}/create`, programData);
            if (!response.status || response.status !== 200 && response.status !== 201) {
                throw new Error('Failed to create program');
            }
            return response.data;
        } catch (error) {
            console.error('Create Program Error:', error?.response?.data || error.message);
            throw new Error(`Failed to create program: ${error.message}`);
        }
    },
    // Delete a program
    deleteProgram: async (programId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${programServiceUrl}/delete/${programId}`);
            return response.data;
        } catch (error) {
            console.error('Delete Program Error:', error);
            throw new Error(`Failed to delete program: ${error.message}`);
        }
    },
    // Fetch all periods
    getPeriods: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${programServiceUrl}/periods`);
            return response.data.map((period, index)=>({
                    ...period,
                    uniqueId: period.id ? `period-${period.id}` : `period-${index}`,
                    name: period.name || `Y${Math.floor(index / 2) + 1}S${index % 2 + 1}`,
                    numericId: period.id || index + 1
                }));
        } catch (error) {
            console.error('Periods Fetch Error:', error);
            throw new Error(`Failed to load periods: ${error.message}`);
        }
    },
    // Fetch all courses
    getCourses: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${programServiceUrl}/courses`);
            return response.data.map((course, index)=>({
                    ...course,
                    uniqueId: course.id ? `course-${course.id}` : `course-${index}`,
                    courseCode: course.courseCode || course.code || `COURSE-${index + 1}`,
                    name: course.courseName || `Unnamed Course ${index + 1}`,
                    department: course.departmentName || 'Unknown Department'
                }));
        } catch (error) {
            console.error('Courses Fetch Error:', error);
            throw new Error(`Failed to load courses: ${error.message}`);
        }
    },
    // Fetch courses for a specific program and period
    getProgramCourses: async (programId, periodId)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${programServiceUrl}/programCourses/${programId}/${periodId}`);
            return response.data;
        } catch (error) {
            console.error('Program Courses Fetch Error:', error);
            return [];
        }
    },
    // Add a course to a program period
    addProgramCourse: async (programId, periodId, courseId)=>{
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${programServiceUrl}/programCourse`, {
                programId,
                periodId,
                courseId
            });
        } catch (error) {
            console.error('Add Program Course Error:', error);
            throw new Error(`Failed to add course: ${error.message}`);
        }
    },
    // Remove a course from a program period
    deleteProgramCourse: async (programCourseId)=>{
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${programServiceUrl}/programCourse/${programCourseId}`);
        } catch (error) {
            console.error('Delete Program Course Error:', error);
            throw new Error(`Failed to delete course: ${error.message}`);
        }
    },
    // Update a program
    updateProgram: async (programData)=>{
        try {
            const response = await fetch(`/api/programs/${programData.programId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(programData)
            });
            if (!response.ok) {
                throw new Error('Failed to update program');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in updateProgram:', error);
            throw error;
        }
    }
};
const __TURBOPACK__default__export__ = ProgramService;
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
;
const classScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/classes`;
const fetchSelectedSchedules = async (classId)=>{
    try {
        const response = await fetch(`${classScheduleUrl}/schedule/selected/${classId}`);
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
        const response = await fetch(`${classScheduleUrl}/schedule/available/${classId}`);
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
        console.log("Sending schedule data to API:", scheduleData);
        if (!scheduleData.classId || !scheduleData.dayName || !scheduleData.startTime || !scheduleData.endTime) {
            console.error("Missing required schedule data:", scheduleData);
            throw new Error("Missing required schedule data");
        }
        const response = await fetch(`${classScheduleUrl}/schedule/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheduleData)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error(`Failed to add schedule: ${response.status}`);
        }
        // Handle plain text response
        const responseText = await response.text();
        console.log("Server response:", responseText);
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
        console.log("Sending schedule data to API for deletion:", schedule);
        // Ensure the schedule object contains all required fields
        if (!schedule.classId || !schedule.dayName || !schedule.startTime || !schedule.endTime) {
            console.error("Missing required schedule data for deletion:", schedule);
            throw new Error("Missing required schedule data for deletion");
        }
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/schedule/delete`, {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
;
;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchPrograms = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/programs/`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        throw error;
    }
};
const fetchPeriods = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/periods`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching periods:', error);
        throw error;
    }
};
const fetchCourses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};
const fetchProgramCourses = async (programId, periodId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/program/${programId}/${periodId}`, {
            headers
        });
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
        }, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error adding course to program:', error);
        throw error;
    }
};
const removeCourseFromProgram = async (programCourseId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses/program/${programCourseId}`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error removing course from program:', error);
        throw error;
    }
};
}}),
"[project]/Components/Services/courses.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addCourse": (()=>addCourse),
    "deleteCourse": (()=>deleteCourse),
    "editCourse": (()=>editCourse),
    "fetchCourses": (()=>fetchCourses),
    "getCourseById": (()=>getCourseById)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const courseServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/courses`;
const fetchCourses = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${courseServiceUrl}/`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch courses.");
    }
};
const addCourse = async (courseData)=>{
    try {
        console.log("Sending data to API:", courseData);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${courseServiceUrl}/create`, courseData);
        console.log("API response:", response);
        // Handle different response structures
        if (response.data) {
            if (response.data.success === false) {
                return {
                    success: false,
                    message: response.data.message || "Server indicated failure"
                };
            }
            // Check if we have a direct success response
            if (response.data.success === true) {
                return {
                    success: true,
                    message: response.data.message || "Course added successfully!",
                    data: response.data.data // Include the returned course if available
                };
            }
            // If the API returns the created object directly
            return {
                success: true,
                message: "Course added successfully!",
                data: response.data // Assume the response is the created course
            };
        }
        return {
            success: false,
            message: "Unexpected response format from server"
        };
    } catch (error) {
        console.error("Error adding course:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to add course."
        };
    }
};
const editCourse = async (courseId, courseData)=>{
    try {
        console.log(`Updating course ${courseId} with data:`, courseData);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${courseServiceUrl}/update/${courseId}`, courseData);
        console.log("Update response:", response);
        // Handle successful response
        return {
            success: true,
            message: response.data?.message || "Course updated successfully!",
            data: response.data?.data || response.data // Include any returned data
        };
    } catch (error) {
        console.error("Error editing course:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to edit course."
        };
    }
};
const deleteCourse = async (courseId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${courseServiceUrl}/delete/${courseId}`);
        return {
            success: true,
            message: response.data?.message || "Course deleted successfully!"
        };
    } catch (error) {
        console.error("Error deleting course:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete course."
        };
    }
};
const getCourseById = async (courseId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${courseServiceUrl}/${courseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching course with ID ${courseId}:`, error);
        throw new Error(error.response?.data?.message || "Failed to fetch course details.");
    }
};
}}),
"[project]/Components/Services/facultyService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addFaculty": (()=>addFaculty),
    "deleteFaculty": (()=>deleteFaculty),
    "editFaculty": (()=>editFaculty),
    "fetchFaculties": (()=>fetchFaculties)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
;
const facultyServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/faculties`;
const fetchFaculties = async ()=>{
    try {
        const authHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${facultyServiceUrl}/`, authHeader);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching faculties:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch faculties.");
    }
};
const addFaculty = async (facultyData)=>{
    try {
        const authHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${facultyServiceUrl}/create`, facultyData, authHeader);
        if (response && response.status >= 200 && response.status < 300) {
            return {
                success: true,
                message: response.data?.message || "Faculty added successfully!",
                data: response.data
            };
        } else {
            return {
                success: false,
                message: response.data?.message || "Unexpected response from server."
            };
        }
    } catch (error) {
        console.error("Error adding faculty:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to add faculty."
        };
    }
};
const editFaculty = async (facultyId, facultyData)=>{
    try {
        const authHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${facultyServiceUrl}/update/${facultyId}`, facultyData, authHeader);
        return {
            success: true,
            message: response.data.message || "Faculty updated successfully!"
        };
    } catch (error) {
        console.error("Error editing faculty:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to edit faculty."
        };
    }
};
const deleteFaculty = async (facultyId)=>{
    try {
        const authHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${facultyServiceUrl}/delete/${facultyId}`, authHeader);
        return {
            success: true,
            message: response.data.message || "Faculty deleted successfully!"
        };
    } catch (error) {
        console.error("Error deleting faculty:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete faculty."
        };
    }
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/Services/HostConfig.js [app-ssr] (ecmascript)");
;
;
const header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
;
const departmentServiceUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/departments`;
const fetchDepartments = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${departmentServiceUrl}/`, {
            header
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${departmentServiceUrl}/create`, departmentData);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${departmentServiceUrl}/update/${departmentId}`, departmentData);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${departmentServiceUrl}/delete/${departmentId}`);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
;
;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const roomDepartmentUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms`;
const fetchSelectedRoomDepartments = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${roomDepartmentUrl}/department/selected/${departmentId}`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching selected room departments:', error);
        throw error;
    }
};
const fetchAvailableRoomDepartments = async (departmentId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${roomDepartmentUrl}/department/available/${departmentId}`, {
            headers
        });
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
        }, {
            headers
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
__turbopack_context__.s({
    "fetchDays": (()=>fetchDays),
    "fetchTimeslots": (()=>fetchTimeslots)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const fetchTimeslots = async ()=>{
    try {
        const response = await fetch("http://localhost:9921/timeslots", {
            headers
        });
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
        const response = await fetch("http://localhost:9921/days", {
            headers
        });
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
;
const roomScheduleUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/rooms`;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
// Fetch rooms data from API
const fetchRooms = async ()=>{
    try {
        const response = await fetch(`${roomScheduleUrl}/`, {
            headers
        });
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
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/days`, {
            headers
        });
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
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$Services$2f$HostConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]}/timeslots`, {
            headers
        });
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
    const response = await fetch(`${roomScheduleUrl}/schedule/available/${departmentId}`, {
        headers
    });
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
    const response = await fetch(`${roomScheduleUrl}/schedule/selected/${departmentId}`, {
        headers
    });
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
    }, {
        headers
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
    }, {
        headers
    });
    if (!response.ok) {
        throw new Error("Failed to remove room schedule");
    }
};
}}),
"[project]/Components/Services/scheduletrackerservice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getScheduleTracker": (()=>getScheduleTracker)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/LoginService.js [app-ssr] (ecmascript)");
;
;
const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$LoginService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAuthHeaders"])();
const BASE_URL = 'http://localhost:9921';
const getScheduleTracker = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${BASE_URL}/timetable/scheduletracker`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dchedule trackers:', error);
        throw error;
    }
};
}}),
"[project]/Components/Common/ConfirmationDialog.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ConfirmationDialog = ({ isOpen, title, message, onConfirm, onCancel })=>{
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg p-6 w-96",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold text-gray-900",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-600 mt-2",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex justify-end gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            className: "px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700",
                            children: "Confirm"
                        }, void 0, false, {
                            fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Components/Common/ConfirmationDialog.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ConfirmationDialog;
}}),

};

//# sourceMappingURL=Components_b472a191._.js.map