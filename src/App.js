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
  const { state, dispatch } = useContext(SocialContext);
  return (
    <div className="App">
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
      {/* {state.isLoggedIn && (
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
      )} */}
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
      <header className="App-header">
        {/* <Loader /> */}
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
