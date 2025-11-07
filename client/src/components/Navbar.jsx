import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/slices/authSlice'
import { setTheme } from '../utils/theme'
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react'

export default function Navbar() {
  const user = useSelector((s) => s.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [theme, setThemeState] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    setMenuOpen(false)
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

  const getLinkClass = (path) => {
    const base = "text-sm font-medium pb-1 border-b-2 transition-all duration-300"
    const active =
      location.pathname === path
        ? "text-indigo-600 dark:text-white border-indigo-600 dark:border-orange-400 font-bold"
        : "text-gray-300 dark:text-white border-transparent hover:text-orange-600 font-bold dark:hover:text-orange-400 hover:border-orange-600"
    return `${base} ${active}`
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/60 shadow-md transition-all duration-500 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-5 py-3 max-w-7xl flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Template<span className="font-light">Store</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/templates" className={getLinkClass('/templates')}>
              Templates
            </Link>

            {user && (
              <Link to="/favorites" className={getLinkClass('/favorites')}>
                My Favorites
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link to="/admin" className={getLinkClass('/admin')}>
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {theme === 'dark' ? (
              <Sun className="size-6 text-yellow-400 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="size-6 text-white transition-transform duration-300 hover:-rotate-90" />
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
                className="px-4 py-2 rounded-lg border border-indigo-600 text-white hover:bg-indigo-50 dark:hover:bg-gray-800 text-sm font-medium transition-all duration-300 hover:scale-[1.05]"
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

        {/* Mobile menu button */}<div className='flex items-center gap-2 sm:gap-0 md:hidden' >        
            <button
              onClick={toggleTheme}
              className="rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-white flex items-center"
            > 
              {theme === 'dark' ? (
                <Sun className="size-6 text-yellow-400 ml-2" />
              ) : (
                <Moon className="size-6 text-white ml-2" />
              )}
            </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-700 backdrop-blur-lg animate-slideDown ease-in-out">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/templates"
              onClick={() => setMenuOpen(false)}
              className={getLinkClass('/templates')}
            >
              Templates
            </Link>

            {user && (
              <Link
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className={getLinkClass('/favorites')}
              >
                My Favorites
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={getLinkClass('/admin')}
              >
                Admin
              </Link>
            )}

            

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 w-full text-center rounded-lg  text-white text-sm font-medium transition-all duration-300 hover:scale-[1.05]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 w-full text-center rounded-lg   text-white hover:bg-indigo-50 dark:hover:bg-gray-800 text-sm font-medium transition-all duration-300 hover:scale-[1.05]"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 w-full text-center flex justify-center items-center gap-2 rounded-lg  text-white text-sm font-medium transition-all duration-300 hover:scale-[1.05]"
              >
                <LogOut className="size-4" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
