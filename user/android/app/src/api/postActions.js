import api from './api'
import Toast from 'react-native-toast-message';
import {
  getPosts,
  addPost,
  updateLikes,
  deletePost,
  getPost,
  addComment,
  removeComment,
  postError,
  setLoading,
} from '../component/redux/postSlice';


// Get posts
export const getPostsAction = () => async (dispatch) => {
    console.log("Post called")
  await dispatch(setLoading(true));
  try {
    const res = await api.get('/posts');
    await dispatch(getPosts(res.data));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    const res = await api.put(`/posts/like/${postId}`);
    await dispatch(updateLikes({ id: postId, likes: res.data }));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    const res = await api.put(`/posts/unlike/${postId}`);
    await dispatch(updateLikes({ id: postId, likes: res.data }));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Delete post
export const deletePostAction = (postId) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    await api.delete(`/posts/${postId}`);
    await dispatch(deletePost(postId));
    await dispatch(setAlert('Post Removed', 'success'));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Add post
export const addPostAction = (formData) => async (dispatch) => {
    
//   await dispatch(setLoading(true));
  console.log(formData, "the post data")
  try {
    const res = await api.post('/posts', formData);
    await dispatch(addPost(res.data));
    await dispatch(setAlert('Post Created', 'success'));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Get post
export const getPostAction = (postId) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    const res = await api.get(`/posts/${postId}`);
    await dispatch(getPost(res.data));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Add comment
export const addCommentAction = (postId, formData) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);
    await dispatch(addComment({ postId, comments: res.data }));
    await dispatch(setAlert('Comment Added', 'success'));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};

// Delete comment
export const deleteCommentAction = (postId, commentId) => async (dispatch) => {
  await dispatch(setLoading(true));
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);
    await dispatch(removeComment({ postId, commentId }));
    await dispatch(setAlert('Comment Removed', 'success'));
    await dispatch(setLoading(false));
  } catch (error) {
    apiErrorHandler(dispatch, error);
  }
};
