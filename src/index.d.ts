/**
 * Initialize YaloMetrics
 *
 * @returns {void}
 */
 export declare function init(): void

 /**
  * Report a counter
  *
  * @param {string} name Metric name.
  * @param {number} increment Increment by. One by default.
  * @param {Array<string>} tags Any other extra tags you want to add. See "tags" in Datadog.
  * @returns {void} Registers a counter.
  */
 export declare function counter(name: string, increment: number, customTags: Array<string>): void

 /**
  * Report a gauge
  *
  * @param {string} name Metric name.
  * @param {number} value value for the metric.
  * @param {Array<string>} tags Any other extra tags you want to add. See "tags" in Datadog.
  * @returns {void} Registers a counter
  */
  export declare function gauge(name: string, value: number, customTags: Array<string>): void

  /**
  * Report an histogram
  *
  * @param {string} name Metric name.
  * @param {number} value value for the metric.
  * @param {Array<string>} tags Any other extra tags you want to add. See "tags" in Datadog.
  * @returns {void} Registers a counter
  */
   export declare function histogram(name: string, value: number, customTags: Array<string>): void