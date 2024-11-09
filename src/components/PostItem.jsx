import React from 'react';

function PostItem({ post, onDeletePost }) {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      await onDeletePost(post.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {new Date(post.timestamp).toLocaleString()}
        </p>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PostItem;