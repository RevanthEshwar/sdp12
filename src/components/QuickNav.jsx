import React from 'react'
import { NavLink } from 'react-router-dom'

export default function QuickNav() {
  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-600">Quick Navigation</span>
      </div>
      <nav className="flex flex-col">
        <NavLink 
          to="/" 
          className={({isActive}) => `px-4 py-2 text-sm transition ${isActive ? 'bg-cyan-50 text-cyan-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/submit" 
          className={({isActive}) => `px-4 py-2 text-sm transition ${isActive ? 'bg-yellow-50 text-yellow-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
        >
          Submit
        </NavLink>
        <NavLink 
          to="/recommendations" 
          className={({isActive}) => `px-4 py-2 text-sm transition ${isActive ? 'bg-purple-50 text-purple-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
        >
          Recommendations
        </NavLink>
        <NavLink 
          to="/admin" 
          className={({isActive}) => `px-4 py-2 text-sm transition ${isActive ? 'bg-pink-50 text-pink-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
        >
          Admin
        </NavLink>
      </nav>
    </div>
  )
}
