const express = require('express');
const db = require('./db/models');
const routes = require('./routes');
require('dotenv').config();
const PORT = parseInt(process.env.PORT, 10) || 3010;

const app = express();
app.use(express.json());

app.use('/users', routes.userRoute);
app.use('/posts', routes.postRoute);
app.use('/comments', routes.commentRoute);
app.use('/tags', routes.tagRoute);
app.use('/images', routes.imageRoute);

app.listen(PORT, async () => {
    console.log(`La app esta escuchando en el puerto ${PORT}`)
    //await db.sequelize.sync({force:true});
});