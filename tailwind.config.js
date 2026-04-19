/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        'navy-950': '#0E1223',
        'navy-900': '#1C204B',
        'navy-800': '#33397A',
        'navy-200': '#BBC0FF',
        'purple-600': '#5747E4',
        'purple-500': '#7078C9',
        'work':      '#FF8B64',
        'play':      '#55C2E6',
        'study':     '#FF5E7D',
        'exercise':  '#4BCF82',
        'social':    '#7335D2',
        'self-care': '#F1C75B',
      },
    },
  },
  plugins: [],
};
