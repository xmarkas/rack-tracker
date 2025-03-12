interface ImportMetaEnv {
    readonly VITE_GID: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }