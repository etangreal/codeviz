
CONSOLE_LOG_ROUTES = this.CONSOLE_LOG_ROUTES || false;

if (CONSOLE_LOG_ROUTES) console.log('LOADING: src/lib/_log.js (ENTER-FOLDER)');

Meteor.startup(function(){
    if (CONSOLE_LOG_ROUTES) console.log('STARTUP: src/lib/_log.js (ENTER-FOLDER)');
});