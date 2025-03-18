interface ImportMetaEnv {
    readonly VITE_ATN_GID: string,
    readonly VITE_PCI_GID: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }