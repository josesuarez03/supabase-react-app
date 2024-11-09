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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Contenido:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="primary"
        disabled={loading}
      >
        {loading ? 'Publicando...' : 'Publicar Post'}
      </button>
    </form>
  );
}

export default PostForm;