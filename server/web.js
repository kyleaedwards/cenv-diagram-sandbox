/**
 * cEnv Socket Server
 */

var port     = process.env.PORT || 5000,
    http     = require("http"),
    server   = http.createServer(),
    io       = require("socket.io"),
    cache    = {data: {}, userID: 0},
    mongo    = require('mongodb').MongoClient,
    mongourl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost',
    timer    = 0;
    
server.listen(port);

mongo.connect(mongourl, function (err, db) {

    function dbWrite() {
        timer = setTimeout(function () {
            var query = {key: cache.data.key};
            db.collection("cenv_diagrams").update(query, cache.data, {upsert: true}, function (err, result) {
                console.log(result);
            });
        }, 2000);
    }

    function dbRead(key, callback) {
        var query = {key: key};
        db.collection("cenv_diagrams").findOne(query, callback);
    }

    socketServer = io.listen(server);
    socketServer.on("connection", function(socket) {

        if (err) {
            socket.emit("dbError", err);
            throw err;
        }

        socket.emit('debug', cache.data);

        if (typeof cache.data['data'] === 'undefined') {
            socket.emit("keyRequest");
        } else {
            socket.emit("forceReload", cache.data);
            socket.emit("connected", { userID: cache.userID++ });
        }

        socket.on("keySubmit", function (keyData) {

            socket.emit('debug', keyData);
            dbRead(keyData.key, function (err, response) {
                socket.emit('debug', response);
                socket.emit('debug', err);
                if (!response || typeof response.key === 'undefined') {
                    cache.data.data = {};
                    cache.data.key = keyData.key;
                    cache.data.title = keyData.title;
                } else {
                    cache.data = response;
                    socket.emit("forceReload", cache.data);
                }
                socket.emit("connected", { userID: cache.userID++ });
                socket.broadcast.emit("keyRequestInterrupt", keyData);
            });
            
        });

        socket.on("keyRequestInterrupted", function () {
            socket.emit("forceReload", cache.data);
            socket.emit("connected", { userID: cache.userID++ });
        });

        socket.on("moving", function (data) { 
            socket.volatile.broadcast.emit("moved", data);
            if (timer) clearTimeout(timer);
        });

        socket.on("stopMoving", function (data) {
            socket.broadcast.emit("moveStopped", data);
            if (timer) clearTimeout(timer);
        });

        socket.on("save", function (data) {
            cache.data = data;
            socket.broadcast.emit("forceReload", data);
            dbWrite();
        });
    });

});
