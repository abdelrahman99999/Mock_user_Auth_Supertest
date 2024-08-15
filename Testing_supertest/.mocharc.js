// mocha config
module.exports = {
    timeout: 700, // set the default timeout for test cases (milliseconds)
    reporter: 'mochawesome', // Use mochawesome as the test report generator
    'reporter-option': [
        'reportDir=Report', // Report directory
        'reportFilename=[status]_[datetime]-[name]-report', //Report file name
        'html=true', // enable html report
        'json=true', // disable json report
        'overwrite=true', // disable report file overwrite
        'timestamp=longDate', // add timestamp to report file name
        'showFailed=true'

    ],
    spec: ['Specs/**/*.js'], // specify the location of the test file
};