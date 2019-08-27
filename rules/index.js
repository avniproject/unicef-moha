const _ = require('lodash');

module.exports = _.merge({},
    require('./notificationFormHandeler')
    ,require('./FacilityBasedMDRFormHandler')
    ,require('./cbmdrFormHandler')
    ,require('./MaternalDeathCaseSummaryHandeler')
    ,require('./visitSchedule')
);
