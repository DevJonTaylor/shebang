import { create } from 'express-handlebars'

export const hbs = create({
  partialsDir: './views/partials',
  extname: 'hbs',
  layoutsDir: './views/layout'
})