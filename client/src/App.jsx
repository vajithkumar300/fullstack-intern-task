
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Templates from "./pages/Templates";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FavoritesPage from "./pages/Favorites";
import AdminDashboard from "./pages/AdminDashboard";
import Loader from "./components/Loader";


export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const loading = useSelector(s => s.templates.loading);
  

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  

  // if(loading) <Loader />

return (
  <div>
      <Navbar user={user} />
      <main className="mt-16">
        <Routes> 
        <Route path="/" element={<Navigate to="/templates" replace />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
      </main>
    </div>
  );
}
