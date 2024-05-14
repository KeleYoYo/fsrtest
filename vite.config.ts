import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '#',
        replacement: resolve(__dirname, 'types')
      }
    ]
  },
  //antd样式不生效的解决方案
  css:{
    modules:false
  },
    server: {
        open: false,
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                ws: false,
                changeOrigin: true,
            },
        }
    },
})
