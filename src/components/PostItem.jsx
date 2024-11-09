import React from 'react';

function PostItem({ post, onDeletePost }) {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      await onDeletePost(post.id);
    }
  };

  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div className="post-footer">
        <small>{new Date(post.created_at).toLocaleString()}</small>
        <button
          onClick={handleDelete}
          className="danger"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PostItem;