// frontend/src/components/SubjectPriority.jsx
import React, { useState, useEffect } from 'react';
import {
  getSubjects,
  getTimeslots,
  getPriorities,
  createPriority,
  updatePriority,
  deletePriority
} from '../../Services/subjectPriorityService';

const SubjectPriority = () => {
  const [subjects, setSubjects] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    subject_id: '',
    timeslot_id: '',
    priority_level: 1
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsData, timeslotsData, prioritiesData] = await Promise.all([
          getSubjects(),
          getTimeslots(),
          getPriorities()
        ]);
        setSubjects(subjectsData);
        setTimeslots(timeslotsData);
        setPriorities(prioritiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editMode) {
        const updated = await updatePriority(currentId, formData);
        setPriorities(priorities.map(p => p.id === currentId ? updated : p));
      } else {
        const created = await createPriority(formData);
        setPriorities([...priorities, created]);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving priority:', error);
    }
  };
  
  const handleEdit = (priority) => {
    setFormData({
      subject_id: priority.subject_id,
      timeslot_id: priority.timeslot_id,
      priority_level: priority.priority_level
    });
    setCurrentId(priority.id);
    setEditMode(true);
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this priority?')) {
      try {
        await deletePriority(id);
        setPriorities(priorities.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting priority:', error);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({
      subject_id: '',
      timeslot_id: '',
      priority_level: 1
    });
    setEditMode(false);
    setCurrentId(null);
    setShowForm(false);
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Subject Priority Management</h1>
      
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
        >
          {showForm ? 'Cancel' : 'Add Priority'}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? 'Edit Priority' : 'Add New Priority'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <select
                  name="subject_id"
                  value={formData.subject_id}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Timeslot</label>
                <select
                  name="timeslot_id"
                  value={formData.timeslot_id}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select Timeslot</option>
                  {timeslots.map(timeslot => (
                    <option key={timeslot.id} value={timeslot.id}>
                      {timeslot.formatted_time}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Priority Level (1-3)</label>
                <input
                  type="number"
                  name="priority_level"
                  min="1"
                  max="3"
                  value={formData.priority_level}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                {editMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">Subject Priorities</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeslot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {priorities.length > 0 ? (
                priorities.map(priority => (
                  <tr key={priority.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{priority.subject_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{priority.timeslot_formatted}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${priority.priority_level === 1 ? 'bg-green-100 text-green-800' : 
                          priority.priority_level === 2 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {priority.priority_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(priority)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(priority.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No priorities found. Add some using the form above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectPriority;