/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // NOTA: Ya que Tailwind utiliza "font-sans" de forma predeterminada en el cuerpo (<body>), podemos asignarle aquí a la clave "sans" una fuente de nuestra preferencia para establecerla por defecto a toda la página. Si queremos usar otras fuentes, las especificamos en los elementos concretos (encabezados, números...).
      /* 
      sans: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'], 
      */
    },
  },
  plugins: [],
};
