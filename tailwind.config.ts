import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        blue: {
          DEFAULT: '#1B3A6B',
          mid: '#254d8e',
          light: '#3a6bb5',
          pale: '#e8f0fc',
        },
        silver: {
          DEFAULT: '#8a9ab0',
          light: '#c8d2de',
        },
        dark: '#0f1d33',
        mid: '#3a4a60',
        soft: '#6b7e97',
      },
    },
  },
  plugins: [],
}
export default config
