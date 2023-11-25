const ValidationMiddleware
    = require('../common/middlewares/validation.middleware');
const SearchController = require('./controllers/search.controller');

exports.routesConfig = function(app) {
  app.post('/search', [
    ValidationMiddleware.validateSearch,
    SearchController.search,
  ]);
};
