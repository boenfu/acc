import reactRefresh from '@vitejs/plugin-react-refresh';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: '/app/',
  resolve: {
    alias: [
      {
        find: 'socket.io-client',
        replacement: 'socket.io-client/dist/socket.io.js',
      },
      {
        find: 'protobufjs',
        replacement: 'protobufjs/dist/protobuf.min.js',
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#5151d6',
        },
        javascriptEnabled: true,
      },
    },
  },
});
