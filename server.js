const app = require('./app');

const port = process.env.PORT || 5555;
const server = app.listen(port, () => {
  console.log('Server is live at port 5555');
});
