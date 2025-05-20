import { useState } from 'react';
import { X, Plus, Loader } from 'lucide-react';

export default function AddClassModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  submitting 
}) {
  const [newClassEntries, setNewClassEntries] = useState([{ name: '' }]);

  const handleClassNameChange = (index, value) => {
    const updatedEntries = [...newClassEntries];
    updatedEntries[index].name = value;
    setNewClassEntries(updatedEntries);
  };

  const addAnotherClassField = () => {
    setNewClassEntries([...newClassEntries, { name: '' }]);
  };

  const removeClassEntry = (index) => {
    if (newClassEntries.length === 1) {
      setNewClassEntries([{ name: '' }]);
    } else {
      setNewClassEntries(newClassEntries.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // Filter out empty entries
    const validEntries = newClassEntries.filter(entry => entry.name.trim() !== '');
    
    if (validEntries.length === 0) {
      return;
    }
    
    onSubmit(validEntries);
    
    // Reset form for next time
    setNewClassEntries([{ name: '' }]);
  };

  const handleClose = () => {
    setNewClassEntries([{ name: '' }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Add New Class</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">
          {newClassEntries.map((entry, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="text"
                value={entry.name}
                onChange={(e) => handleClassNameChange(index, e.target.value)}
                placeholder="Enter class name"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                onClick={() => removeClassEntry(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <button
              onClick={addAnotherClassField}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Another
            </button>
            <div className="space-x-2">
              <button
                onClick={handleClose}
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
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
