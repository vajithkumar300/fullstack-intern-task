import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await dispatch(registerUser(form))
        setLoading(false)
        if (res.meta.requestStatus === 'fulfilled') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/templates')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center  from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            
            <div className="w-full border border-gray-300 max-w-md card-bg rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-center  mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                    />
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        type="email"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                    />
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded-lg cursor-pointer text-white font-semibold transition duration-300 ${loading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}
