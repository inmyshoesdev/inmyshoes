const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        min: 'min-content',
        max: 'max-content',
      },
      minHeight: (theme) => theme('height'),
      width: {
        '1/50': '2%'
      },
      minWidth: (theme) => theme('width'),
      maxWidth: (theme) => theme('width'),
      inset: {
        unset: 'unset',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        raise: {
          '0%, 100%': {
            boxShadow: '0 0.5em 0.5em -0.4em #ffffff',
            transform: 'translateY(-0.1em)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        bounce: 'bounce 3s infinite',
        ping: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        raise: 'raise 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      cursor: {
        pointer:
          'url(https://soristic.sgp1.digitaloceanspaces.com/general/curhand.cur), auto !important;',
      },
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '.625rem',
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        handwritten: ['Dekko', 'Rubik', ...defaultTheme.fontFamily.sans],
        // below is used in the landing page
        joe: ['Josefin Sans', 'sans-serif'],
        nun: ['Nunito Sans', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        staat: ['Staatliches', 'cursive']
      },
      colors: {
        teal: '#009688',
        'teal-50': '#e0f2f1',
        'teal-100': '#b2dfdb',
        'teal-200': '#80cbc4',
        'teal-300': '#4db6ac',
        'teal-400': '#26a69a',
        'teal-500': '#009688',
        'teal-600': '#00897b',
        'teal-700': '#00796b',
        'teal-800': '#00695c',
        'teal-900': '#004d40',
        // below is used in the landing page
        'HTP-bg': '#CADFDF',
        'HTP-text': '#6C857C',
        'r-button': '#69C6C2',
        'r-bg': '#FFF7F3',
        'r-play-inner-bg': '#FEF3E6',
        'r-play-border': '#F1CEA5',
        'r-edu-inner-bg': '#E9EBEA',
        'footer-blue': '#1B3A5D'
      },
      borderRadius: {
        xl: '2rem',
        handdrawn: '300px 15px 175px 15px/15px 175px 15px 300px',
        narration: '300px 15px 175px 15px/15px 175px 15px 300px',
        dialog: '15px 20px 24px 14px/20px 30px 14px 24px',
      },
      borderWidth: {
        3: '3px',
        10: '12px',
        narration: '2px 7px 7px 2px',
        speech: '2px 4px 6px 4px',
      },
      lineHeight: {
        relaxed: '1.67',
      },
      transitionProperty: {
        filter: 'filter',
      },
      scale: {
        '30': '.30'
      },
      boxShadow: {
        button: '3px 3px #888888'
      },
      screens: {
        'sm': {'raw': '(min-width: 640px) and (min-height: 360px)'},
        'md': {'raw': '(min-width: 768px) and (min-height: 432px)'},
        'lg': {'raw': '(min-width: 1024px) and (min-height: 576px)'},
        'xl': {'raw': '(min-width: 1280px) and (min-height: 720px)'},
        '2xl': {'raw': '(min-width: 1536px) and (min-height: 864px)'},
        'mobile':  {'raw': '(min-aspect-ratio: 31/18) and (max-width: 1024px)'}
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
