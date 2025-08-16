/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial'],
      },
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e6f0ff',
          300: '#84a9ff',
          500: '#3b82f6',
          700: '#1d4ed8',
          900: '#0b2b6b',
        },
        accent: {
          50: '#fff7ed',
          300: '#f59e0b',
          500: '#f97316',
          700: '#b45309',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f7fb',
          300: '#d1d5db',
          500: '#6b7280',
          700: '#374151',
        },
      },
      boxShadow: {
        'soft-xl': '0 10px 30px rgba(16,24,40,0.08)',
        'inset-sm': 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      borderRadius: {
        'xl-2': '1.25rem',
      },
      animation: {
        'float-y': 'floatY 6s ease-in-out infinite',
        'fade-in-fast': 'fadeIn 0.45s ease-out both',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography, forms],
}
