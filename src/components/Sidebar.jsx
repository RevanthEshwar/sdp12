import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../App.jsx'

export default function Sidebar() {
  const { user, logout } = useContext(AppContext)

  return (
    <aside className="w-48 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            ⚡
          </div>
          <span className="font-bold text-sm">FEDF-PS22</span>
        </div>
        {user && (
          <div className="text-xs text-slate-600">
            <div className="font-medium text-slate-900">{user.name}</div>
            <div className="truncate">{user.email}</div>
          </div>
        )}
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
        >
        
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/submit" 
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <span>📝</span>
          <span>Submit Property</span>
        </NavLink>
        
        <NavLink 
          to="/recommendations" 
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <span>💡</span>
          <span>Recommendations</span>
        </NavLink>
        
        <NavLink 
          to="/admin" 
          className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <span>👨‍💼</span>
          <span>Admin</span>
        </NavLink>
      </nav>

      <div className="p-3 border-t border-slate-200">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
