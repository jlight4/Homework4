const Express = require('express');
const BodyParser = require('body-parser');
const Models = require('./Model');

const app = Express();
app.use(BodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
      || e.stack.includes('ValidationError')
      || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

app.get('/Model', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Models.find(request.query).select('-_id -__v'));
  });
});

