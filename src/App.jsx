import { useEffect } from "react";
import Navbar from "./component/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/profilePage";
import LoginPage from "./pages/loginPage";
import SettingPage from "./pages/settingPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemes } from "./store/useThemes";
import "./index.css";
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemes();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to='/login' />}
        />
        <Route
          path='/signup'
          element={!authUser ? <SignupPage /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to='/' />}
        />
        <Route path='/setting' element={<SettingPage />} />
        <Route
          path='/profile'
          element={authUser ? <ProfilePage /> : <Navigate to='/login' />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
