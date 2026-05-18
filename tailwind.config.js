export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './lib/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indikicks: {
          black: '#000000',
          cloud: '#F5F5F2',
          white: '#FFFFFF',
          concrete: '#2E2E2E',
          stone: '#CFCAC2',
          ash: '#8A8A8A',
          ice: '#DCEBFF',
          saffron: '#C56A2D',
          red: '#8E1F1F'
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
