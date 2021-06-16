export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css',
    'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/route',
    '~/plugins/lottie-player',
    '~plugins/mask.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios settings
  axios: {
    baseURL: 'https://njs-lms-api.herokuapp.com/api/'
  },

  auth: {
    redirect: {
      home: '/dashboard/cursos',
      logout: '/admin/login'
    },
    strategies: {
      admin: {
        _scheme: 'local',
        endpoints: {
          login: { url: 'auth/adm', method: 'post'},
          user: false,
        }
      },
      student: {
        _scheme: 'local',
        endpoints: {
          login: { url: 'auth/student', method: 'post'},
          user: false,
          logout: '/login'
        }
      },
    },
  },

  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'Login Administrador',
        path: '/admin/login',
        component: resolve(__dirname, 'pages/login.vue')
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
