const express = require('express');
const db = require('./db/models');
const PORT = parseInt(process.env.PORT, 10) || 3010;

const app = express();

app.listen(PORT, async () => {
    console.log(`La app esta escuchando en el puerto ${PORT}`)
    await db.sequelize.sync({force:true});
});