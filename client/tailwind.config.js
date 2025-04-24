/** @type {import('tailwindcss').Config} */
module.exports = {
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      theme: {
        extend: {
          colors: {
            white: '#fff',
            gainsboro: {
              100: '#e7e7e7',
              200: '#e5e7eb', // Matches border-gray-200
            },
            deepskyblue: '#0ea5e9', // Matches sky-500
            whitesmoke: {
              100: '#f8f8f8',
              200: '#f3f4f6',
            },
            dimgray: {
              100: '#4b5563', // Matches gray-600
              200: 'rgba(75, 85, 99, 0.6)',
            },
            gray: {
              DEFAULT: '#111827', // Matches gray-900
              300: '#D1D5DB', // Matches border-gray-300 (used in LoginForm inputs)
              600: '#4B5563', // Matches gray-600
              900: '#111827', // Matches gray-900
            },
            stone: {
              50: '#FAF7F5', // Matches stone-50 (used in Header search bar)
            },
            sky: {
              500: '#0EA5E9', // Matches deepskyblue, used in cart badge
            },
            neutral: {
              200: '#E4E4E7', // Matches border-neutral-200 (used in Footer)
            },
          },
          fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
          },
          fontSize: {
            xs: '12px', // Matches text-xs
            sm: '14px',
            base: '16px',
            xl: '20px', // Matches text-xl
            '2xl': '24px', // Matches text-2xl
            '3xl': '30px', // Matches text-3xl
            '4xl': '36px', // Matches text-4xl
            '15xl': '34px',
            inherit: 'inherit',
            '10px': '10px', // Matches text-[10px]
          },
          lineHeight: {
            tight: '1.25', // Matches leading-tight
            none: '1', // Matches leading-none
            normal: '1.5', // Matches leading-normal
            loose: '2', // Matches leading-loose
            '9px': '9px', // Matches leading-[9px]
          },
          borderRadius: {
            '9980xl': '9999px', // Matches rounded-full
            md: '6px', // Matches rounded-md (used in LoginForm inputs)
          },
          padding: {
            '101xl': '120px',
            '10xs': '3px',
          },
        },
      },
      corePlugins: {
        preflight: false,
      },
    };