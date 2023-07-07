import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';

export const SocialContext = createContext();

const reduceSocial = (state, action) => {
  switch (action.type) {
    case 'LOGIN_STATUS':
      return { ...state, isLoggedIn: action.payload };
    case 'LOADING_STATUS':
      return { ...state, isLoading: action.payload };
    case 'SEARCH_PRODUCTS':
      return {
        ...state,
        searchInput: action.payload,
      };
    case 'UPDATE_POSTS':
      return {
        ...state,
        allPosts: action.payload,
      };
    case 'UPDATE_COMMENTS':
      return {
        ...state,
        commentPost: action.payload,
      };
    case 'UPDATE_BOOKMARK':
      return {
        ...state,
        bookmarkPosts: action.payload,
      };
    case 'UPDATE_MYSELF':
      return {
        ...state,
        mySelf: action.payload,
      };
    case 'UPDATE_SUGGESTIONS':
      return {
        ...state,
        allSuggestions: action.payload,
      };
    case 'SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'UPDATE_USERS':
      return {
        ...state,
        allUsers: action.payload,
      };

    case 'HELPER':
      return {
        ...state,
        helper: !state.helper,
      };

    default:
      break;
  }
};

export function SocialProvider({ children }) {
  const [state, dispatch] = useReducer(reduceSocial, {
    allPosts: [],
    searchInput: '',
    isLoggedIn: false,
    bookmarkPosts: [],
    helper: false,
    mySelf: {},
    allUsers: [],
    allSuggestions: [],
    sort: 'LATEST',
    isLoading: false,
    commentPost: [],
  });

  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.get(`/api/users/${user._id}`);
      dispatch({
        type: 'UPDATE_MYSELF',
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSuggestions = async () => {
    const mySelf = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.get(`/api/users`);

      dispatch({
        type: 'UPDATE_SUGGESTIONS',
        payload: response.data.users.filter((user) => user._id !== mySelf._id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (id) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({
        type: 'UPDATE_POSTS',
        payload: response.data.posts,
      });
      dispatch({
        type: 'UPDATE_COMMENTS',
        payload: state.commentPost.filter((c) => c._id !== id),
      });
      try {
        const res = await axios.post(
          `/api/users/remove-bookmark/${id}`,
          {},
          {
            headers: {
              authorization: encodedToken,
            },
          },
        );
        dispatch({
          type: 'HELPER',
        });

        dispatch({
          type: 'UPDATE_BOOKMARK',
          payload: res.data.bookmarks,
        });
        toast.success('Post Deleted');
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToFollow = async (id) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/users/follow/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });
      dispatch({
        type: 'UPDATE_SUGGESTIONS',
        payload: state.allSuggestions.filter(
          (u) => u._id !== response.data.followUser._id,
        ),
      });
      toast.success('Followed');
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFollow = async (id) => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/users/unfollow/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });
      dispatch({
        type: 'UPDATE_SUGGESTIONS',
        payload: [...state.allSuggestions, response.data.followUser],
      });
      toast.success('Unfollow');
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      dispatch({
        type: 'UPDATE_POSTS',
        payload: response.data.posts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      dispatch({
        type: 'UPDATE_COMMENTS',
        payload: response.data.posts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    getUser();
    getSuggestions();
    getPosts();
  }, [state.isLoggedIn]);

  useEffect(() => {
    getUser();
    getPosts();
  }, [state.helper]);
  return (
    <SocialContext.Provider
      value={{
        state,
        dispatch,
        removePost,
        addToFollow,
        removeFromFollow,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}
