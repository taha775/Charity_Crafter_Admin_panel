import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config/Firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Privacy = () => {
  const [privacyPolicyName, setPrivacyPolicyName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure privacyPolicyName is not empty before proceeding
      if (privacyPolicyName.trim() === '') {
        alert('Privacy Policy name cannot be empty');
        return;
      }

      // Create a new document in Firestore with the privacy policy name
      const privacyPolicyCollectionRef = collection(db, 'privacyPolicies');
      await addDoc(privacyPolicyCollectionRef, { name: privacyPolicyName });

      alert('Privacy Policy added successfully!');
      toast.success('Privacy Policy added successfully!')
      setPrivacyPolicyName('');
    } catch (error) {
      console.error('Error adding privacy policy:', error);
      alert('Error adding privacy policy. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="privacyPolicyName" className="block text-sm font-medium text-gray-700">
            Privacy Policy Name:
          </label>
          <input
            type="text"
            id="privacyPolicyName"
            value={privacyPolicyName}
            onChange={(e) => setPrivacyPolicyName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Privacy Policy
        </button>
      </form>
    </div>
  );
};

export default Privacy;
