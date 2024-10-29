import React, { useEffect, useState } from 'react';
import { db } from '../../TicketConfig'; // Adjust the import based on your project structure
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [contentDetails, setContentDetails] = useState({
    id: null, // Add id for editing
    title: '',
    description: '',
    genres: [],
    languages: [],
    format: [],
    releaseDate: '',
    duration: '',
    director: '',
    cast: '',
    rating: '',
    trailerUrl: '',
    posterUrl: '',
    location: [],
    price: '',
    availability: false,
    category: 'Movies',
  });

  const [contents, setContents] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const languages = ['English', 'Hindi', 'Marathi', 'Spanish', 'French', 'German', 'Mandarin'];
  const formats = ['Digital', 'Physical(Dvds)', 'Streaming', 'Live', 'Theatre'];
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary', 'Mystery'];
  const categories = ['Movie', 'Event', 'Play'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];

  useEffect(() => {
    const fetchContents = async () => {
      const contentsCollection = collection(db, 'contents');
      const contentsSnapshot = await getDocs(contentsCollection);
      const contentsList = contentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContents(contentsList);
    };

    fetchContents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setContentDetails((prevDetails) => {
        const currentArray = prevDetails[name] || [];
        return {
          ...prevDetails,
          [name]: checked
            ? [...currentArray, value]
            : currentArray.filter((item) => item !== value),
        };
      });
    } else {
      setContentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const contentRef = doc(db, 'contents', contentDetails.id);
      await updateDoc(contentRef, contentDetails);
      setIsEditing(false); // Reset editing state
    } else {
      await addDoc(collection(db, 'contents'), contentDetails);
    }

    resetForm();
    await fetchContents();
  };

  const resetForm = () => {
    setContentDetails({
      id: null,
      title: '',
      description: '',
      genres: [],
      languages: [],
      format: [],
      releaseDate: '',
      duration: '',
      director: '',
      cast: '',
      rating: '',
      trailerUrl: '',
      posterUrl: '',
      location: [],
      price: '',
      availability: false,
      category: 'Movies',
    });
  };

  const fetchContents = async () => {
    const contentsCollection = collection(db, 'contents');
    const contentsSnapshot = await getDocs(contentsCollection);
    const contentsList = contentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContents(contentsList);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?");
    if (confirmDelete) {
      await deleteDoc(doc(db, 'contents', id));
      setContents(contents.filter(content => content.id !== id));
    }
  };

  const handleEdit = (content) => {
    setContentDetails(content);
    setIsEditing(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Content' : 'Upload Content'}</h2>

        <select
          name="category"
          value={contentDetails.category}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg transition duration-200 ease-in-out focus:ring focus:ring-blue-200 focus:outline-none hover:border-blue-400"
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={contentDetails.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={contentDetails.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />

        {/* Genres Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Genres</h3>
          {genres.map((genre) => (
            <div key={genre} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={genre}
                value={genre}
                checked={contentDetails.genres.includes(genre)}
                onChange={handleChange}
                name="genres"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={genre} className="text-sm text-gray-700">{genre}</label>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Languages</h3>
          {languages.map((language) => (
            <div key={language} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={language}
                value={language}
                checked={contentDetails.languages.includes(language)}
                onChange={handleChange}
                name="languages"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={language} className="text-sm text-gray-700">{language}</label>
            </div>
          ))}
        </div>

        {/* Formats Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Formats</h3>
          {formats.map((format) => (
            <div key={format} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={format}
                value={format}
                checked={contentDetails.format.includes(format)}
                onChange={handleChange}
                name="format"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={format} className="text-sm text-gray-700">{format}</label>
            </div>
          ))}
        </div>

        {/* Location Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Locations</h3>
          {locations.map((location) => (
            <div key={location} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={location}
                value={location}
                checked={contentDetails.location.includes(location)}
                onChange={handleChange}
                name="location"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={location} className="text-sm text-gray-700">{location}</label>
            </div>
          ))}
        </div>

        {/* Other Inputs */}
        <input
          type="date"
          name="releaseDate"
          value={contentDetails.releaseDate}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 120 min)"
          value={contentDetails.duration}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={contentDetails.director}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast"
          value={contentDetails.cast}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (e.g., 8.5)"
          value={contentDetails.rating}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="trailerUrl"
          placeholder="Trailer URL"
          value={contentDetails.trailerUrl}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={contentDetails.posterUrl}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={contentDetails.price}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={contentDetails.availability}
              onChange={(e) => setContentDetails({ ...contentDetails, availability: e.target.checked })}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Available</span>
          </label>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {isEditing ? 'Update Content' : 'Upload Content'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8">Contents List</h2>
      <ul className="mt-4">
        {contents.map(content => (
          <li key={content.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-2">
            <div>
              <h3 className="text-lg font-bold">{content.title}</h3>
              <p>{content.description}</p>
              <p className="text-sm text-gray-600">Category: {content.category}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(content)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-200 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(content.id)}
                className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
