import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../TicketConfig'; 
import ProfileForm from './ProfileForm'; 
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import MovieList from './components/MovieList';
import MovieCarousel from './components/MovieCarousel';
import UpcomingMovies from './components/UpcomingMovies';
import Poster from './components/Poster';
import FooterDashboard from './components/FooterDashboard';
import { collection, getDocs } from 'firebase/firestore';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [movies, setMovies] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  

  useEffect(() => {
    const checkUserInfo = async () => {
      const userDoc = doc(db, 'UserInfo', user.uid);
      const docSnap = await getDoc(userDoc);
      
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    };

    const fetchMovies = async () => {
      const moviesCollection = collection(db, 'contents');
      const movieSnapshot = await getDocs(moviesCollection);
      const movieList = movieSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(movieList);
    };

    checkUserInfo();
    fetchMovies();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileComplete = (data) => {
    setUserInfo(data);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Update search results based on query
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  if (loading) return <div>Loading...</div>;

  // Filter movies based on location and applied filters
  let filteredMovies = movies.filter(movie => 
    movie.location.includes(selectedLocation)
  );

  // Apply additional filters
  if (appliedFilters.category && appliedFilters.category !== 'All Categories') {
    filteredMovies = filteredMovies.filter(movie => movie.category === appliedFilters.category);
  }

  // Apply language, format, and genre filters if selected
  if (appliedFilters.languages && appliedFilters.languages.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      appliedFilters.languages.some(lang => movie.languages.includes(lang))
    );
  }

  if (appliedFilters.formats && appliedFilters.formats.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      appliedFilters.formats.some(format => movie.formats.includes(format))
    );
  }

  if (appliedFilters.genres && appliedFilters.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      appliedFilters.genres.some(genre => movie.genres.includes(genre))
    );
  }

  return (
    <div>
      {!userInfo ? (
        <ProfileForm user={user} onProfileComplete={handleProfileComplete} />
      ) : (
        <div>
          <Navbar 
            userInfo={userInfo} 
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange} 
            onSearch={handleSearch} // Pass the search function
            searchResults={searchResults} // Pass the search results
          />
          <MovieCarousel posters={movies.map(movie => movie.posterUrl)} />
          <div className="container mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-8 relative">
              <Filters onApplyFilters={handleApplyFilters} />
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Now Showing in {selectedLocation}</h2>
              <MovieList movies={filteredMovies} />
            </div>
          </div>
          <Poster />
          <UpcomingMovies /> 
          <FooterDashboard />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
