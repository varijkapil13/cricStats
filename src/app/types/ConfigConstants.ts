export const POWERPLAY_OPTIONS = {
  powerplay: {
    value: 'powerplay',
    viewValue: 'Powerplay',
  },
  death: {
    value: 'death',
    viewValue: 'Death',
  },
  all: {
    value: 'all',
    viewValue: 'All',
  },
};

export const FORMAT_OPTIONS = {
  T20: {
    value: 'T20',
    viewValue: 'T20',
  },
  ODI: {
    value: 'ODI',
    viewValue: 'ODI',
  },
};
export const TYPE_OPTIONS = {
  official: {
    value: 'official',
    viewValue: 'Official',
  },
  practice: {
    value: 'practice',
    viewValue: 'Practice',
  },
};

export const TABLE_CONFIGS = {
  tableT20AllOvers: {
    powerplay: 'all',
    format: 'T20',
    type: 'official',
    sortBy: 'wickets',
  },
  tableT20PowerPlay: {
    powerplay: 'powerplay',
    format: 'T20',
    type: 'official',
    sortBy: 'wickets',
  },
  tableT20Death: {
    powerplay: 'death',
    format: 'T20',
    type: 'official',
    sortBy: 'wickets',
  },
  tableOdiAllOvers: {
    powerplay: 'all',
    format: 'ODI',
    type: 'official',
    sortBy: 'wickets',
  },
  tableOdiPowerPlay: {
    powerplay: 'powerplay',
    format: 'ODI',
    type: 'official',
    sortBy: 'wickets',
  },
  tableOdiDeath: {
    powerplay: 'death',
    format: 'ODI',
    type: 'official',
    sortBy: 'wickets',
  },
};
export const CHART_CONFIGS = {
  t20PowerPlay: {
    powerplay: 'powerplay',
    format: 'T20',
    type: 'official',
    sortBy: 'wickets',
    chartType: 'bar',
    dataPoints: [
      { name: 'Wickets', property: 'wickets' },
      { name: 'Runs', property: 'runs' },
      { name: 'Economy', property: 'economy' },
    ],
  },
  t20Death: {
    powerplay: 'death',
    format: 'T20',
    type: 'official',
    sortBy: 'wickets',
    chartType: 'bar',
    dataPoints: [
      { name: 'Wickets', property: 'wickets' },
      { name: 'Runs', property: 'runs' },
      { name: 'Economy', property: 'economy' },
    ],
  },
  t20All: {
    powerplay: 'all',
    format: 'T20',
    type: 'official',
    sortBy: 'wickets',
    chartType: 'bar',
    dataPoints: [
      { name: 'Wickets', property: 'wickets' },
      { name: 'Runs', property: 'runs' },
      { name: 'Economy', property: 'economy' },
    ],
  },
  odiPowerPlay: {
    powerplay: 'powerplay',
    format: 'ODI',
    type: 'official',
    sortBy: 'wickets',
    chartType: 'bar',
    dataPoints: [
      { name: 'Wickets', property: 'wickets' },
      { name: 'Runs', property: 'runs' },
      { name: 'Economy', property: 'economy' },
    ],
  },
  odiDeath: {
    powerplay: 'death',
    format: 'ODI',
    type: 'official',
    sortBy: 'wickets',
    chartType: 'bar',
    dataPoints: [
      { name: 'Wickets', property: 'wickets' },
      { name: 'Runs', property: 'runs' },
      { name: 'Economy', property: 'economy' },
    ],
  },
  odiAll: {
    powerplay: 'all',
    format: 'ODI',
    type: 'official',
    sortBy: 'wickets',
    chartType: 'bar',
    dataPoints: [
      { name: 'Wickets', property: 'wickets' },
      { name: 'Runs', property: 'runs' },
      { name: 'Economy', property: 'economy' },
    ],
  },
  t20WidesAll: {
    powerplay: 'all',
    format: 'T20',
    type: 'official',
    sortBy: 'wides',
    chartType: 'bar',
    dataPoints: [{ name: 'Wides', property: 'wides' }],
  },
  t20noBallsAll: {
    powerplay: 'all',
    format: 'T20',
    type: 'official',
    sortBy: 'noBalls',
    chartType: 'bar',
    dataPoints: [{ name: 'No Balls', property: 'noBalls' }],
  },
  t20WidesPowerPlay: {
    powerplay: 'powerplay',
    format: 'T20',
    type: 'official',
    sortBy: 'wides',
    chartType: 'bar',
    dataPoints: [{ name: 'Wides', property: 'wides' }],
  },
  t20noBallsPowerPlay: {
    powerplay: 'powerplay',
    format: 'T20',
    type: 'official',
    sortBy: 'noBalls',
    chartType: 'bar',
    dataPoints: [{ name: 'No Balls', property: 'noBalls' }],
  },
  t20WidesDeath: {
    powerplay: 'death',
    format: 'T20',
    type: 'official',
    sortBy: 'wides',
    chartType: 'bar',
    dataPoints: [{ name: 'Wides', property: 'wides' }],
  },
  t20noBallsDeath: {
    powerplay: 'death',
    format: 'T20',
    type: 'official',
    sortBy: 'noBalls',
    chartType: 'bar',
    dataPoints: [{ name: 'No Balls', property: 'noBalls' }],
  },
  odiWidesAll: {
    powerplay: 'all',
    format: 'ODI',
    type: 'official',
    sortBy: 'wides',
    chartType: 'bar',
    dataPoints: [{ name: 'Wides', property: 'wides' }],
  },
  odiNoBallsAll: {
    powerplay: 'all',
    format: 'ODI',
    type: 'official',
    sortBy: 'noBalls',
    chartType: 'bar',
    dataPoints: [{ name: 'No Balls', property: 'noBalls' }],
  },
  odiWidesPowerPlay: {
    powerplay: 'powerplay',
    format: 'ODI',
    type: 'official',
    sortBy: 'wides',
    chartType: 'bar',
    dataPoints: [{ name: 'Wides', property: 'wides' }],
  },
  odiNoBallsPowerPlay: {
    powerplay: 'powerplay',
    format: 'ODI',
    type: 'official',
    sortBy: 'noBalls',
    chartType: 'bar',
    dataPoints: [{ name: 'No Balls', property: 'noBalls' }],
  },
  odiWidesDeath: {
    powerplay: 'death',
    format: 'ODI',
    type: 'official',
    sortBy: 'wides',
    chartType: 'bar',
    dataPoints: [{ name: 'Wides', property: 'wides' }],
  },
  odiNoBallsDeath: {
    powerplay: 'death',
    format: 'ODI',
    type: 'official',
    sortBy: 'noBalls',
    chartType: 'bar',
    dataPoints: [{ name: 'No Balls', property: 'noBalls' }],
  },
};
