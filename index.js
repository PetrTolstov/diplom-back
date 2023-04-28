const app = require('express')();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (_, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Сервер запущен на порту 3000!'));
