import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8'
    },
    alias: {
      "@src/*": "./src/*",
      "@entity/*": "./src/entity/*",
      "@repository/*": "./src/repository/*",
      "@useCase/*": "./src/useCase/*",
      "@routes/*": "./src/routes/*",
      "@utils/*": "./src/utils/*"
    }
  },
  plugins: [tsconfigPaths()],
})