const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'galeri',
});

db.connect(err => {
  if (err) {
    console.error('gagal koneksi ke database: ', err);
  }
  console.log('berhasil mlebu cuyy ke mysql');
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('ini di endpoint root');
});

app.get('/kategori', (req, res) => {
  const sql = 'SELECT * FROM kategori';
  db.query(sql, (salah, hasil) => {
    if (salah) return res.status(500).json({ error: salah });
    res.json(hasil);
  });
});

app.post('/kategori', (req, res) => {
  const { nama_kategori } = req.body;
  const sql = 'INSERT INTO kategori (nama_kategori) VALUES (?)'
  db.query(sql, [nama_kategori], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({
      message: "kategori berhasil ditambahkan",
      id_kategori: result.insertId,
    })
  });
});

app.put('/kategori/:id_kategori', (req, res) => {
  const { id_kategori } = req.params;
  const { nama_kategori } = req.body;
  const sql = 'UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?';
  db.query(sql, [nama_kategori, id_kategori], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: "kategori tidak ditemukan" })
    else {
      res.json({
        message: "kategori berhasil diubah"
      });
    }
  })
})

app.delete('/kategori/:id_kategori', (req, res) => {
  const { id_kategori } = req.params;
  const sql = 'DELETE FROM kategori WHERE id_kategori =?';
  db.query(sql, [id_kategori], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage })
    if (result.affectedRows === 0) return res.status(404).json({ error: "kategori tidak ditemukan" })
    else {
      res.json({
        message: "kategori berhasil dihapus"
      }
      )
    }
  })
})

app.get('/pengguna', (req, res) => {
  const sql = 'SELECT * FROM pengguna';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  })
})

app.delete('/pengguna/:id_pengguna', (req, res) => {
  const { id_pengguna } = req.params;
  const sql = 'DELETE FROM pengguna WHERE id_pengguna = ?';
  db.query(sql, [id_pengguna], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage })
    if (result.affectedRows === 0) return res.status(404).json({ error: "pengguna tidak ditemukan" })
    else {
      res.json({
        message: "pengguna berhasil dihapus"
      }
      )
    }
  })
})



app.post('/pengguna', async (req, res) => {
  const { nama, email, password, no_hp } = req.body;

  const sql = 'INSERT INTO pengguna (nama, email, password, no_hp) VALUES (?, ?, ?, ?)';
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    db.query(sql, [nama, email, hashPassword, no_hp], (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({
        message: "pengguna berhasil ditambahkan",
        id_pengguna: result.insertId,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/pengguna/:id_pengguna', async (req, res) => {
  const { nama, email, password, no_hp } = req.body;
  const { id_pengguna } = req.params;
  if (password != null) {
    const hashPassword = await bcrypt.hash(password, 10);
    const sql = 'UPDATE pengguna SET nama = ?, email = ?, password = ?, no_hp = ? WHERE id_pengguna =?';
    db.query(sql, [nama, email, hashPassword, no_hp, id_pengguna], (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      if (result.affectedRows == 0) res.status(500).json({ error: "id pengguna tidak ditemukan" })
      else {
        res.send('data pengguna berhasil diubah')
      }
    })
  } else {
    const sql = 'UPDATE pengguna SET nama =?, email=?, no_hp=? where id_pengguna =?'
    db.query(sql, [nama, email, no_hp, id_pengguna], (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage })
      if (result.affectedRows == 0) res.status(500).json({ error: "id pengguna tidak ditemukan" })
      else {
        res.send('data pengguna berhasil diubah')
      }
    })
  }
})

app.get('/foto', (req, res) => {
  const sql = 'SELECT * FROM foto';
  db.query(sql, (salah, hasil) => {
    if (salah) return res.status(500).json({ error: salah });
    res.json(hasil);
  });
});

app.delete('/foto/:id_foto', (req, res) => {
  const { id_foto } = req.params;
  const sql = 'DELETE FROM foto WHERE id_foto = ?';
  db.query(sql, [id_foto], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage })
    if (result.affectedRows === 0) return res.status(404).json({ error: "foto tidak ditemukan" })
    else {
      res.json({
        message: "foto berhasil dihapus"
      }
      )
    }
  })
})


app.listen(port, () => {
  console.log(`berjalan di http://localhost:${port}`);
});