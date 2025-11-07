import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/slices/authSlice'
import { setTheme } from '../utils/theme'
import { Sun, Moon, LogOut } from 'lucide-react'

export default function Navbar() {
  const user = useSelector((s) => s.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [theme, setThemeState] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    setThemeState(newTheme)
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('transition-colors', 'duration-500')
    const timer = setTimeout(() => {
      root.classList.remove('transition-colors', 'duration-500')
    }, 500)
    return () => clearTimeout(timer)
  }, [theme])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/60 shadow-md transition-all duration-500 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-5 py-3 max-w-7xl flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Template<span className="font-light">Store</span>
          </Link>
          <Link
            to="/templates"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Templates
          </Link>
          {user && (
            <Link
              to="/favorites"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              My Favorites
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {theme === 'dark' ? (
              <Sun className="size-6 text-yellow-400 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="size-6 text-white transition-transform duration-300 hover:rotate-90" />
            )}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow transition-all duration-300 hover:scale-[1.05]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 text-sm font-medium transition-all duration-300 hover:scale-[1.05]"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 flex items-center gap-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.05] cursor-pointer"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
