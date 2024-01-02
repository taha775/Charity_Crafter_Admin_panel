// UsersComponent.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const UsersComponent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUserData(data);
        } else {
          console.log('No documents found in the "users" collection.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchUserData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">User Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Mobile
              </th>
              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.location}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.mobile}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersComponent;
