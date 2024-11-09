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

  // Memoizamos fetchPosts con useCallback para evitar recreaciones innecesarias
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('post').select('*').order('timestamp', { ascending: false });
    
    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }, [searchTerm]); // searchTerm como dependencia

  // Efecto para cargar posts iniciales y cuando cambia searchTerm
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // fetchPosts como dependencia

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const addPost = async (postData) => {
    const { title, body } = postData;
    const { data, error } = await supabase
      .from('post')
      .insert([{ 
        title, 
        body, 
        timestamp: new Date().toISOString() 
      }])
      .single();

    if (error) {
      console.error('Error adding post:', error);
      return false;
    } else {
      setPosts([data, ...posts]);
      return true;
    }
  };

  const deletePost = async (id) => {
    const { error } = await supabase
      .from('post')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    } else {
      setPosts(posts.filter((post) => post.id !== id));
      return true;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-6">
        <PostForm onPostAdded={addPost} />
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p>Cargando posts...</p>
        ) : (
          <PostList posts={posts} onDeletePost={deletePost} />
        )}
      </div>
    </div>
  );
}

export default App;