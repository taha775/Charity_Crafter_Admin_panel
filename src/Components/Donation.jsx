// Donation.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Donation = () => {
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const db = getFirestore();
        const donationCollection = collection(db, 'donates');
        const querySnapshot = await getDocs(donationCollection);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setDonationData(data);
        } else {
          console.log('No documents found in the "donates" collection.');
        }
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    // Call the fetchDonationData function when the component mounts
    fetchDonationData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Donation Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Donor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                CNIC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                Donation Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase border-b border-gray-300">
                UID
              </th>
              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {donationData.map((donation) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.username}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.cnic}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.details}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.selectedOption}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{donation.uid}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donation;
