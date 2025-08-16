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
      description: 'Automated document processing with 99%+ accuracy using next-gen AI models',
      color: 'text-primary-700'
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
      title: 'Global Reach',
      description: 'Expand your business to new markets with seamless international support',
      color: 'text-blue-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times for every action',
      color: 'text-yellow-500'
    },
    {
      icon: CheckCircle,
      title: 'Trusted Security',
      description: 'Enterprise-grade security and privacy for all users',
      color: 'text-green-700'
    }
  ]

  const stats = [
    { label: 'Countries Supported', value: '150+', icon: Globe },
    { label: 'AI Accuracy', value: '95%', icon: Bot },
    { label: 'Time Saved', value: '70%', icon: Zap },
    { label: 'Cost Reduction', value: '30%', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen gradient-bg text-black">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-24 pb-12"
      >
        <h1 className="text-5xl lg:text-7xl font-extrabold text-black mb-8 tracking-tight">
          <span className="block mb-2">Senvia Niryat AI</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-blue-400 to-primary-700">
            World-Class Export Copilot
          </span>
        </h1>
        <p className="text-2xl text-black mb-10 max-w-3xl mx-auto font-medium">
          Streamline your export-import operations with intelligent automation, predictive analytics, and seamless compliance management. Built for global scale, designed for pure delight.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            to="/dashboard"
            className="btn-primary text-lg inline-flex items-center justify-center space-x-3 shadow-lg"
          >
            <span>Get Started</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-white text-black">
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
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-black">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Our platform leverages next-gen artificial intelligence to transform how businesses handle international trade operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card p-10 flex flex-col items-center text-center shadow-xl glass-effect"
              >
                <feature.icon className={`h-12 w-12 mb-4 ${feature.color} drop-shadow-lg`} />
                <h3 className="text-2xl font-bold mb-3 text-black tracking-tight">{feature.title}</h3>
                <p className="text-lg text-black font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                See AI in Action
              </h2>
              <p className="text-lg text-black mb-8">
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
                  <span className="text-black">{item}</span>
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
                  <h4 className="font-semibold text-black">Analytics</h4>
                  <p className="text-sm text-black">Real-time insights</p>
                </div>
                <div className="card p-4">
                  <FileCheck className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-semibold text-black">Documents</h4>
                  <p className="text-sm text-black">AI processing</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="card p-4">
                  <MapPin className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold text-black">Tracking</h4>
                  <p className="text-sm text-black">Live updates</p>
                </div>
                <div className="card p-4">
                  <Bot className="h-8 w-8 text-orange-600 mb-2" />
                  <h4 className="font-semibold text-black">AI Assistant</h4>
                  <p className="text-sm text-black">24/7 support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg text-black">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8">
              Ready to Transform Your Trade Operations?
            </h2>
            <p className="text-2xl text-black mb-10">
              Join the future of global trade. Experience the power of Senvia Niryat AI today.
            </p>
            <Link 
              to="/onboarding"
              className="btn-secondary text-lg inline-flex items-center justify-center space-x-3 shadow-xl"
            >
              <span>Start Onboarding</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
