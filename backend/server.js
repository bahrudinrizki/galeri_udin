const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken')
const authJWT = require('./middleware')
const isAdmin = authJWT.isAdmin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    const awalFile = Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, awalFile + "-" + file.originalname)
  }
});
const upload = multer({ storage: storage });
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'galeri',
});

db.connect(err => {
  if (err) {
    console.error('gagal koneksi ke database: ', err);
    return;
  }
  console.log('berhasil mlebu cuyy ke mysql');
});


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// hanya pemilik akun (atau admin) yang boleh mengakses /:id_pengguna
const cekPemilikAkun = (req, res, next) => {
  if (String(req.user.id) !== req.params.id_pengguna && req.user.role !== 'admin') {
    return res.sendStatus(403)
  }
  next()
}

// hanya pemilik foto (atau admin) yang boleh mengubah / menghapus foto
const cekPemilikFoto = (req, res, next) => {
  const { id_foto } = req.params
  db.query('select id_pengguna from foto where id_foto = ?', [id_foto], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage })
    if (result.length === 0) return res.status(404).json({ error: "foto tidak ditemukan" })
    if (result[0].id_pengguna !== req.user.id && req.user.role !== 'admin') {
      return res.sendStatus(403)
    }
    next()
  })
}

app.get('/', (req, res) => {
  res.send('ini di endpoint root');
});

app.get('/kategori', authJWT, (req, res) => {
  const sql = 'SELECT * FROM kategori';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  })
})

app.post('/kategori', authJWT, isAdmin, (req, res) => {
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

app.put('/kategori/:id_kategori', authJWT, isAdmin, (req, res) => {
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

app.delete('/kategori/:id_kategori', authJWT, isAdmin, (req, res) => {
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

app.get('/pengguna', authJWT, isAdmin, (req, res) => {
  const sql = 'SELECT id_pengguna, nama, email, no_hp, role FROM pengguna';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  })
})

app.get('/pengguna/:id_pengguna', authJWT, cekPemilikAkun, (req, res) => {
  const { id_pengguna } = req.params
  const sql = 'SELECT id_pengguna, nama, email, no_hp, role FROM pengguna where id_pengguna=?';
  db.query(sql, [id_pengguna], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  })
})

app.delete('/pengguna/:id_pengguna', authJWT, isAdmin, (req, res) => {
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

app.put('/pengguna/:id_pengguna', authJWT, cekPemilikAkun, async (req, res) => {
  const { nama, email, password, no_hp } = req.body;
  const { id_pengguna } = req.params;
  try {
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      const sql = 'UPDATE pengguna SET nama = ?, email = ?, password = ?, no_hp = ? WHERE id_pengguna =?';
      db.query(sql, [nama, email, hashPassword, no_hp, id_pengguna], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        if (result.affectedRows == 0) return res.status(404).json({ error: "id pengguna tidak ditemukan" })
        res.send('data pengguna berhasil diubah')
      })
    } else {
      const sql = 'UPDATE pengguna SET nama =?, email=?, no_hp=? where id_pengguna =?'
      db.query(sql, [nama, email, no_hp, id_pengguna], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage })
        if (result.affectedRows == 0) return res.status(404).json({ error: "id pengguna tidak ditemukan" })
        res.send('data pengguna berhasil diubah')
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/foto', authJWT, (req, res) => {
  const sql = 'SELECT * FROM foto';
  db.query(sql, (salah, hasil) => {
    if (salah) return res.status(500).json({ error: salah });
    res.json(hasil);
  });
});

app.get('/foto/:id_pengguna', authJWT, cekPemilikAkun, (req, res) => {
  const { id_pengguna } = req.params
  const sql = 'SELECT a.id_foto,a.judul,a.deskripsi,a.tgl_unggah,a.nama_file,a.id_kategori,b.nama_kategori,c.nama from foto a left join kategori b on a.id_kategori=b.id_kategori join pengguna c on a.id_pengguna=c.id_pengguna where a.id_pengguna =?';
  db.query(sql, [id_pengguna], (salah, hasil) => {
    if (salah) return res.status(500).json({ error: salah.sqlMessage });
    res.json(hasil);
  });
});

app.delete('/foto/:id_foto', authJWT, cekPemilikFoto, (req, res) => {
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

app.post("/foto", authJWT, upload.single("file"), async (req, res) => {
  const { judul, deskripsi, id_kategori } = req.body
  const id_pengguna = req.user.id
  const nama_file = req.file ? req.file.filename : null
  if (!judul || !nama_file) {
    return res.status(400).json({ message: "judul dan foto wajib diisi" })
  }

  try {
    const sql = 'insert into foto(judul, deskripsi, nama_file, id_pengguna, id_kategori, tgl_unggah) values (?,?,?,?,?,now())'
    db.query(sql, [judul, deskripsi, nama_file, id_pengguna, id_kategori || null], (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({
        message: "gambar berhasil dimasukkan", id_foto: result.insertId
      })
    })
  } catch (error) {
    res.status(500).json({ error: "gagal insert" })
  }
})


app.put("/foto/:id_foto", authJWT, cekPemilikFoto, upload.single("file"), async (req, res) => {
  const { judul, deskripsi, id_kategori } = req.body
  const { id_foto } = req.params;
  const nama_file = req.file ? req.file.filename : null
  if (!judul) {
    return res.status(400).json({ message: "judul wajib diisi" })
  }
  try {
    if (nama_file == null) {
      const sql = 'update foto set judul = ?, deskripsi = ?, id_kategori = ?, tgl_unggah = now() where id_foto=?';
      db.query(sql, [judul, deskripsi, id_kategori || null, id_foto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "foto tidak ditemukan" })
        else {
          res.json({
            message: "gambar berhasil diupdate", id_foto: id_foto
          })
        }
      })
    } else {
      const sql = 'update foto set judul = ?, deskripsi = ?, nama_file= ?, id_kategori = ?, tgl_unggah = now() where id_foto = ?';
      db.query(sql, [judul, deskripsi, nama_file, id_kategori || null, id_foto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "foto tidak ditemukan" })
        else {
          res.json({
            message: "gambar berhasil di update", id_foto: id_foto
          })
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: "gagal update" })
  }
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const sql = 'select * from pengguna where email=?'
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.length == 0) {
      return res.status(404).json({ message: 'email tidak ditemukan' })
    }
    const user = result[0]
    const passwordValid = bcrypt.compareSync(password, user.password)
    if (!passwordValid) {
      return res.status(401).json({ message: 'password salah' })
    }
    const token = jsonwebtoken.sign({id: user.id_pengguna, role: user.role}, authJWT.kataRahasia, { expiresIn: 86400 })
    res.status(200).json({
      auth: true,
      token,
      id_pengguna: user.id_pengguna,
      role: user.role
    })
  })
})

app.listen(port, () => {
  console.log(`berjalan di http://localhost:${port}`);
});