export class Timer {
  ticks: number;
  
  constructor(tick: () => void, interval) {
    let _running = false;
    let _tick = tick;
    const self = this;

    self.ticks = 0;
    self.interval = interval;

    function _process() {
      setTimeout(() => {
        if (_running) {
          self.ticks++;
          _tick();
          _process();
        }
      }, self.interval);
    }

    self.start = function() {
      _running = true;
      _process();
      self.ticks = 0;
    };

    self.stop = function() {
      _running = false;
    };
  }
}
