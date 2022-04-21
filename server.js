global.__rootdir = __dirname
const PORT = process.env.PORT || 3000

import { join } from 'path'
import express from 'express'
import { sequelize, sessionCreated, hbs } from "./lib/config";

import controllers from './controllers'

const app = express()

const setStaticPath = (path) => express.static(join(__rootdir, 'public', 'assets', path))

app.use(sessionCreated)
  .engine('hbs', hbs.engine)
  .set('view engine', 'hbs')
  .set('views', './views/pages')
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/webfonts', setStaticPath('webfonts'))
  .use('/images', setStaticPath('images'))
  .use('/js', setStaticPath('javascript'))
  .use('/css', setStaticPath('stylesheets'))
  .use('/', controllers)

sequelize.sync({ force: false, logging: false })
  .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))