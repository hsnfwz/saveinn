const express = require('express');
const pool = require('../pg');

const router = express.Router();

router.get('/', async (req, res) => {
  const poolQuery = 'SELECT * FROM budget_member';
  
  const { rows } = await pool.query(poolQuery);

  res.json({ rows });
});

router.get('/:id', async (req, res) => {
  res.json({ message: 'GET id request' });
});

router.post('/', async (req, res) => {
  const { firstName, lastName } = req.body;

  const poolQuery = 'INSERT INTO budget_member (firstName, lastName) VALUES ($1, $2)';

  const { rows } = await pool.query(poolQuery, [firstName, lastName]);

  res.json({ rows });
});

router.put('/:id', async (req, res) => {
  res.json({ message: 'PUT request' });
});

router.delete('/:id', async (req, res) => {
  res.json({ message: 'DELETE request' });
});

router.all('*', async (req, res) => {
  res.json({ message: '404 Not Found' });
});

module.exports = router;




// app.get('/', (req, res) => {
//   res.render('pages/home');
// });

// app.get('/rectangles', (req, res) => {
//   const poolQuery = 'SELECT * FROM rectangle';

//   pool.query(poolQuery, (err, result) => {
//     if (err) console.log(err);
//     else res.render('pages/rectangles', { rows: result.rows });
//   });
// });

// app.get('/rectangles/:id', (req, res) => {
//   const id = req.params.id;

//   if (!isNaN(id)) {
//     const poolQuery = `SELECT * FROM rectangle WHERE id='${id}'`;

//     pool.query(poolQuery, (err, result) => {
//       if (err) console.log(err);
//       else if (result.rows.length === 0) res.render('pages/error');
//       else if (result.rows.length > 0) res.render('pages/rectangle', { row: result.rows[0] });
//     });
//   } else {
//     res.render('pages/error');
//   }
// });

// app.get('/add-rectangle', (req, res) => {
//   res.render('pages/addRectangle');
// });

// app.post('/add-rectangle', (req, res) => {
//   const { name, color, width, height } = req.body;

//   const poolQuery = `INSERT INTO rectangle (name, color, width, height) VALUES ('${name}', '${color.toLowerCase()}', '${width}', '${height}')`;

//   pool.query(poolQuery, (err, result) => {
//     if (err) console.log(err);
//     else res.redirect('/add-rectangle');
//   });
// });

// app.post('/rectangles/:id/update', (req, res) => {
//   const id = req.params.id;

//   if (!isNaN(id)) {
//     const { name, color, width, height } = req.body;

//     const poolQuery = `UPDATE rectangle SET (name, color, width, height) = ('${name}', '${color.toLowerCase()}', '${width}','${height}') WHERE id='${id}'`;
  
//     pool.query(poolQuery, (err, result) => {
//       if (err) console.log(err);
//       else res.redirect(`/rectangles/${id}`);
//     });
//   } else {
//     res.render('pages/error');
//   }
// });

// app.get('/rectangles/:id/delete', (req, res) => {
//   const id = req.params.id;

//   if (!isNaN(id)) {
//     const poolQuery = `DELETE FROM rectangle WHERE id='${id}'`;

//     pool.query(poolQuery, (err, result) => {
//       if (err) console.log(err);
//       else res.redirect('/rectangles');
//     });
//   } else {
//     res.render('pages/error');
//   }
// });

// app.get('*', (req, res) => {
//   res.render('pages/error');
// });