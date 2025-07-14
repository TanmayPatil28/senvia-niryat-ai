import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Bot, 
  TrendingUp, 
  Shield, 
  Globe, 
  Zap,
  CheckCircle,
  BarChart3,
  FileCheck,
  MapPin
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Processing',
      description: 'Automated document processing with 95%+ accuracy using advanced AI models',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Market forecasting and demand prediction to optimize your trade decisions',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Compliance Assistant',
      description: 'Automated regulatory compliance checking across 50+ countries',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with verified trade partners worldwide through our AI matching',
      color: 'text-orange-600'
    }
  ]

  const stats = [
    { label: 'Countries Supported', value: '150+', icon: Globe },
    { label: 'AI Accuracy', value: '95%', icon: Bot },
    { label: 'Time Saved', value: '70%', icon: Zap },
    { label: 'Cost Reduction', value: '30%', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Revolutionize International Trade with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                AI Power
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Streamline your export-import operations with intelligent automation, 
              predictive analytics, and seamless compliance management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dashboard"
                className="btn-primary bg-white text-primary-900 hover:bg-gray-100 px-8 py-4 text-lg inline-flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 text-lg">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge artificial intelligence to transform 
              how businesses handle international trade operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <Icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                See AI in Action
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience how our AI transforms complex trade operations into 
                simple, automated workflows. From document processing to route 
                optimization, every feature is designed for maximum efficiency.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Smart document extraction and validation',
                  'Real-time compliance checking',
                  'Predictive market analytics',
                  'Automated route optimization'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Link to="/dashboard" className="btn-primary">
                  Try Dashboard
                </Link>
                <Link to="/analytics" className="btn-secondary bg-gray-100 text-gray-900 hover:bg-gray-200">
                  View Analytics
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="card p-4">
                  <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-semibold">Analytics</h4>
                  <p className="text-sm text-gray-600">Real-time insights</p>
                </div>
                <div className="card p-4">
                  <FileCheck className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-semibold">Documents</h4>
                  <p className="text-sm text-gray-600">AI processing</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="card p-4">
                  <MapPin className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold">Tracking</h4>
                  <p className="text-sm text-gray-600">Live updates</p>
                </div>
                <div className="card p-4">
                  <Bot className="h-8 w-8 text-orange-600 mb-2" />
                  <h4 className="font-semibold">AI Assistant</h4>
                  <p className="text-sm text-gray-600">24/7 support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Trade Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses already using AI to streamline their 
              international trade processes and reduce costs by up to 30%.
            </p>
            <Link 
              to="/dashboard"
              className="btn-primary bg-white text-primary-900 hover:bg-gray-100 px-8 py-4 text-lg inline-flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
