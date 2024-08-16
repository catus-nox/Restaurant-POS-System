/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
// const colors = require('tailwindcss/colors')
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //   spacing: {
      //     // '8xl': '96rem',
      //     // '9xl': '128rem',
      //   },
      //   borderRadius: {
      //     // '4xl': '2rem',
      //   }
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        full: '9999px'
      },
      fontSize: {
        heading: {
          xs: ['20px', '28px'],
          sm: ['24px', '32px'],
          base: ['28px', '36px'],
          lg: ['32px', '40px'],
          xl: ['36px', '44px'],
          '2xl': ['40px', '52px']
        },
        label: {
          xs: ['12px', '20px'],
          sm: ['14px', '20px'],
          base: ['16px', '24px'],
          lg: ['18px', '28px']
        },
        paragraph: {
          xs: ['12px', '20px'],
          sm: ['14px', '20px'],
          base: ['16px', '24px'],
          lg: ['18px', '28px']
        }
      },
      colors: {
        neutral: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          1000: '#000000'
        },
        brand: {
          100: '#FFF8ED',
          200: '#FFEED5',
          300: '#FFDAA9',
          400: '#FEC37D',
          500: '#FC983B',
          600: '#FB7A14',
          700: '#EB5F0B',
          800: '#C3460B',
          900: '#9B3811'
        },
        success: {
          100: '#F6FDDE',
          200: '#E7FBBE',
          300: '#D3F49B',
          400: '#BFEA7F',
          500: '#A1DD59',
          600: '#80BE41',
          700: '#609F2C',
          800: '#46801C',
          900: '#326A11'
        },
        warning: {
          100: '#FFF8CC',
          200: '#FFEF98',
          300: '#FFE466',
          400: '#FEDA3E',
          500: '#FFC801',
          600: '#DCA701',
          700: '#B78700',
          800: '#936A00',
          900: '#795500'
        },
        danger: {
          100: '#FFE9D3',
          200: '#FFCCA8',
          300: '#FFA97C',
          400: '#FF885C',
          500: '#FF5126',
          600: '#DB331B',
          700: '#B71B13',
          800: '#930C0F',
          900: '#7A0712'
        },
        info: {
          100: '#D2FBFF',
          200: '#A4F2FE',
          300: '#76E2FC',
          400: '#54CFF9',
          500: '#1CB0F6',
          600: '#1389D3',
          700: '#0D68B1',
          800: '#08498D',
          900: '#043476'
        },
        text: {
          primary: '#171717',
          secondary: '#404040',
          muted: '#737373',
          warning: '#B78700',
          danger: '#B71B13',
          success: '#609F2C',
          info: '#0D68B1',
          white: '#FFFFFF'
        },
        border: {
          base: '#E5E5E5'
        }
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1563px'
      }
    }
    // screens: {
    // }
    // fontSize: {},
    // colors: {},
    // fontFamily: {}
  },
  plugins: []
}
