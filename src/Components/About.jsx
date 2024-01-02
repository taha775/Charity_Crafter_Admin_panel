import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config/Firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const About = () => {
  const [aboutContent, setAboutContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure aboutContent is not empty before proceeding
      if (aboutContent.trim() === '') {
        alert('About content cannot be empty');
        return;
      }

      // Create a new document in Firestore with the about content
      const aboutCollectionRef = collection(db, 'about');
      await addDoc(aboutCollectionRef, { content: aboutContent });

     
      toast.success('About information added successfully!');
      setAboutContent('');
    } catch (error) {
      console.error('Error adding about information:', error);
      alert('Error adding about information. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">About Donation App</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700">
            About Content:
          </label>
          <textarea
            id="aboutContent"
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add About Information
        </button>
      </form>
    </div>
  );
};

export default About;
