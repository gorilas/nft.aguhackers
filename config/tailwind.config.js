const colors = require('tailwindcss/colors');

module.exports = {
  /* Use the Desy default config */
  presets: [require('desy-frontend/config/tailwind.config.js')],
  /* Change PurgeCSS files to add DESY AND this project's files */
  purge: {
    content: ['./node_modules/desy-frontend/src/**/*.html',
              './node_modules/desy-frontend/src/**/*.njk',
              './src/**/*.html',
              './src/**/*.njk'
              ],
    options: {
      safelist: [
                  'has-offcanvas-open',
                  'has-dialog',
                  'dialog-backdrop',
                  'dialog-backdrop.active',
                  'focus',
                  'dev'
                  ],
    }
  },
  theme: {
    extend: {
      colors: {
        black: '#6B7280',
        agured: '#F24B1B',
        agurose: '#EDA9C4',
        agublue: '#549ECF',
        aguyellow: '#E7B229',
        agugreen: '#3FA535',
        agugreendark: '#064A10',
        neutral: {
          'dark': '#111827',
          'base': '#6B7280',
          'light': '#E5E7EB',
          'lighter': '#F9FAFB',
        },
        primary: {
          'base': '#549ECF',
          'light': '#9DD0E8',
          'dark': '#355b8d',
        }
      },
    },
  },
  variants: {
    extend: {
      accessibility: ['group-hover'],
    }
  }
}
