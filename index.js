const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Привет, Октагон!</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
