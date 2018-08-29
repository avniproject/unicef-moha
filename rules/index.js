const _ = require('lodash');

module.exports = _.merge({},
    require('./notificationFormHandeler')
    ,require('./fbmdrFormHandeler')
    // ,require('./visitSchedule')
);
