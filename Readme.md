# Yalo Metrics JS

## Purpose

This project intents to wrap datadog-metrics in such a way it creates a uniform and consistent way to report metrics to Datadog

## Installation

In your `package.json` file

```
"@engyalo/yalo-metrics": "^1.1.5"
```

Configure the following environment variables:
- NODE_ENV (or ENV)
- DATADOG_API_KEY (or DD_API_KEY)

if DATADOG_API_KEY (or DD_API_KEY) is not set, you'll a message in the standard output warning you that metrics will be disabled
if NODE_ENV (or ENV), it will default to _no-environment-set_

By default yalo-metrics will report two tags along with your metrics:
- env
- service 

*env* will come from NODE_ENV (or ENV) enviroment variables

*service* will automatically take the name of the service from the `package.json` file of your project

Then, run the following to initialize the library.

```
const yaloMetrics = require('yalo-metrics')
yaloMetrics.init()
```

## Components

### Counters

Used to count events (ie: requests, queries to a databases, calls to other services, etc.)

#### Usage

```
yaloMetrics.counter('your_metric_name_goes_here', [increment], [tags])
```


### Gauges

Used to keep track of measures (ie: CPU usage, Memory, Network used bandwith, etc). It will only report the last value reported during the flush interval.

#### Usage

```
yaloMetrics.gauge('your_metric_name_goes_here', value, [tags])
```

### Histograms

Used to keep track of measures (ie: CPU usage, Memory, Network used bandwith, etc). Unlike gauges, histogram will use all data during the flush time to compile and report more robust metrics like min, max, avg, percentile 95th, percentile 99th using the data collected

#### Usage

```
yaloMetrics.histogram('your_metric_name_goes_here', value, [tags])
```