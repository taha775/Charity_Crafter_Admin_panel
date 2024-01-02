// Requests.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Requests = () => {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const db = getFirestore();
        const requestsCollection = collection(db, 'requests');
        const querySnapshot = await getDocs(requestsCollection);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setRequestData(data);
        } else {
          console.log('No documents found in the "requests" collection.');
        }
      } catch (error) {
        console.error('Error fetching request data:', error);
      }
    };

    // Call the fetchRequestData function when the component mounts
    fetchRequestData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Request Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Requester Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                CNIC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Request ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Selected Option
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Status
              </th>
              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {requestData.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.username}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.cnic}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.requestId}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.selectedOption}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{request.status}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
