import axios from 'axios'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'concesionaria',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet',href:'https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://strapi-backend-concesionaria.herokuapp.com/graphql',
      },
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/apollo',
    '@nuxtjs/axios',
  ],
  axios:{

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://strapi-backend-concesionaria.herokuapp.com',
    stripe_key:"pk_test_51KbDh5LcrhAuEwlWTbDIctfiqwlrBMcSnCrfKwEggXa38WI1RAS621VZPXWFuse2e3pb5yIRRTZFzAucbyMeJiXJ00lUsJylT4"
  },
   generate:{
    routes: async function(){
      return axios.get(`https://strapi-backend-concesionaria.herokuapp.com/vehiculoanios`).then(response=>{
        let products_page= response.data.map(e=>{
          return '/products/'+e.id
        })
        let products_mian_page= response.data.map(e=>{
          return '/products/'+e.id+'/personalizar/main'
        })
        let products_potencia_page= response.data.map(e=>{
          return '/products/'+e.id+'/personalizar/potencia'
        })
        let products_paquetes_page= response.data.map(e=>{
          return '/products/'+e.id+'/personalizar/paquetes'
        })
        let products_accesorios_page= response.data.map(e=>{
          return '/products/'+e.id+'/personalizar/accesorios'
        })
        let products_resumen_page= response.data.map(e=>{
          return '/products/resumen/'+e.id
        })
        let products_comprar_page= response.data.map(e=>{
          return '/products/comprar/'+e.id
        })
        return [...products_page, ...products_mian_page, ...products_potencia_page, ...products_paquetes_page, ...products_accesorios_page,...products_resumen_page, ...products_comprar_page]
      })
      
    }
   }
}

