import {createSlice} from '@reduxjs/toolkit';

const postInitialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: 'post',
  initialState: postInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      state.loading = false;
    },
    updateLikes: (state, action) => {
      // Handle updating likes logic
      // Assuming action.payload contains post id and likes data
      // Example: { postId: '123', likes: 10 }
      const {postId, likes} = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.likes = likes;
      }
      state.loading = false;
    },
    deletePost: (state, action) => {
      // Handle delete post logic
      // Assuming action.payload contains post id
      const postId = action.payload;
      state.posts = state.posts.filter(post => post._id !== postId);
      state.loading = false;
    },
    addComment: (state, action) => {
      // Handle add comment logic
      // Assuming action.payload contains post id and comment data
      // Example: { postId: '123', comment: { text: 'New comment' } }
      const {postId, comment} = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.comments.unshift(comment);
      }
      state.loading = false;
    },
    removeComment: (state, action) => {
      // Handle remove comment logic
      // Assuming action.payload contains post id and comment id
      const {postId, commentId} = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.comments = post.comments.filter(
          comment => comment._id !== commentId,
        );
      }
      state.loading = false;
    },
    postError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetPosts: state => {
      return {...postInitialState};
    },
  },
});

export const {
  setPosts,
  setPost,
  addPost,
  updateLikes,
  deletePost,
  addComment,
  removeComment,
  postError,
  resetPosts,
} = postSlice.actions;

export default postSlice.reducer;
