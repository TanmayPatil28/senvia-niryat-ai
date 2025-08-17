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

const MotionLink = motion(Link)

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Processing',
    description: 'Automated document processing with high accuracy using next-gen AI models',
    color: 'text-primary-600'
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Reduce manual steps with smart routing, validation and auto-fill',
    color: 'text-yellow-500'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Support for multi-jurisdiction compliance and global trade lanes',
    color: 'text-sky-600'
  },
  {
    icon: Shield,
    title: 'Compliance-first',
    description: 'Built-in checks to minimize clearance delays and fines',
    color: 'text-emerald-600'
  }
]

const stats = [
  { label: 'Shipments', value: '1,248', icon: TrendingUp },
  { label: 'Compliance', value: '98%', icon: Shield },
  { label: 'Auto-filled', value: '82%', icon: CheckCircle },
  { label: 'Saved hrs/wk', value: '34', icon: Zap }
]

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-50 gradient-bg">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pb-12 pt-28 hero-section"
      >
        <div className="px-6 mx-auto max-w-7xl md:grid md:grid-cols-12 md:gap-16 md:items-center">
          <div className="text-center md:col-span-7 md:text-left">
            <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-primary-700">Export · Compliance · AI</p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-6xl hero-title">
              Transform customs and shipments with AI-driven automation
            </h1>

            <p className="max-w-2xl mb-8 text-lg font-medium text-neutral-800 dark:text-neutral-300">
              Streamline export-import operations with intelligent automation, predictive analytics, and seamless global compliance — built for scale.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
                <MotionLink to="/dashboard" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-flex items-center justify-center space-x-3 text-lg shadow-lg btn-primary btn-lg">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ui-icon" />
              </MotionLink>
                <MotionLink to="/onboarding" whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.12 }} className="inline-flex items-center justify-center space-x-3 text-lg btn-ghost btn-lg">
                <span>Book a Demo</span>
              </MotionLink>
            </div>
          </div>

          <div className="flex justify-center mt-10 md:mt-0 md:col-span-5 md:justify-end">
            <div className="relative hidden md:block w-[360px] sm:w-[420px] hero-visual" aria-hidden="true">
              <div className="absolute w-40 transform -left-6 -top-6 h-28 rounded-2xl glass -rotate-2" />
              <div className="absolute right-0 w-56 shadow-xl top-6 h-36 rounded-3xl bg-gradient-to-br from-white to-sky-50" />
              <div className="relative p-6 shadow-2xl card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold">Dashboard</div>
                  <div className="text-xs text-neutral-400">Live</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 text-white rounded-xl bg-gradient-to-br from-primary-600 to-primary-400">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-xs">AI Accuracy</div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface/80 dark:bg-[#0b1220]/80 text-neutral-900 dark:text-neutral-50">
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
  <section className="py-16 bg-surface text-neutral-900 dark:text-neutral-50 dark:bg-transparent" aria-labelledby="stats-heading">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Key statistics</h2>
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4" role="list">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.li role="listitem"
                  key={stat.label}
                  initial={{ opacity: 0, y: 10, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22, delay: index * 0.06 }}
                  className="list-none stat-card"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 icon-badge">
                      <Icon className="w-5 h-5 ui-icon" aria-hidden />
                    </div>
                    <p className="mb-1 text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">{stat.value}</p>
                    <p className="text-neutral-500">{stat.label}</p>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Features Section */}
  <section className="py-24 bg-surface text-neutral-900 dark:text-neutral-50 dark:bg-transparent" aria-labelledby="features-heading">
        <div className="px-6 mx-auto max-w-7xl sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 id="features-heading" className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 lg:text-5xl">
              Powered by Advanced AI Technology
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-neutral-700 dark:text-neutral-300">
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
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.995 }}
                className="flex flex-col items-center p-8 text-center card elevate transform-gpu"
                role="article"
                aria-labelledby={`feature-${idx}-title`}
              >
                <div className="mb-4 icon-badge">
                  <feature.icon className={`h-5 w-5 ui-icon`} aria-hidden />
                </div>
                <h3 id={`feature-${idx}-title`} className="mb-2 text-xl font-semibold tracking-tight text-neutral-900 lg:text-2xl">{feature.title}</h3>
                <p className="text-base text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
  <section className="py-20 bg-surface text-neutral-900 dark:text-neutral-50 dark:bg-transparent">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-neutral-900 dark:text-neutral-50 lg:text-4xl">
                See AI in Action
              </h2>
              <p className="mb-8 text-lg text-neutral-700 dark:text-neutral-300">
                Experience how our AI transforms complex trade operations into simple, automated workflows.
              </p>

              <div className="mb-8 space-y-4">
                {[
                  'Smart document extraction and validation',
                  'Real-time compliance checking',
                  'Predictive market analytics',
                  'Automated route optimization'
                ].map((item) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-neutral-900 dark:text-neutral-50">{item}</span>
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

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 card">
                  <BarChart3 className="w-8 h-8 mb-2 ui-icon" />
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">Analytics</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">Real-time insights</p>
                </div>
                <div className="p-4 card">
                  <FileCheck className="w-8 h-8 mb-2 ui-icon" />
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">Documents</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">AI processing</p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 card">
                  <MapPin className="w-8 h-8 mb-2 ui-icon" />
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">Tracking</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">Live updates</p>
                </div>
                <div className="p-4 card">
                  <Bot className="w-8 h-8 mb-2 ui-icon" />
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">AI Assistant</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">24/7 support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-neutral-900 dark:text-neutral-50 gradient-bg">
        <div className="max-w-4xl px-6 mx-auto text-center sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="mb-8 text-4xl font-bold text-neutral-900 dark:text-neutral-50 lg:text-5xl">Ready to Transform Your Trade Operations?</h2>
            <p className="mb-10 text-2xl text-neutral-700 dark:text-neutral-300">Join the future of global trade. Experience the power of Senvia Niryat AI today.</p>
            <Link to="/onboarding" className="inline-flex items-center justify-center space-x-3 text-lg shadow-xl btn-secondary">
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
