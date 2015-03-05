var restify = require('restify');

var app = restify.createServer({});

app.get(/.*/, restify.serveStatic({
    directory: __dirname + '/dist',
    default: 'index.html'
}));

app.listen(8080, function() {
    console.log('Server running: http://localhost:8080');
});
