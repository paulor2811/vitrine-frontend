const config = {
  env:           import.meta.env.VITE_APP_ENV as string,
  apiUrl:        import.meta.env.VITE_API_URL as string,
  appUrl:        import.meta.env.VITE_APP_URL as string,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  metaPixelId:   import.meta.env.VITE_META_PIXEL_ID as string,
  isProduction:  import.meta.env.VITE_APP_ENV === 'production',
} as const;

export default config;
