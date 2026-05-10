export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './lib/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indikicks: {
          black: '#0A0A0A',
          cloud: '#F5F5F5',
          white: '#FFFFFF',
          concrete: '#272727',
          ash: '#8F8F8F',
          ice: '#C7E6F6',
          saffron: '#E5851F',
          red: '#D7262E'
        }
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        editorial: '0 28px 90px rgba(0, 0, 0, 0.18)',
        dark: '0 34px 100px rgba(0, 0, 0, 0.42)'
      }
    }
  },
  plugins: []
}
