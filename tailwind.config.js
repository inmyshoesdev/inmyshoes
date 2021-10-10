module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: (theme) => theme('height'),
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
      colors: {
        "teal": "#009688",
        "teal-50": "#e0f2f1",
        "teal-100": "#b2dfdb",
        "teal-200": "#80cbc4",
        "teal-300": "#4db6ac",
        "teal-400": "#26a69a",
        "teal-500": "#009688",
        "teal-600": "#00897b",
        "teal-700": "#00796b",
        "teal-800": "#00695c",
        "teal-900": "#004d40"
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
