import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const ViewMore = ({ selectedValue, setViewModal, setSelectedValue }: any) => {
    const { userData } = useAuth();
    const [alreadySignedUp, setAlreadySignedUp] = useState(false);

    useEffect(() => {
        const checkAlreadySignedUp = () => {
            if (selectedValue.signUpUsers.includes(userData?.name)) {
                setAlreadySignedUp(true);
            } else {
                setAlreadySignedUp(false);
            }
        };

        checkAlreadySignedUp();
    }, [selectedValue, userData]);

    const getClassData = async () => {
        try {
            const response = await axios.get('https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/classes');
            return response.data;
        } catch (error) {
            console.error('Error fetching class data:', error);
            return [];
        }
    };

    const handleSignUp = async () => {
        try {
            const classesData = await getClassData();

            // Check if the user has already signed up for a class at the same time
            const conflicts = classesData.filter((classItem: any) => {
                return classItem.time === selectedValue.time && classItem.signUpUsers.includes(userData?.name);
            });

            if (conflicts.length > 0) {
                alert('You have already signed up for a class at this time. Please choose another class.');
                return;
            }

            // Update the class data to include the user as a sign-up
            const updatedClassData = {
                ...selectedValue,
                signUpUsers: [...selectedValue.signUpUsers, userData?.name],
            };

            // Update the class data on the server
            const updateResponse = await axios.put(`https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/classes/${selectedValue.id}`, updatedClassData);

            if (updateResponse.status === 200) {
                // Update the selectedValue in the local state
                setSelectedValue(updatedClassData);
                setViewModal(false)

                alert(`User signed up successfully for class: ${selectedValue.id}`);
            } else {
                console.error('Failed to sign up user for class:', selectedValue.id);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-20 backdrop-blur-lg backdrop-filter bg-[rgba(0,0,0,0.2)]">
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex justify-between p-4 bg-gray-200">
                    <h1 className="text-xl font-bold">Class Details</h1>
                    <button onClick={() => setViewModal(false)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-lg">Time: {selectedValue.time}</p>
                    <p className="text-lg">Instructor: {selectedValue.instructor}</p>
                    <p className="text-lg">Duration: {selectedValue.duration}</p>
                    <p className="text-lg">Class Type: {selectedValue.classType}</p>
                    <p className="text-lg">Created At: {selectedValue.createdAt}</p>
                    <button
                        onClick={userData ? handleSignUp : undefined}
                        disabled={alreadySignedUp || !userData}
                        className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${alreadySignedUp || !userData ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {userData ? (alreadySignedUp ? 'Already Signed Up' : 'Sign Up for Class') : <Link to="/login" className='bg-blue-500'>Sign Up</Link>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewMore;
