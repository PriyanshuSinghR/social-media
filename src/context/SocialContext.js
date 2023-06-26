import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SocialContext = createContext();

const reduceSocial = (state, action) => {
  switch (action.type) {
    case 'LOGIN_STATUS':
      return { ...state, isLoggedIn: action.payload };
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
  const history = useNavigate();
  const [state, dispatch] = useReducer(reduceSocial, {
    allPosts: [],
    searchInput: '',
    isLoggedIn: false,
    bookmarkPosts: [],
    helper: false,
    mySelf: {},
    allSuggestions: [],
  });

  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.get(`/api/users/${user._id}`);
      dispatch({
        type: 'UPDATE_MYSELF',
        payload: response.data.user,
      });
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const getToBookmark = async () => {
    const encodedToken = localStorage.getItem('tokenuser');

    try {
      const response = await axios.get(`/api/users/bookmark`, {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log(response.data);
      dispatch({
        type: 'UPDATE_BOOKMARK',
        payload: response.data.bookmarks,
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
        type: 'HELPER',
      });

      console.log(response.data.posts);
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
      console.log(response.data.followUser);
      // toast.success('Added to Wishlist');
      // console.log(response.data);
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
      // toast.success('Added to Wishlist');
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    const encodedToken = localStorage.getItem('tokenuser');

    try {
      const response = await axios.post(
        `/api/user/cart`,
        { product },
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // const addToFav = async (product) => {
  //   const encodedToken = localStorage.getItem('tokenuser');
  //   try {
  //     const response = await axios.post(
  //       `/api/user/wishlist`,
  //       { product },
  //       {
  //         headers: {
  //           authorization: encodedToken,
  //         },
  //       },
  //     );
  //     dispatch({
  //       type: 'UPDATE_FAV',
  //       payload: response.data.wishlist,
  //     });
  //     dispatch({
  //       type: 'LOGIN_STATUS',
  //       payload: true,
  //     });
  //     toast.success('Added to Wishlist');
  //     console.log(response.data.wishlist);
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning('Please First Sign In');
  //     setTimeout(() => {
  //       history('/signin');
  //     }, 2000);
  //   }
  // };

  useEffect(() => {
    getUser();
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
