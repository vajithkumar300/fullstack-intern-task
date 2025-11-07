import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'admin'
    })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const res = await dispatch(loginUser(form))
        setLoading(false)
        if (res.meta.requestStatus === 'fulfilled') navigate('/templates')
    }

    // 🔄 When role toggles, auto-update credentials
    const handleRoleChange = (selectedRole) => {
        const newCredentials =
            selectedRole === 'admin'
                ? { email: 'admin@example.com', password: 'Admin@123' }
                : { email: 'ajith@gmail.com', password: '12345678' }

        setForm({ ...form, ...newCredentials, role: selectedRole })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center card-bg from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
            {/* 🧭 Sliding Role Toggle */}
            <p className='text-red-600 text-xs mb-1.5' >Quick toggle to test Admin/User login.</p>
            <div className="relative flex card-bg border bg-zinc-500 rounded-full w-48 mx-auto p-1 mb-6">
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute top-1 bottom-1 w-[46%] rounded-full bg-indigo-600 ${form.role === 'admin' ? 'left-[calc(50%+0.25rem)]' : 'left-1'
                        }`}
                ></motion.div>

                <div className="relative  flex w-full justify-between text-sm font-medium">
                    <button
                        type="button"
                        onClick={() => handleRoleChange('user')}
                        className={`w-1/2 py-1 z-10 cursor-pointer rounded-full transition-all ${form.role === 'user' ? 'text-white' : ''
                            }`}
                    >
                        User
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('admin')}
                        className={`w-1/2 py-1 cursor-pointer z-10 rounded-full transition-all ${form.role === 'admin' ? 'text-white' : ''
                            }`}
                    >
                        Admin
                    </button>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-full max-w-md  shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-8"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Welcome Back 👋
                </h2>



                {/* 🔐 Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        required
                    />
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        required
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white p-3 rounded-lg transition-all duration-300 font-medium"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
                >
                    Don’t have an account?{' '}
                    <Link
                        to="/register"
                        className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline transition-colors duration-300 "
                    >
                        Register here
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
