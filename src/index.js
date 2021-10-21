const metrics = require('datadog-metrics')
const os = require("os")
const packagejsonFinder = require('find-package-json')

module.exports = function YaloMetrics () {
    const _finder = packagejsonFinder(__dirname)
    const _packagejson = _finder.next().value

    console.log("package.json", _packagejson)

    const _dd_api_key = process.env.DATADOG_API_KEY || ''
    
    const init = () => {
        if (_dd_api_key) {
            const dd_parameters = {
                host: os.hostname(),
                prefix: _packagejson.name + '.'
            }
    
            console.info('Initializing DD metrics', dd_parameters)
    
            metrics.init(dd_parameters)
        } else {
            console.warn("DATADOG_API_KEY env var is empty or doesn't exist. Metrics are disabled")
        }
    }
    
    const counter = (name, increment = 1, customTags = []) => {
        
        if (_dd_api_key) {
            const environment = process.env.NODE_ENV || 'local'
            const service = _packagejson.name
            const defaultTags = ['env:' + environment,'service:' + service]
            metrics.increment(name,increment,[...defaultTags, ...customTags])
        }
    }
}
