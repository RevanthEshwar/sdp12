import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'

export default function Dashboard() {
  const { properties, navigate, user } = useContext(AppContext)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hi {user?.name || 'User'}, let's improve your property value!</h1>
        <p className="text-slate-600">Welcome back to your dashboard</p>
      </div>

      <div className="mb-10">
        <button 
          onClick={() => navigate('/submit')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-6 flex items-center gap-4 shadow-md transition group w-full max-w-md mx-auto"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition">
            ➕
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-1">Submit New Property</h3>
            <p className="text-sm text-blue-100">Add another property for recommendations</p>
          </div>
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Your Properties</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sample Property 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
          <div className="bg-blue-100 h-32 flex items-center justify-center text-5xl">
            🏢
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-1">2BHK Apartment</h3>
            <p className="text-sm text-slate-600 mb-3">Whitefield, Bangalore</p>
            <div className="space-y-1 mb-3">
              <div className="text-sm">
                <span className="text-slate-600">Current Value:</span>
                <span className="font-semibold text-slate-900"> ₹45,00,000</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-600">Potential Increase:</span>
                <span className="font-semibold text-green-600"> +₹6,75,000</span>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md px-3 py-1.5 text-xs font-medium text-yellow-800">
              3 Recommendations Available
            </div>
          </div>
        </div>

        {/* Sample Property 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
          <div className="bg-green-100 h-32 flex items-center justify-center text-5xl">
            🏡
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-1">Independent House</h3>
            <p className="text-sm text-slate-600 mb-3">Koramangala, Bangalore</p>
            <div className="space-y-1 mb-3">
              <div className="text-sm">
                <span className="text-slate-600">Current Value:</span>
                <span className="font-semibold text-slate-900"> ₹85,00,000</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-600">Potential Increase:</span>
                <span className="font-semibold text-green-600"> +₹12,75,000</span>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md px-3 py-1.5 text-xs font-medium text-yellow-800">
              5 Recommendations Available
            </div>
          </div>
        </div>

        {/* Add New Property Card */}
        <button 
          onClick={() => navigate('/submit')}
          className="bg-white rounded-xl shadow-sm border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 overflow-hidden transition group"
        >
          <div className="bg-slate-50 h-32 flex items-center justify-center text-5xl group-hover:scale-110 transition">
            ➕
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-1">Add New Property</h3>
            <p className="text-sm text-slate-600 mb-8">Submit another property to get recommendations</p>
            <div className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition">
              Add Property
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
