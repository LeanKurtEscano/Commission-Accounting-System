/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'spotlight': 'radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, rgba(0, 255, 255, 0.3) 70%, rgba(0, 255, 255, 0.6) 80%, rgba(0, 255, 255, 0.8) 100%)',
      },
      colors: {
        darkcyan: '#0B172A',
        customPurple3:'#8826E4',
        navcolor: "#050a0d",
        customtext:'#1DB6C1',
        darkbg:"#091216",
        darkpurple:"#9171f8",
        inputcolor: "#3f3f3f",
        inputtext: "#717171",
        formcolor: "#282828",
        formhover: "#4C4A4A",
        darktext: "#ba9ffb",
        darktext2: "#8b8b8b",
        darktext3: "#C9C9C9",
        buttonbg: '#1DB6C1',
        googlebg: '#828592',
        loginbg: "#0e1b21",
          // 8826E4
      }
    },
  },
  plugins: [],
}
