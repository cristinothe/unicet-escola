const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger-output.json');
const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const cursosRoutes = require('./src/routes/cursosRoutes');
const disciplinasRoutes = require('./src/routes/disciplinasRoutes');
const matriculaRoutes = require('./src/routes/matriculaRoutes');
const professoresRoutes = require('./src/routes/professoresRoutes');
const notasRoutes = require('./src/routes/notasRoutes');
const app = express();
const PORT = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use('/', estudanteRoutes);
app.use('/', cursosRoutes);
app.use('/', disciplinasRoutes);
app.use('/', matriculaRoutes);
app.use('/', professoresRoutes);
app.use('/', notasRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost: ${PORT}`);

});