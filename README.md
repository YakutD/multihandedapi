# multihandedapi

For install a package use command ```npm i multihandedapi```

Example with use ```express``` and ```express-graphql``` :
```
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('multihandedapi');

let port = 3000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: false
}));

app.listen(port);
```

Package supports next API:  openweathermap.org, min-api.cryptocompare.com, restcountries.eu, ip-api.com, last.fm .
You can get more detailed documentation by connecting to the GraphQL server, with the ```multihandedapi``` schema .
