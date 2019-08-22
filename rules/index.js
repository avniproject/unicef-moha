const _ = require('lodash');

module.exports = _.merge({},
    require('./notificationFormHandeler')
    ,require('./FacilityBasedMDRFormHandler')
    ,require('./cbmdrFormHandeler')
    ,require('./MaternalDeathCaseSummaryHandeler')
    ,require('./visitSchedule')
);
