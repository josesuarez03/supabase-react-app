import React, { useState } from 'react';

function PostForm({ onPostAdded }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await onPostAdded({ title, body });

    if (success) {
      setTitle('');
      setBody('');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Contenido:
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Publicando...' : 'Publicar Post'}
      </button>
    </form>
  );
}

export default PostForm;