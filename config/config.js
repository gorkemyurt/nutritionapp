/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/nutritionapp'
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/nutritionapp'
  },
  staging: {
    root: rootPath,
    db: 'mongodb://heroku_app18100548:eqcjc5ris9praogb1p5r7lasn1@ds043378.mongolab.com:43378/heroku_app18100548'
  },
  production: {
    root: rootPath,
    db: 'mongodb://heroku_app18100548:eqcjc5ris9praogb1p5r7lasn1@ds043378.mongolab.com:43378/heroku_app18100548'
  }
}