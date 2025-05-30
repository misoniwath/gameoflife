import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/gameoflife/",
});
console.log("Vite configuration loaded.");
console.log("Plugins:", [react()]);
console.log("Base URL:", "/gameoflife/");