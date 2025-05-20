import { useState, useEffect } from 'react';
import { ClassNameService } from '../../Services/classNameService';
import { Plus, Trash, Edit, Loader } from 'lucide-react';
import AddClassModal from './AddClassModal';
import EditClassModal from './EditClassModal';

export default function ClassNameManager() {
  const [classNames, setClassNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditClass, setCurrentEditClass] = useState(null);

  // Fetch all class names on component mount
  useEffect(() => {
    fetchClassNames();
  }, []);

  const fetchClassNames = async () => {
    try {
      setLoading(true);
      const data = await ClassNameService.getAllClassNames();
      console.log('Data received from API:', data); // Debug log to see the received data
      
      // Handle if data is nested within a data property (common API pattern)
      const classData = data.data || data;
      
      // Ensure we're working with an array
      const classArray = Array.isArray(classData) ? classData : [];
      
      setClassNames(classArray);
      setError(null);
    } catch (err) {
      setError('Failed to load class names. Please try again later.');
      console.error('Error fetching class names:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (validEntries) => {
    try {
      setSubmitting(true);
      
      if (validEntries.length === 1) {
        // Single class creation
        await ClassNameService.createClassName(validEntries[0]);
      } else {
        // Bulk class creation
        await ClassNameService.bulkCreateClassNames(validEntries);
      }
      
      // Refresh the class list and reset form
      await fetchClassNames();
      closeAddModal();
    } catch (err) {
      setError('Failed to add class name(s). Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateClass = async (updatedClass) => {
    try {
      setSubmitting(true);
      await ClassNameService.updateClassName(updatedClass.id, { name: updatedClass.name });
      await fetchClassNames();
      closeEditModal();
    } catch (err) {
      setError('Failed to update class name. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        setSubmitting(true);
        await ClassNameService.deleteClassName(id);
        await fetchClassNames();
      } catch (err) {
        setError('Failed to delete class name. Please try again.');
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Modal Handlers
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (classItem) => {
    setCurrentEditClass(classItem);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEditClass(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Names Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add Class
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading class names...</div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NO.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classNames && classNames.length > 0 ? (
                classNames.map((classItem, index) => (
                  <tr key={classItem.id || classItem._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {classItem.name || classItem.className || 'Unnamed class'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(classItem)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(classItem.id || classItem._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No class names found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Import modals as components */}
      <AddClassModal 
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddClass}
        submitting={submitting}
      />

      <EditClassModal 
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdate={handleUpdateClass}
        classItem={currentEditClass}
        submitting={submitting}
      />

      {submitting && !isAddModalOpen && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <Loader size={24} className="animate-spin mr-3 text-blue-500" />
            <span>Processing request...</span>
          </div>
        </div>
      )}
    </div>
  );
}