const withWorkers = require('@zeit/next-workers')
const withTypeScript = require('@zeit/next-typescript')
module.exports = withTypeScript( withWorkers({ } ));