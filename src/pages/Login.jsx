import React, { useState, useContext } from 'react'
import { AppContext } from '../App.jsx'

export default function Login() {
  const { navigate, setUser } = useContext(AppContext)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('pve:users') || '[]')
      const user = users.find(u => u.email === formData.email && u.password === formData.password)
      
      if (user) {
        localStorage.setItem('pve:currentUser', JSON.stringify(user))
        setUser(user)
        navigate('/')
      } else {
        setError('Invalid email or password')
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }

      const users = JSON.parse(localStorage.getItem('pve:users') || '[]')
      
      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists')
        return
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      }

      users.push(newUser)
      localStorage.setItem('pve:users', JSON.stringify(users))
      localStorage.setItem('pve:currentUser', JSON.stringify(newUser))
      setUser(newUser)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
            🏠
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Property Value Enhancer</h1>
          <p className="text-slate-600">Enhance your property value with smart recommendations</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
                setFormData({ name: '', email: '', password: '', confirmPassword: '' })
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                isLogin
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
                setFormData({ name: '', email: '', password: '', confirmPassword: '' })
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                !isLogin
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Demo credentials: <br />
                Email: <strong>demo@example.com</strong> <br />
                Password: <strong>demo123</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
