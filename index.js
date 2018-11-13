const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'restapi'
})

// Express 4.16.0 부터 body-parser가 express에 내장 추가됨.
// https://github.com/expressjs/express/releases/tag/4.16.0

app.use(express.json())

app.get('/', (req, res) => {
  res.send(req)
})

app.get('/user', (req, res) => {
  const QUERY = `SELECT * FROM USERS`
  db.query(QUERY, (err, result) => {
    if (err) res.status(400).send(err)
    res.send(result)
  })
})

app.get('/user/:id', (req, res) => {
  const QUERY = `SELECT * FROM USERS WHERE ?`
  db.query(QUERY, req.params, (err, result) => {
    if (err) res.status(400).send(err)
    res.send(result)
  })
})

app.post('/user', (req, res) => {
  const QUERY = `INSERT INTO USERS set ?`
  db.query(QUERY, req.body, (err, result) => {
    if (err) res.status(400).send(err)
    res.send(result)
  })
})

// Foreign key option -> CASCADE
app.delete('/user/:id', (req, res) => {
  const QUERY = `DELETE FROM USERS WHERE ?`
  db.query(QUERY, req.params, (err, result) => {
    if (err) res.status(400).send(err)
    res.send(result)
  })
})

app.put('/user/:id', (req, res) => {
  const QUERY = `UPDATE USERS SET ? WHERE ?`
  db.query(QUERY, [req.body, req.params], (err, result) => {
    if (err) res.status(400).send(err)
    res.send(result)
  })
})

app.listen(3000, () => {
  console.log('listening in 3000')
})
