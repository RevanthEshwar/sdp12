import React, { useContext, useMemo, useState, useEffect } from 'react'
import { AppContext } from '../App.jsx'
import { apiService } from '../services/api'

export default function Recommendations() {
  const { recommendations, saved, setSaved, form } = useContext(AppContext)
  const [budgetFilter, setBudgetFilter] = useState('All Budgets')
  const [areaFilter, setAreaFilter] = useState('All Areas')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)
      const response = await apiService.recommendations.getRecommendations(form)
      setIsLoading(false)
    }
    fetchRecommendations()
  }, [form])

  const filtered = useMemo(() => {
    let list = [...recommendations]
    
    if (budgetFilter !== 'All Budgets') {
      const maxBudget = parseInt(budgetFilter)
      list = list.filter((r) => (r.costRange?.max || 0) <= maxBudget)
    }
    
    if (areaFilter !== 'All Areas') {
      list = list.filter((r) => {
        const title = r.title.toLowerCase()
        const desc = r.description.toLowerCase()
        const area = areaFilter.toLowerCase()
        return title.includes(area) || desc.includes(area)
      })
    }
    
    if (typeFilter !== 'All Types') {
      list = list.filter((r) => r.category === typeFilter)
    }
    
    return list
  }, [recommendations, budgetFilter, areaFilter, typeFilter])

  const toggleSave = (item) => {
    const exists = saved.find((s) => s.id === item.id)
    if (exists) setSaved(saved.filter((s) => s.id !== item.id))
    else setSaved([...saved, item])
  }

  const getImpactBadge = (category) => {
    const impacts = {
      'Interiors': { label: 'High Impact', color: 'bg-green-100 text-green-700 border-green-200' },
      'Smart Home': { label: 'Medium Impact', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      'Energy': { label: 'High Impact', color: 'bg-green-100 text-green-700 border-green-200' },
      'Civil': { label: 'High Impact', color: 'bg-green-100 text-green-700 border-green-200' },
      'Maintenance': { label: 'Medium Impact', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
    }
    return impacts[category] || { label: 'Medium Impact', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
  }

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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Personalized Recommendations</h1>
        <p className="text-slate-600">Based on your 2BHK Apartment in Whitefield, Bangalore</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-4">Filter Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">By Budget</label>
            <select 
              value={budgetFilter} 
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>All Budgets</option>
              <option value="50000">Up to ₹50,000</option>
              <option value="100000">Up to ₹1,00,000</option>
              <option value="200000">Up to ₹2,00,000</option>
              <option value="500000">Up to ₹5,00,000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">By Area</label>
            <select 
              value={areaFilter} 
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>All Areas</option>
              <option>Kitchen</option>
              <option>Bedroom</option>
              <option>Bathroom</option>
              <option>Living Room</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type of Improvement</label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>All Types</option>
              <option>Interiors</option>
              <option>Smart Home</option>
              <option>Energy</option>
              <option>Civil</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-slate-600 mt-2">Loading recommendations...</p>
            </div>
          </div>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-600">No recommendations found</p>
          </div>
        )}
        {!isLoading && filtered.map((item) => {
          const impact = getImpactBadge(item.category)
          const icon = getIconForCategory(item.category)
          const bgColor = getColorForCategory(item.category)
          const isSaved = !!saved.find((s) => s.id === item.id)
          
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
              <div className="flex flex-col md:flex-row">
                <div className={`${bgColor} w-full md:w-64 h-48 md:h-auto flex items-center justify-center text-6xl`}>
                  {icon}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${impact.color}`}>
                        {impact.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Estimated Cost</div>
                      <div className="text-lg font-semibold text-slate-900">
                        ₹{item.costRange?.min?.toLocaleString()} - ₹{item.costRange?.max?.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Potential Value Addition</div>
                      <div className="text-lg font-semibold text-green-600">
                        +₹{Math.round((item.costRange?.max || 0) * 0.4).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => toggleSave(item)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                        isSaved 
                          ? 'bg-pink-50 text-pink-700 border-pink-200' 
                          : 'bg-white text-slate-700 border-slate-300 hover:border-pink-300'
                      }`}
                    >
                      <span>❤️</span>
                      <span className="text-sm font-medium">{isSaved ? 'Saved' : 'Save Idea'}</span>
                    </button>
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition">
                      View Detailed Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
