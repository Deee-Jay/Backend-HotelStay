//we can use this to start path from home not go back and choose
const path = require("path");

module.exports = path.dirname(require.main.filename);