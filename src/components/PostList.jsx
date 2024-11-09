import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onDeletePost }) {
  if (posts.length === 0) {
    return <p className="text-center text-gray-500">No hay posts para mostrar.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDeletePost={onDeletePost} />
      ))}
    </div>
  );
}

export default PostList;