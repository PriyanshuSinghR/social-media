import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import { Loader } from './components/Loader';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages/Home';
import { RequireAuth } from './components/RequireAuth';
import NavigationBar from './components/NavigationBar';
import { useContext } from 'react';
import { SocialContext } from './context/SocialContext';
import { Explore } from './pages/Explore';
import { Bookmark } from './pages/Bookmark';
import { Liked } from './pages/Liked';
import { Profile } from './pages/Profile';
import { PostDetail } from './pages/PostDetail';

function App() {
  const { state } = useContext(SocialContext);
  return (
    <div className="App">
      {state.isLoading && (
        <div
          style={{
            position: 'fixed',
            backgroundColor: 'black',
            zIndex: 1,
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      {state.isLoggedIn && (
        <div
          style={{
            backgroundColor: 'black',
            position: 'fixed',
            width: '100%',
            zIndex: 1,
            boxShadow: '0 7px 30px 0 black',
          }}
        >
          <NavigationBar />
        </div>
      )}
      <header className="App-header">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="/bookmark"
            element={
              <RequireAuth>
                <Bookmark />
              </RequireAuth>
            }
          />
          <Route
            path="/liked"
            element={
              <RequireAuth>
                <Liked />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:profileId"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <RequireAuth>
                <PostDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
