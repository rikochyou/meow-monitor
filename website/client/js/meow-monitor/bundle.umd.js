(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var perform = {
    init: cb => {
      // cb();
      let isDOMReady = false;
      let isOnload = false;
      let Util = {
        getPerfData: p => {
          let data = {
            // network connecting
            prePage: p.fetchStart - p.navigationStart,
            redirect: p.redirectEnd - p.redirectStart,
            dns: p.domainLookupEnd - p.domainLookupStart,
            connect: p.connectEnd - p.connectStart,
            network: p.connectEnd - p.navigationStart,

            // network response
            send: p.responseStart - p.requestStart,
            receive: p.responseEnd - p.responseStart,
            request: p.responseEnd - p.requestStart,

            // front-end rendor
            dom: p.domComplete - p.domLoading,
            loadEvent: p.loadEventEnd - p.loadEventStart,
            frontend: p.loadEventEnd - p.domLoading,

            // key phrase
            load: p.loadEventEnd - p.navigationStart,
            domReady: p.domContentLoadedEventStart - p.navigationStart,
            interactive: p.domInteractive - p.navigationStart, // 可操作时间
            ttfb: p.responseStart - p.navigationStart // 首字节时间
          };
          return data;
        },
        domReady: callback => {
          if (isDOMReady === true) {
            return void 0;
          }
          let timer = null;
          let runCheck = () => {
            if (performance.domComplete) {
              clearTimeout(timer);
              callback();
              isDOMReady = true;
            } else {
              timer = setTimeout(runCheck, 100);
            }
          };
          if (document.readyState === 'interactive') {
            callback();
            return void 0;
          }
          document.addEventListener('DOMContentLoaded', () => {
            // 循环检测DOMContentLoaded的完成情况
            runCheck();
          });
        },
        onload: callback => {
          if (isOnload === true) {
            return void 0;
          }
          let timer = null;
          let runCheck = () => {
            if (performance.loadEventEnd) {
              clearTimeout(timer);
              callback();
              isOnload = true;
            } else {
              timer = setTimeout(runCheck, 100);
            }
          };
          if (document.readyState === 'interactive') {
            callback();
            return void 0;
          }
          window.addEventListener('load', () => {
            // 循环检测DOMContentLoaded的完成情况
            runCheck();
          });
        }
      };
      let performance = window.performance.timing;
      Util.domReady(() => {
        let perfData = Util.getPerfData(performance);
        perfData.type = 'domready';
        cb(perfData);
      });
      Util.onload(() => {
        let perfData = Util.getPerfData(performance);
        perfData.type = 'onload';
        cb(perfData);
      });
    }
  };

  /*
  TODO: 剔除异常数据
  */

  perform.init(() => {
    console.log('perform init');
  });
  console.log('hi 123');

})));
//# sourceMappingURL=bundle.umd.js.map
