const Lab = require('lab')
const Code = require('code')
const composeServer = require('./server')
const lab = exports.lab = Lab.script()
let table

lab.before(async () => {
  const server = await composeServer()
  await server.initialize()
  table = server.table()
})

lab.test('server routing table', () => {
  Code.expect(table.length).to.equal(4)

  Code.expect(table[0].method).to.equal('get')
  Code.expect(table[0].path).to.equal('/my-routes')

  Code.expect(table[1].method).to.equal('post')
  Code.expect(table[1].path).to.equal('/my-routes/product')

  Code.expect(table[2].method).to.equal('put')
  Code.expect(table[2].path).to.equal('/my-routes/product/{id}')

  Code.expect(table[3].method).to.equal('delete')
  Code.expect(table[3].path).to.equal('/my-routes/product/{id}')
})
