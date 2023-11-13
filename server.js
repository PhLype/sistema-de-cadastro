const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get("/", (request, response) => {
    response.render('index')
});

app.listen(PORT, () => console.log(`Server ON: [http://127.0.0.1:3000/]`));