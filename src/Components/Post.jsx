import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../Config/Firebase';
// import '../Styles/Post.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [uploadVideo, setUploadVideo] = useState('');
  const [amountNeed, setAmountNeed] = useState('');

  const handleImageUpload = async () => {
    try {
      if (uploadImage) {
        const imageRef = ref(storage, 'images/' + Date.now() + '_image.jpg');
        await uploadString(imageRef, uploadImage, 'data_url');
        const imageUrl = await getDownloadURL(imageRef);
        return imageUrl;
      } else {
        return null; // No image to upload
      }
    } catch (error) {
      toast.error('error uploading image ')
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the title field is empty
      if (!title.trim()) {
        toast.error('Title is required');
        return;
      }
  
      const imageUrl = await handleImageUpload();
  
      const postData = {
        title,
        description,
        uploadImage: imageUrl,
        uploadVideo,
        amountNeed,
      };
  
      const adminPostCollectionRef = collection(db, 'adminpost');
      await addDoc(adminPostCollectionRef, postData);
  
      console.log('Form submitted:', postData);
      toast.success('Post submitted successfully!');
      
      // Clear the form fields after successful submission
      setTitle('');
      setDescription('');
      setUploadImage('');
      setUploadVideo('');
      setAmountNeed('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className='post_container'>

      <h2 className="text-2xl font-bold mb-4 text-center bg-blue-600">UPLOAD NEW POSTS HERE !</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="uploadImage" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const reader = new FileReader();
    reader.onload = (event) => setUploadImage(event.target.result);
    reader.readAsDataURL(e.target.files[0]);
  }}
  className="mt-1 p-2 border rounded w-full"
/>
        </div>
        <div>
          <label htmlFor="uploadVideo" className="block text-sm font-medium text-gray-700">
           Enter Video link
          </label>
          <input
            type="text"
            id="uploadVideo"
            value={uploadVideo}
            onChange={(e) => setUploadVideo(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="amountNeed" className="block text-sm font-medium text-gray-700">
            Amount Needed
          </label>
          <input
            type="text"
            id="amountNeed"
            value={amountNeed}
            onChange={(e) => setAmountNeed(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
