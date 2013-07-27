const windowUtils = require('window-utils');
const { setInterval, clearInterval } = require('timers');

new windowUtils.WindowTracker({
  onTrack: function (window) {
    var bar   = window.document.getElementById('TabsToolbar');
    var label = window.document.createElement('label');

    var window_controls = window.document.getElementById('window-controls');

    var urlbar = window.document.getElementById('urlbar-container');
    urlbar.setAttribute('flex', 1);
    urlbar.setAttribute('minwidth', 300);

    label.style.fontWeight = 'bold';

    function pad (value) {
      return (value < 10 ? '0' : '') + value;
    }

    function update () {
      var date = new Date();
      label.setAttribute('value',
        pad(date.getHours())   + ':' +
        pad(date.getMinutes()));
    }

    var timer;

    window.addEventListener('sizemodechange', function () {
      if (window.windowState === 4) {
        timer = setInterval(update, 10000);
        update();
        if (window_controls) {
          bar.insertBefore(label, window_controls);
        } else {
          bar.appendChild(label);
        }
      } else {
        clearInterval(timer);
        bar.removeChild(label);
      }
    });
  }
});
