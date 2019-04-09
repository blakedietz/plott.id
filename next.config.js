const withWorkers = require('@zeit/next-workers')
const withTypeScript = require('@zeit/next-typescript')
module.exports = withTypeScript(
    withWorkers({
            target: "serverless",
            webpack: (config, options) => {
                // This is required in order to use the withWorkers plugin with next. See https://github.com/webpack/webpack/issues/6642
                config.output.globalObject = 'this';
                return config;
            }
        }
    ));