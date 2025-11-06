import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

// export default defineConfig(({ mode }) => {
//   const env = { ...process.env, ...loadEnv(mode, process.cwd(), 'VITE_') };
//   return {
//     plugins: [react(), tailwindcss()],
//     build:{
//       sourcemap: env.VITE_GENERATE_SOURCEMAP === 'true',
//       rollupOptions:{
//         output:{
//           formart : 'es',
//           globals : {
//             react: "React",
//             "react-dom":"ReactDOM"
//           },
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           manualChunks(id:any){
//             if(/projectEnvVariables.ts/.test(id)){
//               return "projectEnvVariables";
//             }
//           }
//         }
//       },
//     },
//   };
// });


export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "VITE_") };

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: env.VITE_GENERATE_SOURCEMAP === "true",
      rollupOptions: {
        output: {
          format: "es",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          manualChunks(id: any) {
            if (/projectEnvVariables\.ts/.test(id)) {
              return "projectEnvVariables";
            }
          },
        },
      },
    },
  };
});