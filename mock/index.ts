module.exports = [
  {
    url: '/api/users',
    type: 'get',
    response(req, res) {
      return res.send([
        { username: 'topm', age: 18 },
        { username: 'luke zhu', age: '23' },
      ])
    },
  },
]
