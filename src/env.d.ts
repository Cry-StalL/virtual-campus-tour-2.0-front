/// <reference types="vite/client" />

declare module '*.js'
declare module 'js-cookie';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
} 