// import Img from './src/assets/map_pattern.png'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-pattern': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYH0gHYqR2edoqCJJ676ogWslmz6FjJtjdpA&usqp=CAU')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      colors: {
        'lightcream': '#f9faf5',
        'darkcream': '#e4e4e4',
        'wgrey': '#b7bac3',
        'main': '#6e77ee'
      },
    },
  },
  plugins: [],
}

