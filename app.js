const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema.js');

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
