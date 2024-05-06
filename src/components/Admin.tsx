import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Class {
    id: string;
    time: string;
    instructor: string;
    duration: string;
    classType: string;
}

const AdminPanel: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [newClass, setNewClass] = useState<Class>({
        id: '',
        time: '',
        instructor: '',
        duration: '',
        classType: ''
    });
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [editMode, successMessage]);

    const fetchData = async () => {
        try {
            const response = await axios.get<Class[]>('https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewClass(prevClass => ({
            ...prevClass,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put<Class>(`https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/classes/${editId}`, newClass);
                setEditMode(false);
                setSuccessMessage('Class updated successfully');
            } else {
                const response = await axios.post<Class>('https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/classes', newClass);
                setClasses(prevClasses => [...prevClasses, response.data]);
                setSuccessMessage('Class added successfully');
            }
            setNewClass({
                id: '',
                time: '',
                instructor: '',
                duration: '',
                classType: ''
            });
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding/modifying class:', error);
            setErrorMessage('Failed to add/modify class');
            setSuccessMessage('');
        }
    };

    const handleEdit = (cls: Class) => {
        setEditMode(true);
        setEditId(cls.id);
        setNewClass(cls);
    };

    const classofInputs = "border p-2 border-gray-200 mx-1 rounded-lg";

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <form onSubmit={handleSubmit} className='flex space-x-4'>
                <label>
                    Time:
                    <input type="datetime-local" className={classofInputs} name="time" value={newClass.time} onChange={handleInputChange} />
                </label>
                {/* <label>
                    Date:
                    <input type="date" name="date" className={classofInputs} value={newClass.date} onChange={handleInputChange} />
                </label> */}
                <label>
                    Instructor:
                    <input type="text" name="instructor" className={classofInputs} value={newClass.instructor} onChange={handleInputChange} />
                </label>
                <label>
                    Duration:
                    <input type="text" name="duration" className={classofInputs} value={newClass.duration} onChange={handleInputChange} />
                </label>
                <label>
                    Class Type:
                    <input type="text" name="classType" className={classofInputs} value={newClass.classType} onChange={handleInputChange} />
                </label>
                <button className='bg-red-500 py-1 px-3 text-white rounded-md' type="submit">
                    {editMode ? 'Update Class' : 'Add Class'}
                </button>
            </form>

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-2" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-2" role="alert">
                    {errorMessage}
                </div>
            )}

            <h3 className="text-xl font-semibold mt-6">Classes:</h3>
            <ul>
                {classes.map(cls => (
                    <li key={cls.id} className="flex justify-between items-center border-b py-2">
                        <div>
                            <span>{cls.time} - {cls.instructor} - {cls.classType}</span>
                        </div>
                        <button className='bg-blue-500 py-1 px-3 text-white rounded-md' onClick={() => handleEdit(cls)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
