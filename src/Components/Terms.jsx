import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config/Firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Terms = () => {
  const [termsContent, setTermsContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure termsContent is not empty before proceeding
      if (termsContent.trim() === '') {
        alert('Terms content cannot be empty');
        return;
      }

      // Create a new document in Firestore with the terms content
      const termsCollectionRef = collection(db, 'terms');
      await addDoc(termsCollectionRef, { content: termsContent });

      alert('Terms added successfully!');
      toast.success('Terms added successfully!');
      setTermsContent('');
    } catch (error) {
      console.error('Error adding terms:', error);
      alert('Error adding terms. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="termsContent" className="block text-sm font-medium text-gray-700">
            Terms Content:
          </label>
          <textarea
            id="termsContent"
            value={termsContent}
            onChange={(e) => setTermsContent(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Terms
        </button>
      </form>
    </div>
  );
};

export default Terms;
