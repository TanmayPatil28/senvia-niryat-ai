import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ArrowUp, 
  ArrowDown, 
  DollarSign,
  Package,
  Ship,
  Globe,
  BarChart3
} from 'lucide-react'

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Shipments',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$2.4M',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Routes',
      value: '34',
      change: '-2%',
      trend: 'down',
      icon: Ship,
      color: 'text-purple-600'
    },
    {
      title: 'Countries',
      value: '18',
      change: '+3%',
      trend: 'up',
      icon: Globe,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Trade Dashboard
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
              
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                    <div className={`flex items-center space-x-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="h-4 w-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.title}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Trade Volume Trends
                </h2>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive chart coming soon</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  { action: 'Shipment departed', location: 'Mumbai Port', time: '2 hours ago' },
                  { action: 'Document approved', location: 'Customs', time: '4 hours ago' },
                  { action: 'Payment received', location: 'Client XYZ', time: '1 day ago' },
                  { action: 'Route optimized', location: 'AI System', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
