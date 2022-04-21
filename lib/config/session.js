import session from 'express-session'
import connectSessionSequelize from 'connect-session-sequelize'
import { sequelize } from "./connection";

const SequelizeStore = connectSessionSequelize(session.Store)
const sessionCreated = session({
  secret: 'qq&Vc2USyYqsh6fFJ46d',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  logging: false,
  store: new SequelizeStore({ db: sequelize })
})

export { sessionCreated, sequelize }