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
       
       
        inputcolor: "#3f3f3f",
        inputtext: "#717171",

        darkbg:"#121212",
        textHeading : "#8A6ED6",
        navbg: "#1e1f22",
        cardbg: "#282828",
        layer1: "#221e22",
        layer2: "#373337",
        layer3: "#3f3f3f",
        
       

          //8A6ED6
          // A383FB
      }
    },
  },
  plugins: [],
}
