const express = require('express');
const db = require('./db/models');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const PORT = parseInt(process.env.PORT, 10) || 3010;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load('./src/docs/Documentacion_API_Red_Anti-Social.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', routes.userRoute);
app.use('/posts', routes.postRoute);
app.use('/comments', routes.commentRoute);
app.use('/tags', routes.tagRoute);
app.use('/images', routes.imageRoute);

app.listen(PORT, async () => {
    console.log(`La app esta escuchando en el puerto ${PORT}`)
    //await db.sequelize.sync({force:true});
});