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
      backgroundImage: {
        ad1: 'url("@/assets/img/ad1.jpg")',
        img1002928: 'url("@/assets/img/1002928.jpg")',
        img1002929: 'url("@/assets/img/1002929.jpg")',
        img1002930: 'url("@/assets/img/1002930.jpg")',
        img1002931: 'url("@/assets/img/1002931.jpg")',
        img1002932: 'url("@/assets/img/1002932.jpg")',
        img1002933: 'url("@/assets/img/1002933.jpg")',
        img1002934: 'url("@/assets/img/1002934.jpg")',
        img1002935: 'url("@/assets/img/1002935.jpg")',
        img1002936: 'url("@/assets/img/1002936.jpg")',
        img1002937: 'url("@/assets/img/1002937.jpg")',
        img1002938: 'url("@/assets/img/1002938.jpg")',
        img1002939: 'url("@/assets/img/1002939.jpg")',
        img1002940: 'url("@/assets/img/1002940.jpg")',
        img1002941: 'url("@/assets/img/1002941.jpg")',
        img1002942: 'url("@/assets/img/1002942.jpg")',
        img1002943: 'url("@/assets/img/1002943.jpg")',
        img1002944: 'url("@/assets/img/1002944.jpg")',
        img1002945: 'url("@/assets/img/1002945.jpg")',
        img1002946: 'url("@/assets/img/1002946.jpg")',
        img1002947: 'url("@/assets/img/1002947.jpg")',
        img1002948: 'url("@/assets/img/1002948.jpg")',
        img1002949: 'url("@/assets/img/1002949.jpg")',
        img1002950: 'url("@/assets/img/1002950.jpg")',
        img1002951: 'url("@/assets/img/1002951.jpg")',
        img1002952: 'url("@/assets/img/1002952.jpg")',
        img1002953: 'url("@/assets/img/1002953.jpg")',
        img1002954: 'url("@/assets/img/1002954.jpg")',
        img1002955: 'url("@/assets/img/1002955.jpg")'
      },
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
      boxShadow: {
        'inner-custom1': 'inset 0 0 0 1px rgba(215, 231, 203, 1)',
        'inner-custom2': 'inset 0 0 0 3px rgba(221, 193, 148, 1)',
        'inner-custom3': 'inset 0 0 0 1px rgba(200, 103, 6, 1)',
        'inner-custom4': 'inset 0 0 0 3px rgba(127, 66, 15, 1)',
        'inner-custom5': 'inset 0 0 0 1px rgba(251, 248, 241, 1)',
        'inner-custom6': 'inset 0 0 0 1px rgba(235, 219, 189, 1)',
        'inner-custom7': 'inset 0 0 0 1px rgba(229, 231, 235, 1)',
        'inner-custom8': 'inset 0 0 0 3px rgba(158, 80, 14, 1)',
        'inner-custom9': 'inset 0 0 0 2px rgba(200, 103, 6, 1)',
        'inner-custom10': 'inset 0 0 0 1px rgba(220, 220, 220, 1)',
        sm: '0 1px 2px 0px rgba(0, 0, 0, 0.08)',
        DEFAULT: '0 1px 3px 0px rgba(0, 0, 0, 0.1),0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px 0px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px 0px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
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
        neutral: {
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
