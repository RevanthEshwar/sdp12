const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com'

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const apiService = {
  auth: {
    async login(email, password) {
      await delay()
      try {
        const users = JSON.parse(localStorage.getItem('pve:users') || '[]')
        const user = users.find(u => u.email === email && u.password === password)
        
        if (!user) {
          throw new Error('Invalid credentials')
        }

        return {
          success: true,
          data: {
            user,
            token: `token_${Date.now()}`
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async signup(email, password, name) {
      await delay()
      try {
        const users = JSON.parse(localStorage.getItem('pve:users') || '[]')
        
        if (users.find(u => u.email === email)) {
          throw new Error('Email already exists')
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          role: 'user',
          createdAt: new Date().toISOString()
        }

        users.push(newUser)
        localStorage.setItem('pve:users', JSON.stringify(users))

        return {
          success: true,
          data: {
            user: newUser,
            token: `token_${Date.now()}`
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async logout() {
      await delay(300)
      return { success: true }
    }
  },

  properties: {
    async create(propertyData) {
      await delay()
      try {
        const newProperty = {
          id: Date.now().toString(),
          ...propertyData,
          createdAt: new Date().toISOString()
        }
        return {
          success: true,
          data: newProperty
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async getAll() {
      await delay()
      try {
        const properties = JSON.parse(localStorage.getItem('pve:properties') || '[]')
        return {
          success: true,
          data: properties
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async getById(id) {
      await delay()
      try {
        const properties = JSON.parse(localStorage.getItem('pve:properties') || '[]')
        const property = properties.find(p => p.id === id)
        
        if (!property) {
          throw new Error('Property not found')
        }

        return {
          success: true,
          data: property
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async update(id, updates) {
      await delay()
      try {
        const properties = JSON.parse(localStorage.getItem('pve:properties') || '[]')
        const index = properties.findIndex(p => p.id === id)
        
        if (index === -1) {
          throw new Error('Property not found')
        }

        properties[index] = { ...properties[index], ...updates }
        localStorage.setItem('pve:properties', JSON.stringify(properties))

        return {
          success: true,
          data: properties[index]
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async delete(id) {
      await delay()
      try {
        const properties = JSON.parse(localStorage.getItem('pve:properties') || '[]')
        const filtered = properties.filter(p => p.id !== id)
        localStorage.setItem('pve:properties', JSON.stringify(filtered))

        return {
          success: true,
          data: { id }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  },

  recommendations: {
    async getRecommendations(formData) {
      await delay(800)
      try {
        const recommendations = [
          {
            id: '1',
            title: 'Modern Kitchen Renovation',
            description: 'Upgrade to a modern modular kitchen with stainless steel appliances',
            category: 'Interiors',
            costRange: { min: 200000, max: 500000 },
            impact: 'High'
          },
          {
            id: '2',
            title: 'Smart Home Automation',
            description: 'Install smart lighting, AC control, and security systems',
            category: 'Smart Home',
            costRange: { min: 150000, max: 300000 },
            impact: 'Medium'
          },
          {
            id: '3',
            title: 'Solar Panel Installation',
            description: 'Add solar panels to reduce electricity costs',
            category: 'Energy',
            costRange: { min: 300000, max: 600000 },
            impact: 'High'
          }
        ]

        return {
          success: true,
          data: recommendations
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  },

  saved: {
    async saveItem(item) {
      await delay()
      try {
        const saved = JSON.parse(localStorage.getItem('pve:saved') || '[]')
        
        if (saved.find(s => s.id === item.id)) {
          throw new Error('Item already saved')
        }

        saved.push(item)
        localStorage.setItem('pve:saved', JSON.stringify(saved))

        return {
          success: true,
          data: item
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async getSavedItems() {
      await delay()
      try {
        const saved = JSON.parse(localStorage.getItem('pve:saved') || '[]')
        return {
          success: true,
          data: saved
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async removeItem(id) {
      await delay()
      try {
        const saved = JSON.parse(localStorage.getItem('pve:saved') || '[]')
        const filtered = saved.filter(s => s.id !== id)
        localStorage.setItem('pve:saved', JSON.stringify(filtered))

        return {
          success: true,
          data: { id }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  },

  ideas: {
    async getIdeas() {
      await delay()
      try {
        const ideas = JSON.parse(localStorage.getItem('pve:ideas') || '[]')
        return {
          success: true,
          data: ideas
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async createIdea(ideaData) {
      await delay()
      try {
        const ideas = JSON.parse(localStorage.getItem('pve:ideas') || '[]')
        const newIdea = {
          id: Date.now().toString(),
          ...ideaData,
          createdAt: new Date().toISOString()
        }
        ideas.push(newIdea)
        localStorage.setItem('pve:ideas', JSON.stringify(ideas))

        return {
          success: true,
          data: newIdea
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  }
}
