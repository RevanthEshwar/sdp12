import React, { useContext, useState } from 'react'
import { AppContext } from '../App.jsx'

const emptyIdea = { id: '', title: '', description: '', category: 'Interiors', costRange: { min: 10000, max: 50000 }, tags: [] }

export default function AdminDashboard() {
  const { ideas, setIdeas } = useContext(AppContext)
  const [draft, setDraft] = useState(emptyIdea)

  const upsertIdea = (e) => {
    e.preventDefault()
    const id = draft.id || crypto.randomUUID()
    const normalized = { 
      ...draft, 
      id, 
      costRange: { 
        min: Number(draft.costRange.min), 
        max: Number(draft.costRange.max) 
      }, 
      tags: (draft.tags || []).map(t => String(t).trim()).filter(Boolean) 
    }
    setIdeas((prev) => {
      const exists = prev.some((p) => p.id === id)
      return exists ? prev.map((p) => (p.id === id ? normalized : p)) : [normalized, ...prev]
    })
    setDraft(emptyIdea)
  }

  const editIdea = (idea) => setDraft({ ...idea, tags: [...(idea.tags||[])] })
  const deleteIdea = (id) => setIdeas((prev) => prev.filter((p) => p.id !== id))

  const getIconForCategory = (category) => {
    const icons = {
      'Interiors': '🔍',
      'Smart Home': '📱',
      'Energy': '⚡',
      'Civil': '🏗️',
      'Maintenance': '🔧'
    }
    return icons[category] || '💡'
  }

  const getColorForCategory = (category) => {
    const colors = {
      'Interiors': 'bg-orange-100',
      'Smart Home': 'bg-blue-100',
      'Energy': 'bg-green-100',
      'Civil': 'bg-purple-100',
      'Maintenance': 'bg-yellow-100'
    }
    return colors[category] || 'bg-slate-100'
  }

  const pendingSubmissions = [
    { property: '2BHK Apartment', size: '1200 sq ft', owner: 'Priya Sharma', location: 'Electronic City, Bangalore', time: '2 hours ago' },
    { property: 'Independent House', size: '2400 sq ft', owner: 'Amit Kumar', location: 'Indiranagar, Bangalore', time: '5 hours ago' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
            👨‍💼
          </div>
          <span className="font-bold text-sm">Admin Panel</span>
        </div>
        <nav className="p-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-pink-50 text-pink-700 font-medium">
            <span>👥</span>
            <span>Manage Users</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <span>💡</span>
            <span>Manage Recommendations</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <span>🏠</span>
            <span>Property Listings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <span>📊</span>
            <span>Analytics</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Manage users, properties, and recommendations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-blue-600 mb-1">1,247</div>
              <div className="text-sm text-slate-600">Total Users</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-green-600 mb-1">2,156</div>
              <div className="text-sm text-slate-600">Properties</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-1">23</div>
              <div className="text-sm text-slate-600">Pending Reviews</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-purple-600 mb-1">156</div>
              <div className="text-sm text-slate-600">Recommendations</div>
            </div>
          </div>

          {/* Pending Property Submissions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pending Property Submissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Property</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Owner</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Submitted</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSubmissions.map((sub, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">{sub.property}</div>
                        <div className="text-sm text-slate-600">{sub.size}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-700">{sub.owner}</td>
                      <td className="py-3 px-4 text-sm text-slate-700">{sub.location}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{sub.time}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md mr-2 transition">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manage Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Manage Recommendations</h2>
              <button 
                onClick={() => setDraft(emptyIdea)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Add New Recommendation
              </button>
            </div>

            {/* Add/Edit Form */}
            {(draft.id || draft.title) && (
              <form onSubmit={upsertIdea} className="bg-slate-50 rounded-lg p-6 mb-6 space-y-4">
                <h3 className="font-semibold text-slate-900">{draft.id ? 'Edit Recommendation' : 'Add New Recommendation'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Title" 
                    value={draft.title} 
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })} 
                    required 
                  />
                  <select 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    value={draft.category} 
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  >
                    {['Interiors','Civil','Energy','Maintenance','Smart Home'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <textarea 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Description" 
                  rows={3} 
                  value={draft.description} 
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })} 
                  required 
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    type="number" 
                    min="0" 
                    placeholder="Min Cost (₹)" 
                    value={draft.costRange.min} 
                    onChange={(e) => setDraft({ ...draft, costRange: { ...draft.costRange, min: e.target.value } })} 
                  />
                  <input 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    type="number" 
                    min="0" 
                    placeholder="Max Cost (₹)" 
                    value={draft.costRange.max} 
                    onChange={(e) => setDraft({ ...draft, costRange: { ...draft.costRange, max: e.target.value } })} 
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => setDraft(emptyIdea)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition" type="submit">
                    {draft.id ? 'Update' : 'Add'} Recommendation
                  </button>
                </div>
              </form>
            )}

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {ideas.map((idea) => {
                const bgColor = getColorForCategory(idea.category)
                const icon = getIconForCategory(idea.category)
                return (
                  <div key={idea.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition">
                    <div className={`${bgColor} h-32 flex items-center justify-center text-5xl`}>
                      {icon}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-1">{idea.title}</h3>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{idea.description}</p>
                      <div className="text-xs text-slate-500 mb-3">
                        ₹{idea.costRange.min.toLocaleString()} - ₹{idea.costRange.max.toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-3 py-1.5 rounded-md border border-slate-300 text-sm hover:bg-slate-50 transition" 
                          onClick={() => editIdea(idea)}
                        >
                          Edit
                        </button>
                        <button 
                          className="flex-1 px-3 py-1.5 rounded-md border border-red-300 text-red-600 text-sm hover:bg-red-50 transition" 
                          onClick={() => deleteIdea(idea.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
