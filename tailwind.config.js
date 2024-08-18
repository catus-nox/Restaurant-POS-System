/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
        color: {
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
        tickets: {
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
            50: '#F6F6F6',
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
  plugins: []
}
