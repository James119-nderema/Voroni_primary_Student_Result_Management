import React from 'react';
import { Clock, Calendar, MapPin, User } from 'lucide-react';

const Schedules = ({ schedules }) => {
  // Sort schedules by startTime in 24-hour format
  const sortedSchedules = [...schedules].sort((a, b) => {
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
  const getClassStatus = (timeString) => {
    if (!timeString) return { status: 'upcoming', label: 'Upcoming' };
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const classTotalMinutes = hours * 60 + minutes;
    
    // Assuming each class is 1 hour
    if (classTotalMinutes + 60 < currentTotalMinutes) {
      return { status: 'completed', label: 'Completed' };
    } else if (classTotalMinutes <= currentTotalMinutes) {
      return { status: 'ongoing', label: 'Ongoing' };
    } else {
      return { status: 'upcoming', label: 'Upcoming' };
    }
  };

  // Get time period (AM/PM)
  const getTimePeriod = (timeString) => {
    if (!timeString) return 'AM';
    const hours = parseInt(timeString.split(':')[0]);
    return hours >= 12 ? 'PM' : 'AM';
  };

  // Format time to 12-hour format
  const formatTime = (timeString) => {
    if (!timeString) return '10:00';
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours);
    return `${hourNum % 12 || 12}:${minutes}`;
  };

  // Get class color based on subject or index
  const getClassColor = (schedule, index) => {
    const className = schedule.className || schedule.title || '';
    
    if (className.toLowerCase().includes('math')) return 'bg-purple-500';
    if (className.toLowerCase().includes('science') || className.toLowerCase().includes('computer')) return 'bg-blue-500';
    if (className.toLowerCase().includes('english') || className.toLowerCase().includes('literature')) return 'bg-green-500';
    if (className.toLowerCase().includes('history')) return 'bg-amber-500';
    
    // Fallback to rotating colors
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-rose-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Today's Schedule</h3>
          <p className="text-sm text-gray-500 mt-1">{sortedSchedules.length} total classes</p>
        </div>
        <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
          <Clock size={14} className="mr-2" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
        {sortedSchedules.length > 0 ? (
          sortedSchedules.map((schedule, index) => {
            const { status, label } = getClassStatus(schedule.startTime);
            const statusColor = 
              status === 'ongoing' ? 'bg-green-100 text-green-700 border-green-200' :
              status === 'completed' ? 'bg-gray-100 text-gray-500 border-gray-200' :
              'bg-blue-50 text-blue-700 border-blue-200';
            
            return (
              <div
                key={index}
                className={`flex items-center p-4 rounded-xl border transition-all hover:shadow-md ${
                  status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className={`min-w-16 h-16 flex flex-col items-center justify-center rounded-lg ${getClassColor(schedule, index).replace('bg-', 'bg-opacity-10 text-').replace('-500', '-700')} ${getClassColor(schedule, index).replace('-500', '-50')}`}>
                  <span className="text-base font-bold text-indigo-500">{formatTime(schedule.startTime || '10:00')}</span>
                  <p className="text-xs text-indigo-500">{getTimePeriod(schedule.startTime)}</p>
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {schedule.className || schedule.title || 'Computer Science'}
                    </h4>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                      {label}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <div className="flex items-center">
                      <User size={12} className="mr-1" />
                      <span>{schedule.lecturerName || 'Dr. Smith'}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      <span>Room {schedule.roomName || 'LH1'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-2">
                  <div className={`h-3 w-3 rounded-full ${getClassColor(schedule, index)}`}></div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-3 text-sm font-medium text-gray-500">No classes scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedules;