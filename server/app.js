require('dotenv').config();

const server = require('./middleware');
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.info('Server is running on port ' + port);
})
