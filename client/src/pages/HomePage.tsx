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
    <div className="min-h-screen text-black gradient-bg">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-12 text-center"
      >
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-black lg:text-6xl hero-title">
          <span className="block mb-2">Senvia Niryat AI</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-blue-400 to-primary-700">
            World-Class Export Copilot
          </span>
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl font-medium text-black lg:text-2xl">
          Streamline your export-import operations with intelligent automation, predictive analytics, and seamless compliance management. Built for global scale, designed for pure delight.
        </p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link 
            to="/dashboard"
            className="inline-flex items-center justify-center space-x-3 text-lg shadow-lg btn-primary"
          >
            <span>Get Started</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 text-black bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                  <div className="mb-1 text-3xl font-bold text-black">{stat.value}</div>
                  <div className="text-neutral-700">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 text-black bg-white">
        <div className="px-6 mx-auto max-w-7xl sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-black lg:text-5xl">
              Powered by Advanced AI Technology
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-black">
              Our platform leverages next-gen artificial intelligence to transform how businesses handle international trade operations.
            </p>
          </motion.div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="flex flex-col items-center p-8 text-center card elevate"
              >
        <feature.icon className={`h-12 w-12 mb-4 ${feature.color} drop-shadow-lg`} />
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-black lg:text-2xl">{feature.title}</h3>
        <p className="text-base text-neutral-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 text-black bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-black lg:text-4xl">
                See AI in Action
              </h2>
              <p className="mb-8 text-lg text-black">
                Experience how our AI transforms complex trade operations into 
                simple, automated workflows. From document processing to route 
                optimization, every feature is designed for maximum efficiency.
              </p>
              
              <div className="mb-8 space-y-4">
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
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-black">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Link to="/dashboard" className="btn-primary btn-lg">
                  Try Dashboard
                </Link>
                <Link to="/analytics" className="btn-ghost btn-lg">
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
                <div className="p-4 card">
                  <BarChart3 className="w-8 h-8 mb-2 text-blue-600" />
                  <h4 className="font-semibold text-black">Analytics</h4>
                  <p className="text-sm text-black">Real-time insights</p>
                </div>
                <div className="p-4 card">
                  <FileCheck className="w-8 h-8 mb-2 text-green-600" />
                  <h4 className="font-semibold text-black">Documents</h4>
                  <p className="text-sm text-black">AI processing</p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 card">
                  <MapPin className="w-8 h-8 mb-2 text-purple-600" />
                  <h4 className="font-semibold text-black">Tracking</h4>
                  <p className="text-sm text-black">Live updates</p>
                </div>
                <div className="p-4 card">
                  <Bot className="w-8 h-8 mb-2 text-orange-600" />
                  <h4 className="font-semibold text-black">AI Assistant</h4>
                  <p className="text-sm text-black">24/7 support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-black gradient-bg">
        <div className="max-w-4xl px-6 mx-auto text-center sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 text-4xl font-bold text-black lg:text-5xl">
              Ready to Transform Your Trade Operations?
            </h2>
            <p className="mb-10 text-2xl text-black">
              Join the future of global trade. Experience the power of Senvia Niryat AI today.
            </p>
            <Link 
              to="/onboarding"
              className="inline-flex items-center justify-center space-x-3 text-lg shadow-xl btn-secondary"
            >
              <span>Start Onboarding</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
