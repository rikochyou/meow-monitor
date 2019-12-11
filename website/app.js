let Koa = require('koa');
const Serve = require('koa-static');

const app = new Koa();
const port = 4000;

app.use(Serve(__dirname + '/client'));

app.listen(port, () => {
  console.log(`${port} is listening`);
});
