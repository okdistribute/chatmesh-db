var collect = require('collect-stream')
var chatmesh = require('.')
var test = require('tape')
var ram = require('random-access-memory')

test('create a chatmesh', function (t) {
  var mesh = chatmesh(ram, null, {username: 'bob'})
  mesh.db.ready(function () {
    t.same(mesh.username, 'bob', 'got username')
    var date = new Date
    var message = 'hi'
    mesh.message(message, {date}, function (err) {
      t.error(err)
      var reader = mesh.db.createReadStream()
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
