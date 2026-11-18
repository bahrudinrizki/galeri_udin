const jwt = require('jsonwebtoken')
const kataRahasia = 'inirahasiakita'

const authJWT = (req, res, next) => {
  const header = req.header('Authorization')
  if (!header) return res.sendStatus(401)
  const token = header.split(' ')[1]
  jwt.verify(token, kataRahasia, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.sendStatus(403)
  next()
}

authJWT.isAdmin = isAdmin
module.exports = authJWT