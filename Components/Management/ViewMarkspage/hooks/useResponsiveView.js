import { useState, useEffect } from 'react';

export default function useResponsiveView() {
  const [isMobileView, setIsMobileView] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isMobileView, setIsMobileView };
}
