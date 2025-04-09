'use client';  
import React, { useState } from 'react';  
import {   
  Calendar, Clock, Users, Home, BookOpen, DoorOpen,   
  School, DoorClosed, ChevronsLeft, ChevronsRight,
  ChevronDown, ChevronRight, BarChart3
} from 'lucide-react';  

// Import all page components  
import DashboardPage from '@/Components/Core/DashboardPage/dashboard';  
import TimetablePage from '@/Components/Core/TimetablePage/timetable';  
import RoomsPage from '@/Components/Management/RoomsPage/rooms';  
import LecturersPage from '@/Components/Management/LecturersPage/lecturers';
import LecturerSchedulePage from './lecturers/schedules/page';  
import ClassesPage from '@/Components/Management/ClassesPage/classes';
import ClassSchedulePage from '@/Components/Management/ClassesPage/ClassSchedule';
import ProgramCourse from '@/Components/Configurations/ProgramCourses/programCourse';
import CoursePage from '@/Components/Management/CoursePage/courses';  
import FacultyPage from '@/Components/Management/FacultyPage/faculty';  
import ProgramPage from '@/Components/Management/ProgramPage/program';  
import DepartmentPage from '@/Components/Management/DepartmentPage/departments';  
import TimetableResourceAnalysis from '@/Components/InsightPage/insight';
import RoomsDepartment from '@/Components/Configurations/RoomsDepartment/roomsDepartment';
import RoomSchedule from '@/Components/Configurations/RoomSchedule/roomSchedule';
import FailedSchedule from '@/Components/Configurations/FailedSchedule/failedSchedule';

const TimetableManagementDashboard = () => {  
  const [activePage, setActivePage] = useState('dashboard');  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({
    'Core Features': true,
    'Management': true,
    'Configuration': true,
    'Insights': true
  });
  const [pageTransition, setPageTransition] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  
  const toggleGroup = (groupTitle) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  const handlePageChange = (page) => {
    if (page === activePage) return;
    // Start exit animation
    setPageTransition(true);
    
    // Change page after animation completes
    setTimeout(() => {
      setActivePage(page);
      // Reset for entrance animation
      setTimeout(() => {
        setPageTransition(false);
      }, 50);
    }, 300);
  };

  const navigationGroups = [
    {
      title: 'Core Features',
      items: [
        { page: 'dashboard', title: 'Dashboard', icon: Home },
        { page: 'timetable', title: 'Timetable', icon: Calendar },
      ],
    },
    {
      title: 'Management',
      items: [
        { page: 'departments', title: 'Departments', icon: BookOpen },
        { page: 'program', title: 'Programs', icon: DoorOpen },
        { page: 'faculty', title: 'Faculty', icon: School },
        { page: 'courses', title: 'Courses', icon: Clock },
        { page: 'classes', title: 'Classes', icon: Users },
        { page: 'lecturers', title: 'Lecturers', icon: Users },
        { page: 'rooms', title: 'Rooms', icon: DoorClosed },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { page: 'schedules', title: 'Lecturer Schedules', icon: Users },
        { page: 'class-schedules', title: 'Class Schedules', icon: Users },
        { page: 'program-courses', title: 'Program Courses', icon: BookOpen },
        { page: 'rooms-department', title: 'Rooms & Departments', icon: DoorOpen },
        { page: 'room-schedules', title: 'Room Schedules', icon: DoorClosed },
        { page: 'failed-schedules', title: 'Failed Schedules', icon: DoorClosed },
      
      ],
    },
    {
      title: 'Insights',
      items: [
        { page: 'Insights', title: 'Analytics', icon: BarChart3 },
      ],
    },
  ];

  // Page content components  
  const renderPageContent = () => {  
    switch (activePage) {  
      case 'dashboard': return <DashboardPage />;  
      case 'timetable': return <TimetablePage />;  
      case 'faculty': return <FacultyPage />;  
      case 'program': return <ProgramPage />;  
      case 'lecturers': return <LecturersPage />;
      case 'schedules': return <LecturerSchedulePage />;  
      case 'courses': return <CoursePage />;  
      case 'classes': return <ClassesPage />;  
      case 'rooms': return <RoomsPage />;  
      case 'departments': return <DepartmentPage />;  
      case 'Insights': return <TimetableResourceAnalysis />;
      case 'class-schedules': return <ClassSchedulePage />;
      case 'program-courses': return <ProgramCourse />;
      case 'rooms-department': return <RoomsDepartment />;
      case 'room-schedules': return <RoomSchedule />;
      case 'failed-schedules': return <FailedSchedule />;
      default: return <DashboardPage />;  
    }  
  };  

  return (  
    <div className="flex min-h-screen bg-gray-50">  
      {/* Sidebar */}  
      <aside   
        className={`bg-gradient-to-b from-indigo-800 to-indigo-900 text-white fixed left-0 top-0 bottom-0 overflow-y-auto transition-all duration-500 ease-in-out z-40 shadow-xl ${
          sidebarCollapsed ? 'w-16' : 'w-64'  
        }`}  
      >  
        {/* Sidebar Header */}  
        <div className="py-5 px-4 text-center font-bold border-b border-indigo-700 bg-indigo-900 flex items-center justify-between">  
          {!sidebarCollapsed ? (  
            <h1 className="text-xl transition-opacity duration-300">
              Timetable System
            </h1>  
          ) : (  
            <span className="text-xl font-bold mx-auto transition-opacity duration-300">TS</span>  
          )}
          
          {/* Positioned Sidebar Collapse Button */}  
          <button   
            onClick={toggleSidebar}   
            className={`text-white hover:bg-indigo-700 rounded-full p-1.5 transition-all duration-300 ${
              sidebarCollapsed ? 'ml-auto mr-0' : 'mr-0'
            }`}  
          >  
            {sidebarCollapsed ? 
              <ChevronsRight className="h-4 w-4" /> : 
              <ChevronsLeft className="h-4 w-4" />
            }  
          </button>  
        </div>  

        {/* Navigation */}  
        <nav className="py-4">  
          {navigationGroups.map((group) => (
            <div key={group.title} className="mb-2 px-2">
              {!sidebarCollapsed ? (
                <button 
                  onClick={() => toggleGroup(group.title)}
                  className="w-full px-3 py-2 flex items-center justify-between text-indigo-200 hover:text-white rounded-md transition-colors group"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">{group.title}</span>
                  <span className="transition-transform duration-300">
                    {expandedGroups[group.title] ? 
                      <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100" /> : 
                      <ChevronRight className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                    }
                  </span>
                </button>
              ) : (
                <div className="border-b border-indigo-700 mx-1 my-2"></div>
              )}
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedGroups[group.title] ? 'max-h-96' : 'max-h-0'
              } ${sidebarCollapsed ? 'max-h-96' : ''}`}>
                <ul className="mt-1 space-y-1">
                  {group.items.map(({ page, title, icon: Icon }) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`w-full px-3 py-2 text-left flex items-center space-x-3 rounded-md transition-all duration-200 ${
                          activePage === page
                            ? 'bg-indigo-100 text-indigo-900 font-medium shadow-sm'
                            : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                        }`}
                        title={sidebarCollapsed ? title : ""}
                      >
                        <Icon className={`${sidebarCollapsed ? 'mx-auto' : ''} h-4 w-4 transition-all`} />
                        {!sidebarCollapsed && <span className="text-sm transition-opacity duration-300">{title}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>  
      </aside>  

      {/* Main Content Area */}  
      <main   
        className={`flex-1 transition-all duration-500 ease-in-out p-6 ${  
          sidebarCollapsed ? 'ml-16' : 'ml-64'  
        }`}  
      >  
        <div 
          
        >
          {renderPageContent()}  
        </div>
      </main>  
    </div>  
  );  
};  

export default TimetableManagementDashboard;