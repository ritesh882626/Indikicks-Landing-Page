export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        indikicks: {
          black: '#000000',
          cloud: '#F5F5F2',
          white: '#FFFFFF',
          concrete: '#2E2E2E',
          stone: '#CFCAC2',
          ash: '#A8A8A8',
          teal: '#285C4D',
          saffron: '#C56A2D',
          red: '#8E1F1F',
          ice: '#DCEBFF'
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        condensed: ['Arial Narrow', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        editorial: '0 28px 90px rgba(0, 0, 0, 0.18)'
      }
    }
  },
  plugins: []
}
