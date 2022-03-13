module.exports = {
    theme: {
        extend: {
            zIndex: {
              '10001': '10001',
            }
          }
    },
    variants: {
        extend: {
            borderStyle: ['responsive', 'hover'],
            borderWidth: ['responsive', 'hover', 'active'],
            borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'active'],
            borderRadius: ['responsive', 'hover', 'active'],
            padding:["hover"]
            },
    },
    plugins: [],
      purge: []
  }