import Util from './util';

let resolvePerformanceResource = resourceData => {
  let r = resourceData;
  // debugger;
  let o = {
    initiatorType: r.initiatorType,
    name: r.name,
    duration: parseInt(r.duration),
    redirect: r.redirectEnd - r.redirectStart,
    dns: r.domainLookupEnd - r.domainLookupStart,
    connect: r.connectEnd - r.connectStart,
    network: r.connectEnd - r.startTime,
    send: r.responseStart - r.requestStart,
    request: r.responseEnd - r.responseStart,

    ttfb: r.responseStart - r.requestStart
  };
  return o;
};

let resolveEntries = entries => entries.map(_ => resolvePerformanceResource(_));

export default {
  init: cb => {
    if (window.PerformanceObserver) {
      let observer = new window.PerformanceObserver(list => {
        try {
          let entries = list.getEntries();
          let entriesData = resolveEntries(entries);
          cb(entriesData)
        } catch (e) {
          console.log(e);
        }
      });
      observer.observe({
        entryTypes: ['resource']
      });
    } else {
      Util.onload(() => {
        let entries = performance.getEntriesByType('resource');
        let entriesData = resolveEntries(entries);
        // let d = resolvePerformanceResource(entriesData);
        cb(entriesData);
      });
    }
  }
};
