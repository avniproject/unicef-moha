const _ = require('lodash');

module.exports = _.merge({},
    require('./notificationFormHandeler')
    ,require('./fbmdrFormHandler')
    ,require('./cbmdrFormHandeler')
    ,require('./MaternalDeathCaseSummaryHandeler')
    ,require('./visitSchedule')
);
