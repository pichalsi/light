var config = {
  devices: [{
    name: 'Room 1',
    codes: {
      toggle: 8877060,
      on: 8877057,
      off: 8877064
    }
  }, {
    name: 'Room 2',
    codes: {
      toggle: 6677060,
      on: 6677057,
      off: 6677064
    }
  }]
};

config.devices = config.devices.map(function(item, index) {
  item.index = index;
  return item;
});

module.exports = config;
