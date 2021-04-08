const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('hello server');
})

app.listen(PORT, () => {
  console.log('server started')
});