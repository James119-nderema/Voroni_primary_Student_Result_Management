import { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';

export default function EditClassModal({ 
  isOpen, 
  onClose, 
  onUpdate, 
  classItem, 
  submitting 
}) {
  const [editClass, setEditClass] = useState({ id: null, name: '' });

  useEffect(() => {
    if (classItem) {
      setEditClass({ 
        id: classItem.id || classItem._id, 
        name: classItem.name || classItem.className || '' 
      });
    }
  }, [classItem]);

  const handleChange = (e) => {
    setEditClass({ ...editClass, name: e.target.value });
  };

  const handleSubmit = () => {
    if (editClass.name.trim() === '') {
      return;
    }
    
    onUpdate(editClass);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Edit Class</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">
          <div className="mb-4">
            <input
              type="text"
              value={editClass.name}
              onChange={handleChange}
              placeholder="Enter class name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader size={16} className="mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
