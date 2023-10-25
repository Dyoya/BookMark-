import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from "cors"

import dbconf from "./conf/auth.js"

const app = express()
const port = 3010

//const db = mysql.createConnection(dbconf)
const db = mysql.createConnection({
    host: 'localhost',
	user: 'root',
	password: 'min0539',
	database: 'bookdb'
})

db.connect()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({result: "success"})
})

// 베스트셀러 조회
app.get('/book/main', (req, res) => {
  const sql = 'SELECT books.id, name, title, author, publication_date, rating FROM books \
	LEFT JOIN bookgenre ON books.id = bookgenre.book_id \
	LEFT JOIN genre ON genre.id = bookgenre.genre_id \
	WHERE books.bestseller IS TRUE;'

	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

//장르 목록
app.get('/book/genre', (req, res) => {
  const sql = 'SELECT name FROM genre;'

	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

// 선택
app.get('/book/select', (req, res) => {
	const sql = `SELECT * FROM books WHERE id = ?`
	
	db.query(sql, [req.query.id], (err, rows) => {
		if (err) {
			res.json({result: 'errer'})
			return console.log(err)
		}
		res.json(rows)
	})
})

//추천 목록
app.get('/book/recommend', (req, res) => {
  const sql = 'SELECT recobook.id, nickname, books.title, books.author, contents, delete_password FROM recobook \
    LEFT JOIN books ON books.id = recobook.book_id \
    WHERE books.bestseller IS FALSE;'

	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

// 추천 목록 삽입
app.post('/book/recommend/insert', (req, res) => {
	const sql1 = 'insert into books (title, author) values (?, ?);'
	const sql2 = 'insert into recobook (nickname, contents, delete_password, book_id) \
			select ?, ?, ?, books.id FROM books WHERE title = ?;'
	
	const book = [
		req.body.title,
		req.body.authorName
	]
	
	const recobook = [
		req.body.nickname,
		req.body.content,
		req.body.password,
		req.body.title
	]
	
	db.query(sql1, book, (err, rows) => {
		if (err) {
			res.json({result: 'errer'})
			return console.log(err)
		}
		
		db.query(sql2, recobook, (err, rows) => {
		if (err) {
			res.json({result: 'errer'})
			return console.log(err)
		}
		res.json(rows)
		})
	})
})

// 추천 목록 삭제
app.post('/book/recommend/delete', (req, res) => {
  const { id, password } = req.body;
  const sqlFindPassword = 'SELECT delete_password FROM recobook WHERE id = ?';
  const sqlDelete = 'DELETE FROM recobook WHERE id = ?';
	
  const recobook = [
	  req.body.id,
	  req.body.password
  ]
  // 비밀번호 확인
  db.query(sqlFindPassword, [id], (err, rows) => {
    if (err) {
      res.json({result: 'error'});
      return console.log(err);
    }
	  
    // id에 해당하는 패스워드 찾기
    if (rows.length && rows[0].delete_password === password) {
      // 패스워드 일치 시, 데이터 삭제
      db.query(sqlDelete, [id], (err, rows) => {
        if (err) {
          res.json({result: 'error'});
          return console.log(err);
        }
        res.json({result: 'success'});
      });
    } 
	else {
        res.json({result: 'passwordError'})
    }
  });
});

app.listen(port, () => {
  console.log(`서버 실행됨 (port ${port})`)
})