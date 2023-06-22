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
    case 'UPDATE_PRODUCTS':
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case 'UPDATE_BOOKMARK':
      return {
        ...state,
        bookmarkPosts: action.payload,
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
    allProducts: [],
    searchInput: '',
    isLoggedIn: false,
    bookmarkPosts: [],
    helper: false,
  });

  const getToCart = async () => {
    // const encodedToken = localStorage.getItem('tokenuser');

    try {
      const response = await axios.get(`/api/users`);
      console.log(response.data);
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
    getToCart();
  }, [state.helper]);
  return (
    <SocialContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}
