// src/components/SubjectAssignments.jsx
import React, { useState, useEffect } from 'react';
import SubjectAssignmentService from '../../Services/SubjectAssignmentService';

const SubjectAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [subjectAssignments, setSubjectAssignments] = useState([]);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchAssignments();
        fetchSubjects();
    }, []);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const response = await SubjectAssignmentService.getAssignments();
            setAssignments(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch assignments');
            setLoading(false);
            console.error(err);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await SubjectAssignmentService.getSubjects();
            setSubjects(response.data);
        } catch (err) {
            setError('Failed to fetch subjects');
            console.error(err);
        }
    };

    const handleOpenModal = () => {
        // Initialize subject assignments with all subjects
        const initialAssignments = subjects.map(subject => ({
            subject_id: subject.id,
            assignments_per_week: 0,
            name: subject.name
        }));
        
        // Pre-fill with existing assignment values
        assignments.forEach(assignment => {
            const index = initialAssignments.findIndex(
                item => item.subject_id === assignment.subject_id
            );
            if (index !== -1) {
                initialAssignments[index].assignments_per_week = assignment.assignments_per_week;
            }
        });
        
        setSubjectAssignments(initialAssignments);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // Filter out subjects with 0 assignments
            const dataToSubmit = subjectAssignments.filter(
                item => item.assignments_per_week > 0
            ).map(({ subject_id, assignments_per_week }) => ({
                subject_id,
                assignments_per_week
            }));
            
            await SubjectAssignmentService.bulkCreateAssignments(dataToSubmit);
            setShowModal(false);
            fetchAssignments();
            setLoading(false);
        } catch (err) {
            setError('Failed to save assignments');
            setLoading(false);
            console.error(err);
        }
    };

    const handleEdit = (assignment) => {
        setEditItem(assignment);
    };

    const handleUpdate = async () => {
        if (!editItem) return;
        
        try {
            setLoading(true);
            await SubjectAssignmentService.updateAssignment(editItem.id, {
                subject_id: editItem.subject_id,
                assignments_per_week: editItem.assignments_per_week
            });
            setEditItem(null);
            fetchAssignments();
            setLoading(false);
        } catch (err) {
            setError('Failed to update assignment');
            setLoading(false);
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) return;
        
        try {
            setLoading(true);
            await SubjectAssignmentService.deleteAssignment(id);
            fetchAssignments();
            setLoading(false);
        } catch (err) {
            setError('Failed to delete assignment');
            setLoading(false);
            console.error(err);
        }
    };

    const handleAssignmentChange = (index, value) => {
        const newAssignments = [...subjectAssignments];
        newAssignments[index].assignments_per_week = parseInt(value, 10) || 0;
        setSubjectAssignments(newAssignments);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Subject Weekly Assignments</h1>
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Assign Subjects
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Subject Name
                                    </th>
                                    <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Assignments Per Week
                                    </th>
                                    <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {assignments.map((assignment) => (
                                    <tr key={assignment.id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 text-sm text-gray-900">
                                            {assignment.subject_name}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-900">
                                            {editItem && editItem.id === assignment.id ? (
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={editItem.assignments_per_week}
                                                    onChange={(e) => setEditItem({
                                                        ...editItem,
                                                        assignments_per_week: parseInt(e.target.value) || 0
                                                    })}
                                                    className="border-gray-300 border rounded py-1 px-2 w-24"
                                                />
                                            ) : (
                                                assignment.assignments_per_week
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            {editItem && editItem.id === assignment.id ? (
                                                <button
                                                    onClick={handleUpdate}
                                                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(assignment)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(assignment.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {assignments.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                                            No assignments found. Click "Assign Subjects" to add some.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Assignment Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                                Assign Subjects Per Week
                                            </h3>
                                            <div className="mt-2 max-h-96 overflow-y-auto">
                                                {subjectAssignments.map((item, index) => (
                                                    <div key={item.subject_id} className="flex items-center justify-between mb-3 p-2 border-b">
                                                        <span className="text-gray-700">{item.name}</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={item.assignments_per_week}
                                                            onChange={(e) => handleAssignmentChange(index, e.target.value)}
                                                            className="border-gray-300 border rounded py-1 px-2 w-20"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {loading ? 'Saving...' : 'Save Assignments'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectAssignments;