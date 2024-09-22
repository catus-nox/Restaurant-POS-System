/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    '*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*..{js,jsx,ts,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        sm: '2px',
        base: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px'
      },
      borderWidth: {
        0: '0',
        DEFAULT: '1px',
        2: '2px',
        4: '4px',
        8: '8px'
      },
      fontSize: {
        xs: ['12px', '1.5'],
        sm: ['14px', '1.5'],
        DEFAULT: ['16px', '1.5'],
        base: ['16px', '1.5'],
        lg: ['18px', '1.5'],
        xl: ['20px', '1.5'],
        '2xl': ['22px', '1.5'],
        h6: ['16px', '1.2'],
        h5: ['20px', '1.2'],
        h4: ['24px', '1.2'],
        h3: ['28px', '1.2'],
        h2: ['32px', '1.2'],
        h1: ['40px', '1.2']
      },
      colors: {
        primary: {
          50: '#FFFBEC',
          100: '#FFF6D4',
          200: '#FFE9A7',
          300: '#FFD870',
          400: '#FFBB36',
          500: '#FFA40F',
          600: '#FA8C05',
          700: '#C86706',
          800: '#9E500E',
          900: '#7F420F',
          950: '#452005'
        },
        secondary: {
          50: '#FBF8F1',
          100: '#F5EEDF',
          200: '#EBDBBD',
          300: '#DDC194',
          400: '#D5AD7B',
          500: '#C5894A',
          600: '#B7753F',
          700: '#985D36',
          800: '#7B4C31',
          900: '#643F2A',
          950: '#351F15'
        },
        tertiary: {
          50: '#FEFEE7',
          100: '#FCFCCB',
          200: '#F6F89E',
          300: '#EBF165',
          400: '#DCE536',
          500: '#C3D018',
          600: '#95A20E',
          700: '#707B10',
          800: '#586113',
          900: '#4A5314',
          950: '#272E05'
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE3E2',
          200: '#FECCCA',
          300: '#FCA8A5',
          400: '#F87671',
          500: '#EF4B44',
          600: '#DE3730',
          700: '#B9221C',
          800: '#99201B',
          900: '#7F211D',
          950: '#450C0A'
        },
        netural: {
          0: '#FFFFFF',
          100: '#EFEFEF',
          200: '#DCDCDC',
          300: '#BDBDBD',
          400: '#989898',
          500: '#7C7C7C',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3D3D3D',
          950: '#292929'
        }
      },
      screens: {
        sm: '450px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1563px'
      },
      // eslint-disable-next-line no-undef
      fontFamily: { 'Noto-Sans-TC': ['Noto Sans TC', 'system-ui'] }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ]
}
