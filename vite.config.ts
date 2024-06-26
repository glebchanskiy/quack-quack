import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
	// 	minify: 'terser',
  //   terserOptions: {
  //     // keep_classnames: true,
  //     keep_fnames: true,
  //   }
	// },
  plugins: [preact()],
})

// export default defineConfig({
// 	build: {
// 		minify: 'terser',
//     terserOptions: {
//       // keep_classnames: true,
//       keep_fnames: true,
//       mangle: {
//         // Пример аннотации, указывающей Terser сохранить имя функции "sc"
//         properties: {
//           keep_quoted: true,
//           reserved: reserved,
// 										regex: /^sc/
//         }
//       }
//     }
// 	},
// 	server: {
// 		watch: {
// 		  usePolling: true,
// 		},
// 		host: true, // needed for the Docker Container port mapping to work
// 		strictPort: true,
// 		port: 3000,
// 	},
// 	plugins: [
// 		preact(),
// 		viteSingleFile(),
// 	],
// });