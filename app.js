const express = require("express");
const app = express();
const port = 3000;

const SearchRoutes = require('./src/search/routes.config')

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Log Searcher app is running");
});
//Add routes
SearchRoutes.routesConfig(app);

app.listen(port, () => {
  console.log(`Log Searcher app listening on port ${port}`);
});
