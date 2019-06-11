const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const { expectedUsername, expectedPassword, jwtSecret, authenticationEnabled } = require('../config');

function getJwtToken(subject) {
  const jwtToken = jwt.sign({}, jwtSecret, {subject, expiresIn: '12h'});

  return jwtToken;
}

const authenticationMidddleware = (req, res, next) => {
  if(!authenticationEnabled) { next(); return; }

  if(!req.header('Authorization') || req.header('Authorization').indexOf('Bearer ') !== 0) {
    res.status(403).json({message: 'Unauthorized'});
    return;
  }

  const jwtToken = req.header('Authorization').slice(7);
  console.log('jwtToken:', jwtToken);
  jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
    if(err) { res.status(403).json({message: 'Unauthorized'}); console.log('err', err); return; }
    next();
  });
};

server.use('/api', authenticationMidddleware, router);
server.use(bodyParser.json());

server.get('/echo/:name', (req, res) => {
  const name = req.params.name || 'World';
  res.status(200).send(`Hello, ${name}!`);
});

server.post('/auth', (req, res) => {
  const { username, password } = req.body;
  console.log('username:', username, 'password:', password);
  if(username === expectedUsername && password === expectedPassword) {
    res.status(200).send({accessToken: getJwtToken(username)});
  } else {
    res.status(404).json({message: 'Resource Not Found'});
  }
});

server.listen(port, () => {
  console.log(`Express App listening on port ${port}`);
});
