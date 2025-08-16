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
    <main className="min-h-screen text-black gradient-bg" role="main">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-28 pb-12 hero-section"
      >
        <div className="px-6 mx-auto max-w-7xl md:grid md:grid-cols-12 md:gap-16 md:items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <p className="mb-3 text-sm font-semibold text-primary-700 uppercase tracking-widest">Export · Compliance · AI</p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl hero-title">
              Senvia Niryat AI
            </h1>

            <p className="max-w-2xl mb-8 text-lg font-medium text-neutral-700 lg:text-xl">
              Streamline export-import operations with intelligent automation, predictive analytics, and seamless global compliance — built for scale, designed for delight.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
              <Link to="/dashboard" className="inline-flex items-center justify-center space-x-3 text-lg shadow-lg btn-primary btn-lg">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/onboarding" className="inline-flex items-center justify-center space-x-3 text-lg btn-ghost btn-lg">
                <span>Book a Demo</span>
              </Link>
            </div>
          </div>

          <div className="mt-10 md:mt-0 md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-[360px] sm:w-[420px] hero-visual">
              <div className="absolute -left-6 -top-6 w-40 h-28 rounded-2xl glass transform -rotate-2" />
              <div className="absolute right-0 top-6 w-56 h-36 rounded-3xl bg-gradient-to-br from-white to-sky-50 shadow-xl" />
              <div className="relative p-6 card shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold">Dashboard</div>
                  <div className="text-xs text-neutral-400">Live</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 text-white">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-xs">AI Accuracy</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 text-neutral-900">
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-xs">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section (semantic dl) */}
      <section className="py-16 text-black bg-white" aria-labelledby="stats-heading">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Key statistics</h2>
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="stat-card"
                >
                  <dt className="flex items-center justify-center flex-col">
                    <div className="icon-badge mb-3">
                      <Icon className="w-5 h-5" aria-hidden />
                    </div>
                    <p className="mb-1 text-3xl font-extrabold text-neutral-900">{stat.value}</p>
                  </dt>
                  <dd className="text-neutral-500">{stat.label}</dd>
                </motion.article>
              )
            })}
          </dl>
        </div>
      </section>

      {/* Features Section */}
  <section className="py-24 text-black bg-white" aria-labelledby="features-heading">
        <div className="px-6 mx-auto max-w-7xl sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 id="features-heading" className="mb-6 text-4xl font-bold tracking-tight text-black lg:text-5xl">
              Powered by Advanced AI Technology
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-black">
              Our platform leverages next-gen artificial intelligence to transform how businesses handle international trade operations.
            </p>
          </motion.div>
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="flex flex-col items-center p-8 text-center card elevate hover:translate-y-[-6px] transform-gpu"
        role="article"
        aria-labelledby={`feature-${idx}-title`}
              >
        <div className="icon-badge mb-4">
          <feature.icon className={`h-5 w-5 ${feature.color}`} aria-hidden />
        </div>
        <h3 id={`feature-${idx}-title`} className="mb-2 text-xl font-semibold tracking-tight text-neutral-900 lg:text-2xl">{feature.title}</h3>
        <p className="text-base text-neutral-600">{feature.description}</p>
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
                <Link to="/dashboard" className="btn-primary btn-lg" aria-label="Open dashboard">
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
    </main>
  )
}

export default HomePage
