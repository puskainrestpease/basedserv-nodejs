const express = require('express');
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ChatBotTests',
});

db.connect(err => {
  if (err) {
      console.error('Ошибка подключения к БД:', err);
      process.exit(1);
  } else {
      console.log('Подключение к БД успешно!');
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS Items (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              \`desc\` TEXT NOT NULL
          )
      `;
      db.query(createTableQuery, err => {
          if (err) {
              console.error('Ошибка при создании таблицы:', err);
          } else {
              console.log('Таблица проверена или создана.');
          }
      });
  }
});


app.post('/deleteItem', (req, res) => {
  const { id } = req.query;

  if (!id || isNaN(id)) {
      return res.json(null);
  }

  const query = 'DELETE FROM Items WHERE id = ?';
  db.query(query, [id], (err, result) => {
      if (err || result.affectedRows === 0) {
          res.json({});
      } else {
          res.json({ success: true });
      }
  });
});

app.post('/updateItem', (req, res) => {
  const { id, name, desc } = req.query;

  if (!id || isNaN(id) || !name || !desc) {
      return res.json(null);
  }

  const query = 'UPDATE Items SET name = ?, `desc` = ? WHERE id = ?';
  db.query(query, [name, desc, id], (err, result) => {
      if (err || result.affectedRows === 0) {
          res.json({});
      } else {
          res.json({ id, name, desc });
      }
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Привет, Октагон!</h1>');
});

app.get('/static', (req, res) => {
  res.json({ header: "Hello", body: "Octagon NodeJS Test" });
});

app.get('/dynamic', (req, res) => {
  const { a, b, c } = req.query;

  if (!a || !b || !c || isNaN(a) || isNaN(b) || isNaN(c)) {
    return res.json({ header: "Error" });
  }
  const result = (a * b * c) / 3;
  res.json({ header: "Calculated", body: result.toString() });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
