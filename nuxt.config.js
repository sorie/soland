import { resolve } from 'path'

module.exports = {
  publicPath: '/List',
  mode: 'universal',
  
  devServer: {
    port: 5000,
    host: 'localhost',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { hid: 'robots', name: 'robots', content: 'index' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/xx.ico' } 
    ]
  },

  alias: {
    'style': resolve(__dirname, './assets/style')
  },
  
	build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
	generate: {
    dir: '../docs', // instead of dist/
    // subFolders: false // HTML files are generated according to the route path
  }
}
