module.exports = {
  port: 8000,
  files: [
    './**/*.{html,css,js,png,jpg}'
  ],
  server: {
    baseDir: './',
    middleware: {
      0: null // removes default 'connect-logger' middleware
    }
  },
  logLevel: 'silent'
};
