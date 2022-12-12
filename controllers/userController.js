const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// generate JWT

const generateJwt = (id, isCompany, company, fullName, email) => {
  return jwt.sign(
    {id, isCompany, company, fullName, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

// user controller

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
  
    const user = await User.findOne({where: {email}})

    if (!user) {
      return res.status(500).json({message: "Пользователя с таким e-mail не существует"})
    }

    const comparePassword = bcrypt.compareSync(password, user.password)
    
    if (!comparePassword) {
      return res.status(500).json({message: "Неверный пароль"})
    }

    const token = generateJwt(user.id, user.isCompany, user.company, user.fullName, user.email);

    return res.json(token)
  }

  async registration(req, res) {
    const { email, password, isCompany, company, fullName } = req.body;

    const candidate = await User.findOne({where: {email}})

    if (candidate) {
      return res.status(409).json({message: "Данный e-mail уже зарегестрирован"})
    }

    const hashPassword = await bcrypt.hash(password, 3)

    const user = await User.create({email, password: hashPassword, isCompany, company, fullName})

    const token = generateJwt(user.id, user.isCompany, user.company, user.fullName, user.email);

    return res.json(token)
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.isCompany, req.user.company, req.user.fullName, req.user.email);
    
    return res.json(token)
  }
}

module.exports = new UserController