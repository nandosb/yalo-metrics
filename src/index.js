const metrics = require('datadog-metrics')
const os = require("os")
const packagejsonFinder = require('find-package-json')

const _finder = packagejsonFinder()
const _packagejson = _finder.next().value

const _dd_api_key = process.env.DATADOG_API_KEY || ''

const _buildCommonProperties = () => {
    const environment = process.env.NODE_ENV || process.env.ENV || 'local'
    const service = _packagejson.name
    const defaultTags = ['env:' + environment,'service:' + service]

    return {
        defaultTags
    }
}

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
        const props = _buildCommonProperties()
        metrics.increment(name,increment,[...props.defaultTags, ...customTags])
    }
}

const gauge = (name, value, customTags = []) => {
    if (_dd_api_key) {
        const props = _buildCommonProperties()
        metrics.gauge(name,value,[...props.defaultTags, ...customTags])
    }
}

const histogram = (name, value, customTags = []) => {
    if (_dd_api_key) {
        const props = _buildCommonProperties()
        metrics.histogram(name,value,[...props.defaultTags, ...customTags])
    }
}

module.exports = {
    init,
    counter,
    gauge,
    histogram,
}
