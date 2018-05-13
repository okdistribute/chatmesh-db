var collect = require('collect-stream')
var chatmesh = require('.')
var test = require('tape')
var ram = require('random-access-memory')

test('create a chatmesh and read a channel', function (t) {
  var mesh = chatmesh(ram, null, {username: 'bob'})
  mesh.db.ready(function () {
    t.same(mesh.username, 'bob', 'got username')
    var date = new Date
    var message = 'hi'
    var channel = '#general'
    mesh.message(channel, message, {date}, function (err) {
      t.error(err)
      var reader = mesh.createReadStream(channel)
      collect(reader, function (err, data) {
        t.error(err)
        t.same(data.length, 1)
        var msg = data[0].value
        t.same(message, msg.message, 'same message')
        t.end()
      })
    })
  })
})
