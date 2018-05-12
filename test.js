var chatmesh = require('.')
var test = require('tape')
var ram = require('random-access-memory')

test('create a chatmesh', function (t) {
  var mesh = chatmesh(ram, null, {username: 'bob'})
  mesh.db.ready(function () {
    t.same(mesh.username, 'bob', 'got username')
    t.end()
  })
})
