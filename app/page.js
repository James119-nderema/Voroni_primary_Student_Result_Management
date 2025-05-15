'use client';  
import React, { useState, useEffect } from 'react';  
import {   
  Calendar, Clock, Users, Home, BookOpen, DoorOpen,   
  School, DoorClosed, ChevronsLeft, ChevronsRight,
  ChevronDown, ChevronRight, BarChart3, Menu, X
} from 'lucide-react';  

// Import all page components
import StudentsTable from '@/Components/Management/StudentsPage/StudentsTable';   
import TeacherManagementSystem from '@/Components/Core/TeacherManagementSystem/TeacherManagementSystem';
import EnterMarksPage from '@/Components/Management/EnterMarkspage/StudentGradingSystem';
import SubjectPage from '@/Components/Core/Subject/Subjects';
import StudentMarksTable from '@/Components/Management/ViewMarkspage/StudentMarksTable';
import GradePage from '@/Components/Core/Grades/GradePage';

const VoroniPrimarySchoolDashboard = () => {  
  const [activePage, setActivePage] = useState('dashboard');  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({
    'Core Features': true,
    'Management': true,
    'Configuration': true,
    'Insights': true
  });
  const [pageTransition, setPageTransition] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle window resize with debounce for smoother transitions
  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 768) {
          setMobileMenuOpen(false);
        }
      }, 100); // Small delay for smoother state updates
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    if (windowWidth < 768) {
      setSidebarCollapsed(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
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
      
      // Close mobile menu when a page is selected
      if (windowWidth < 768) {
        setMobileMenuOpen(false);
      }
    }, 300);
  };

  // Get all navigation items flattened for mobile fullscreen menu
  const getAllNavigationItems = () => {
    const allItems = [];
    navigationGroups.forEach(group => {
      allItems.push({ isGroup: true, title: group.title });
      group.items.forEach(item => {
        allItems.push({ ...item, isGroup: false });
      });
    });
    return allItems;
  };

  const navigationGroups = [
    {
      title: 'Core Features',
      items: [
      
       
       
      ],
    },
    {
      title: 'Management',
      items: [
        { page: 'enterMarks', title: 'Enter Marks', icon: BookOpen },
        { page: 'studentManagement', title: 'Student Management', icon: Users },
        { page: 'teacherManagement', title: 'Teacher Management', icon: School },
        { page: 'subject', title: 'Subject', icon: BookOpen },
        { page: 'studentPerformance', title: 'Student Performance', icon: BarChart3 },
        { page: 'grade', title: 'Grade', icon: BookOpen },
      ]
    },
   
  ];

  const getCurrentPageTitle = () => {
    // Search through all navigation groups to find the matching page
    for (const group of navigationGroups) {
      const foundItem = group.items.find(item => item.page === activePage);
      if (foundItem) {
        return foundItem.title;
      }
    }
    return ''; // Default fallback
  };

  // Page content components  
  const renderPageContent = () => {  
    switch (activePage) {    
      case 'studentManagement': return <StudentsTable />;
      case 'teacherManagement': return <TeacherManagementSystem />;
      case 'enterMarks': return <EnterMarksPage />;
      case 'studentPerformance' : return <StudentMarksTable/>;
      case 'subject': return <SubjectPage/>;
      case 'grade': return <GradePage />;
      default: return null;  
    }  
  };  

  // Is this a mobile view?
  const isMobile = windowWidth < 768;

  // Navigation Header component - Now mobile only
  const NavHeader = () => (
    isMobile ? (
      <div className={`bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 right-0 z-40 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 mr-4 text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">{getCurrentPageTitle()}</h1>
                <p className="text-sm text-gray-500">Voroni Primary School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );

  // Fullscreen Mobile Menu
  const FullscreenMobileMenu = () => (
    <div 
      className={`fixed inset-0 bg-blue-900 text-white z-50 transition-all duration-500 ease-in-out transform ${
        mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      {/* Header with close button */}
      <div className="p-6 flex justify-between items-center border-b border-blue-800">
        <h1 className="text-xl font-bold">Voroni Primary School</h1>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 hover:bg-blue-800 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {/* Navigation Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-74px)]">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.title} className="mb-8">
            <h2 className="text-blue-300 text-sm font-bold uppercase tracking-wider mb-3 px-4">
              {group.title}
            </h2>
            <div className="space-y-2">
              {group.items.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handlePageChange(item.page)}
                  className={`w-full p-4 text-left flex items-center space-x-4 rounded-lg transition-all duration-200 ${
                    activePage === item.page
                      ? 'bg-blue-800 text-white font-medium'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-lg">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (  
    <div className="flex min-h-screen bg-gray-50">  
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside   
          className={`bg-gradient-to-b from-blue-800 to-blue-900 text-white fixed left-0 top-0 bottom-0 overflow-y-auto transition-all duration-500 ease-in-out shadow-xl z-50 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}  
        >  
          {/* Sidebar Header */}  
          <div className="py-5 px-4 text-center font-bold border-b border-blue-700 bg-blue-900 flex items-center justify-between">  
            {!sidebarCollapsed ? (  
              <h1 className="text-xl transition-opacity duration-300">
                Voroni Primary School
              </h1>  
            ) : (  
              <span className="text-xl font-bold mx-auto transition-opacity duration-300">VP</span>  
            )}
            
            {/* Sidebar Collapse Button */}  
            <button   
              onClick={toggleSidebar}   
              className={`text-white hover:bg-blue-700 rounded-full p-1.5 transition-all duration-300 ${
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
                    className="w-full px-3 py-2 flex items-center justify-between text-blue-200 hover:text-white rounded-md transition-colors group"
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
                  <div className="border-b border-blue-700 mx-1 my-2"></div>
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
                              ? 'bg-blue-100 text-blue-900 font-medium shadow-sm'
                              : 'text-blue-100 hover:bg-blue-700 hover:text-white'
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
      )}

      {/* Fullscreen Mobile Menu */}
      {isMobile && <FullscreenMobileMenu />}

      {/* Main Content Area - Modified padding for mobile only */}  
      <main   
        className={`flex-1 transition-all duration-500 ease-in-out ${
          isMobile ? 'ml-0 pt-20' : (sidebarCollapsed ? 'ml-16' : 'ml-64')
        }`}  
      >  
        <NavHeader />
        
        {/* Page Content with padding */}
        <div className="px-6 py-4">
          <div className={`transition-opacity duration-500 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
            {renderPageContent()}  
          </div>
        </div>
      </main>  
    </div>  
  );  
};  

export default VoroniPrimarySchoolDashboard;