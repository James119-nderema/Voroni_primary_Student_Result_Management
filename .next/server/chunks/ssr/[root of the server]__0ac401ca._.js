module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/Components/ProgramPage/ProgramCourses.jsx [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const submitSelectedCourses = async ()=>{
    try {
        const selectedProgramObj = programs.find((p)=>p.uniqueId === selectedProgram);
        const selectedPeriodObj = periods.find((p)=>p.uniqueId === selectedPeriod);
        if (!selectedProgramObj) {
            throw new Error('No program selected');
        }
        if (!selectedPeriodObj) {
            throw new Error('No period selected');
        }
        const programId = selectedProgramObj.numericId;
        const periodId = selectedPeriodObj.numericId;
        const courseIds = (periodCourses[selectedPeriod] || []).map((course)=>{
            // Extract numeric ID directly from the uniqueId
            const match = course.uniqueId.match(/course-(\d+)/);
            if (!match) {
                throw new Error(`Invalid course ID format: ${course.uniqueId}`);
            }
            return match[1];
        });
        for (const courseId of courseIds){
            await axios.post('http://localhost:9921/programCourse', {
                programId,
                periodId,
                courseId: parseInt(courseId, 10) // Ensure it's a number
            });
        }
        setPeriodCourses((prev)=>({
                ...prev,
                [selectedPeriod]: []
            }));
        alert('Courses submitted successfully!');
    } catch (err) {
        console.error('Submission Error:', err);
        alert(`Failed to submit courses: ${err.message}`);
    }
};
}}),
"[project]/app/program/programcourses/[programId]/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EditProgramCourses)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$ProgramPage$2f$ProgramCourses$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/ProgramPage/ProgramCourses.jsx [app-ssr] (ecmascript)");
'use client';
;
;
function EditProgramCourses() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$ProgramPage$2f$ProgramCourses$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/program/programcourses/[programId]/page.js",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0ac401ca._.js.map