

const express = require('express');
const routes = require('./routes/routes');


const app = express();

app.use(express.json());
app.use('/api', routes);

const bodyParser = require("body-parser");
app.use(bodyParser.json());


const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})