import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';
import './assets/App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('post')
        .select('id, title, body, created_at')
        .order('created_at', { ascending: false });
      
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (err) {
      console.error('Error detallado:', err);
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Función handleSearch definida
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const addPost = async (postData) => {
    try {
      setError(null);
      const { title, body } = postData;
      
      const { data, error } = await supabase
        .from('post')
        .insert([{ 
          title, 
          body, 
          created_at: new Date().toISOString() 
        }])
        .select();

      if (error) throw error;

      setPosts(prevPosts => [data[0], ...prevPosts]);
      return true;
    } catch (err) {
      console.error('Error al agregar post:', err);
      setError(err.message);
      return false;
    }
  };

  const deletePost = async (id) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('post')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter((post) => post.id !== id));
      return true;
    } catch (err) {
      console.error('Error al eliminar post:', err);
      setError(err.message);
      return false;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-6">
        <PostForm onPostAdded={addPost} />
        <SearchBar onSearch={handleSearch} />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Cargando posts...</p>
        ) : (
          <PostList posts={posts} onDeletePost={deletePost} />
        )}
      </div>
    </div>
  );
}

export default App;