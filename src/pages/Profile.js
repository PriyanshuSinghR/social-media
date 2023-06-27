import React, { useContext, useEffect, useRef, useState } from 'react';
import { Hero } from '../components/Hero';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { SocialContext } from '../context/SocialContext';
import { toast } from 'react-toastify';
import { PostCard } from '../components/PostCard';
import { Popup } from '../components/Popup';

export const Profile = () => {
  const { profileId } = useParams();
  const history = useNavigate();
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const { state, dispatch, removeFromFollow, addToFollow } =
    useContext(SocialContext);

  const hiddenFileInput = useRef(null);

  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    setEditUser({ ...editUser, image: URL.createObjectURL(fileUploaded) });
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/users/${profileId}`);
      setUser(response.data.user);
      setEditUser(response.data.user);
      console.log(response.data.user);
      try {
        const res = await axios.get(
          `/api/posts/user/${response.data.user.username}`,
        );
        setPosts(res.data.posts);
        console.log(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('user');
    toast.success('Logout Successfully');

    dispatch({
      type: 'LOGIN_STATUS',
      payload: false,
    });

    history('/signin');
  };

  const toggleEdit = () => setShowEdit(!showEdit);
  const toggleFollower = () => setShowFollower(!showFollower);
  const toggleFollowing = () => setShowFollowing(!showFollowing);

  const editHandler = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/users/edit`,
        { userData: editUser },
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });
      toggleEdit();
      console.log(response.data.user);
      // toast.success('Added to Wishlist');
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [state.allSuggestions, state.helper]);

  return (
    <Hero>
      <h1 style={{ textAlign: 'center' }}>Profile</h1>
      <div
        style={{
          display: 'flex',
          margin: 'auto',
          width: '70%',
          paddingBottom: '20px',

          padding: '20px',
        }}
      >
        <div style={{ marginRight: '10px' }}>
          <img
            src={user?.image}
            style={{
              height: '50px',
              width: '50px',
              borderRadius: '50% 50%',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'right',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '90%',
              textAlign: 'left',
              padding: '10px 0px',
              height: '100%',
              border: 'none',
              marginBottom: '5px',
              fontSize: '18px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p
                style={{ fontSize: '16px', margin: '0px', fontWeight: 'bold' }}
              >{`${user?.firstName} ${user?.lastName}`}</p>
              <p style={{ fontSize: '14px', margin: '0px' }}>
                @{user?.username}
              </p>
            </div>

            {user?.username === state.mySelf.username ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  style={{
                    cursor: 'pointer',
                    padding: '8px 15px',
                    borderRadius: '15px',
                    backgroundColor: 'red',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  className="button-shadow"
                  onClick={toggleEdit}
                >
                  Edit Profile
                </div>
                {showEdit && (
                  <div>
                    <Popup
                      content={
                        <div>
                          <h1 style={{ marginTop: '0' }}>Edit</h1>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              width: '100%',
                              height: '350px',
                            }}
                          >
                            <div style={{ display: 'flex' }}>
                              <p style={{ width: '150px', margin: '5px' }}>
                                Avatar
                              </p>
                              <img
                                src={editUser.image}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50% 50%',
                                  cursor: 'pointer',
                                }}
                                onClick={handleImageClick}
                              />
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p style={{ width: '150px', margin: '5px' }}>
                                Username
                              </p>
                              <p style={{ margin: '5px', padding: '7px' }}>
                                {editUser.username}
                              </p>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p style={{ width: '150px', margin: '5px' }}>
                                First Name
                              </p>
                              <input
                                type="text"
                                onChange={(event) =>
                                  setEditUser({
                                    ...editUser,
                                    firstName: event.target.value,
                                  })
                                }
                                value={editUser.firstName}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid white',
                                  padding: '10px',
                                  borderRadius: '5px',
                                  color: 'white',
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p style={{ width: '150px', margin: '5px' }}>
                                Last Name
                              </p>
                              <input
                                type="text"
                                onChange={(event) =>
                                  setEditUser({
                                    ...editUser,
                                    lastName: event.target.value,
                                  })
                                }
                                value={editUser.lastName}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid white',
                                  padding: '10px',
                                  borderRadius: '5px',
                                  color: 'white',
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p style={{ width: '150px', margin: '5px' }}>
                                Bio
                              </p>
                              <input
                                type="text"
                                onChange={(event) =>
                                  setEditUser({
                                    ...editUser,
                                    bio: event.target.value,
                                  })
                                }
                                value={editUser.bio}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid white',
                                  padding: '10px',
                                  borderRadius: '5px',
                                  color: 'white',
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p style={{ width: '150px', margin: '5px' }}>
                                Website
                              </p>
                              <input
                                type="text"
                                onChange={(event) =>
                                  setEditUser({
                                    ...editUser,
                                    website: event.target.value,
                                  })
                                }
                                value={editUser.website}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid white',
                                  padding: '10px',
                                  borderRadius: '5px',
                                  color: 'white',
                                }}
                              />
                            </div>
                            <button
                              onClick={editHandler}
                              style={{
                                border: 'none',
                                width: '100px',
                                margin: '0 auto',
                                padding: '10px',
                                marginTop: '20px',
                                background: 'red',
                                color: 'white',
                                borderRadius: '20px',
                                cursor: 'pointer',
                              }}
                              className="button-shadow"
                            >
                              Update
                            </button>
                            <input
                              type="file"
                              accept="image/*"
                              ref={hiddenFileInput}
                              onChange={handleImageChange}
                              style={{ display: 'none' }}
                            />
                          </div>
                        </div>
                      }
                      handleClose={toggleEdit}
                    />
                  </div>
                )}
                <div
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={logoutHandler}
                >
                  <Icon
                    icon="ic:baseline-logout"
                    color="red"
                    width="25"
                    height="25"
                  />
                </div>
              </div>
            ) : state.mySelf.following.reduce(
                (acc, curr) => (curr?.username === user?.username ? true : acc),
                false,
              ) ? (
              <div>
                <div
                  style={{
                    cursor: 'pointer',
                    padding: '7px',
                    borderRadius: '15px',
                    backgroundColor: 'red',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  className="button-shadow"
                  onClick={() => {
                    removeFromFollow(user?._id);
                  }}
                >
                  Unfollow
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    cursor: 'pointer',
                    padding: '7px',
                    borderRadius: '15px',
                    backgroundColor: 'red',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  className="button-shadow"
                  onClick={() => {
                    addToFollow(user?._id);
                  }}
                >
                  Follow
                </div>
              </div>
            )}
          </div>
          <div style={{ fontSize: '14px', margin: '0px' }}>{user?.bio}</div>
          <div>
            <Link
              to={user?.website}
              style={{
                fontSize: '14px',
                margin: '0px',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              {user?.website}
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              width: '90%',
              justifyContent: 'space-between',
              padding: '10px',
              marginTop: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  margin: '0px',
                  color: 'gray',
                }}
              >
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {posts?.length}
                </span>{' '}
                Posts
              </p>
              <p
                style={{
                  fontSize: '14px',
                  margin: '0px',
                  color: 'gray',
                  cursor: 'pointer',
                }}
                onClick={toggleFollower}
              >
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {user?.followers?.length}
                </span>{' '}
                Followers
              </p>
              <p
                style={{
                  fontSize: '14px',
                  margin: '0px',
                  color: 'gray',
                  cursor: 'pointer',
                }}
                onClick={toggleFollowing}
              >
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {' '}
                  {user?.following?.length}
                </span>{' '}
                Following
              </p>
            </div>
            {showFollower && (
              <div>
                <Popup
                  content={
                    user.followers.length === 0 ? (
                      <h3 style={{ margin: '0' }}>No followers Yet</h3>
                    ) : (
                      <div
                        style={{
                          width: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <h3 style={{ margin: '0' }}>Followers</h3>
                        {user.followers.map((follow) => (
                          <div
                            style={{
                              display: 'flex',
                              margin: '5px',
                              marginRight: '20px',
                              padding: '0px 10px',
                            }}
                          >
                            <div>
                              <img
                                src={follow.image}
                                style={{
                                  height: '35px',
                                  width: '35px',
                                  borderRadius: '50% 50%',
                                  padding: '10px 0px',
                                }}
                              ></img>
                            </div>
                            <div style={{ margin: '10px', width: '150px' }}>
                              <p
                                style={{ fontSize: '16px', margin: '0px' }}
                              >{`${follow.firstName} ${follow.lastName}`}</p>
                              <p style={{ fontSize: '14px', margin: '0px' }}>
                                @{follow.username}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  handleClose={toggleFollower}
                />
              </div>
            )}
            {showFollowing && (
              <div>
                <Popup
                  content={
                    user.following.length === 0 ? (
                      <h3 style={{ margin: '0' }}>No following Yet</h3>
                    ) : (
                      <div
                        style={{
                          width: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <h3 style={{ margin: '0' }}>Following</h3>
                        {user.following.map((follow) => (
                          <div
                            style={{
                              display: 'flex',
                              margin: '5px',
                              marginRight: '20px',
                              padding: '0px 10px',
                            }}
                          >
                            <div>
                              <img
                                src={follow.image}
                                style={{
                                  height: '35px',
                                  width: '35px',
                                  borderRadius: '50% 50%',
                                  padding: '10px 0px',
                                }}
                              ></img>
                            </div>
                            <div style={{ margin: '10px', width: '150px' }}>
                              <p
                                style={{ fontSize: '16px', margin: '0px' }}
                              >{`${follow.firstName} ${follow.lastName}`}</p>
                              <p style={{ fontSize: '14px', margin: '0px' }}>
                                @{follow.username}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  handleClose={toggleFollowing}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ borderTop: '1px solid gray', width: '95%', margin: 'auto' }}
      ></div>
      {posts.map((post) => (
        <div>
          <PostCard post={post} />
        </div>
      ))}
    </Hero>
  );
};
