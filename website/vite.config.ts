// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss";

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     host: "0.0.0.0",
//     port: 5173,
//   },

//   plugins: [react()],
//   optimizeDeps: {
//     include: ["date-fns", "@mui/x-date-pickers"],
//   },
//   css: {
//     postcss: {
//       plugins: [tailwindcss()],
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["date-fns", "@mui/x-date-pickers"],
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: "dist",
  },
});
