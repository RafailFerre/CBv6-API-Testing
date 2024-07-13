module.exports = {
    require: ['@babel/register'],
    timeout: 15000,
    exclude: ['test/example.spec.js', 'test/client/trashClientDelete.spec.js'],
    file: 'setup/global.js',
    reporter: 'mochawesome',
    reporterOptions: [
        'json=false',
        'quiet=true',
        'reportDir=reports',
        'reportFilename=[status]_updatedReports',
    ],
};
