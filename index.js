require = require("esm")(module)
const [ request ] = process.argv.filter((value, i) => i !== 1 && i !== 0)

module.exports = require(`./${request}`)