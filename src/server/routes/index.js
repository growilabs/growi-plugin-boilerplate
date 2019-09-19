module.exports = (crowi, app) => {
  // add routes
  app.use('/_api/plugin/bar', require('./bar')(crowi, app));
};
