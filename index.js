const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const port = 8000;

let swaggerDefinition = {
    serve: [{url: '/api'}],
    info: {
        title: 'Digital Store API',
        version: '1.0.0',
        description: 'Documentação da API'
    },
    componentes: {
        schemas: require('./schemas.json')
    }
}

let options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
}

let swaggerSpec = swaggerJSDoc(options);

const brandRoutes = require('./routes/brandRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const gendersRoutes = require('./routes/genderRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');


app.use(express.json());//middlewares
app.use(cors());//middlewares

app.get('/', (request, response) => {
    response.send('Bem-vindo à API da Digital Store');
});

/**
 * @swagger
 * /marcas:
 *  get:
 *      tags:
 *          - Marcas
 *      description:
 *          - Traz lista de marcas 
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: brand
 *              description: Objeto marca
 *              in: body
 *              required: true 
 *              schema:
 *                  $ref: '#components/schemas/Brand'
 *      response:
 *          200:
 *             description: Retorna uma lista de marcas
 *             schemas: '#components/schemas/Brand'
 */
/**
 * @swagger
 * /marcas/{:id}:
 *  get:
 *      tags:
 *          - Marcas
 *      description:
 *          - Traz lista de marcas 
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: brand_id
 *              description: Objeto marca
 *              in: path
 *              required: true
 *      response:
 *          200:
 *             description: Retorna uma marcas
 *             schemas: '#components/schemas/Brand'
 *          400:
 *              description: Marca não encontrada
 */

app.use('/user', userRoutes);

const hasToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.send('Token é necessário!')
    }
    next();
}
app.use(hasToken);

app.use('/marcas', brandRoutes);
app.use('/categories', categoriesRoutes);
app.use('/generos', gendersRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.all('*', (req, res) =>{
    res.status(404).send('Rota não encontrada');
});

app.listen(port, () => {
    console.log(`Servidor de pé na url: http://localhost:${port}`);
});