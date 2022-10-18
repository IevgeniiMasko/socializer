export const getAllPostsSelector = (store) => store.post;
export const getPostLikesSelector = (postId) => {
  return (store) => store.post.filter((post) => post._id === postId)[0].likedBy;
};
