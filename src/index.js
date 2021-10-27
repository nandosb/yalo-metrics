const ddMetrics = require('datadog-metrics')
const os = require("os")
const packagejsonFinder = require('find-package-json')

const _finder = packagejsonFinder()
const _packagejson = _finder.next().value

const _dd_api_key = process.env.DATADOG_API_KEY || ''

/** 
* Build common properties for all metrics
* @return {object} Common elements used in all metrics
*/
const _buildCommonProperties = () => {
    const environment = process.env.NODE_ENV || process.env.ENV || 'no-environment-set'
    const service = _packagejson.name
    const defaultTags = ['env:' + environment,'service:' + service]

    return {
        defaultTags
    }
}

/** 
* Initialize the agent. Define host name and service prefix.
*/
const init = () => {
    if (_dd_api_key) {
        const dd_parameters = {
            host: os.hostname(),
            prefix: _packagejson.name + '.'
        }

        console.info('Initializing DD metrics', dd_parameters)

        ddMetrics.init(dd_parameters)
    } else {
        console.warn("DATADOG_API_KEY env var is empty or doesn't exist. Metrics are disabled")
    }
}

/** 
* Metric type counter
* @param {string} name - Unique name for this metric
* @param {integer} increment - Quantity to increase the counter. Default 1 
* @param {array} customTags - List of tags(strings) in the format `key:value`
*/
const counter = (name, increment = 1, customTags = []) => {
    if (_dd_api_key) {
        const props = _buildCommonProperties()
        ddMetrics.increment(name,increment,[...props.defaultTags, ...customTags])
    }
}

/** 
* Metric type gauge
* @param {string} name - Unique name for this metric
* @param {float} value - Current value
* @param {array} customTags - List of tags(strings) in the format `key:value`
*/
const gauge = (name, value, customTags = []) => {
    if (_dd_api_key) {
        const props = _buildCommonProperties()
        ddMetrics.gauge(name,value,[...props.defaultTags, ...customTags])
    }
}

/** 
* Metric type histogram
* @param {string} name - Unique name for this metric
* @param {float} value - Current value
* @param {array} customTags - List of tags(strings) in the format `key:value`
*/
const histogram = (name, value, customTags = []) => {
    if (_dd_api_key) {
        const props = _buildCommonProperties()
        ddMetrics.histogram(name,value,[...props.defaultTags, ...customTags])
    }
}

module.exports = {
    init,
    counter,
    gauge,
    histogram,
}