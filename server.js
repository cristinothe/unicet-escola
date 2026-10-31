const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const cursosRoutes = require('./src/routes/cursosRoutes');
const disciplinasRoutes = require('./src/routes/disciplinasRoutes');
const matriculaRoutes = require('./src/routes/matriculaRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', estudanteRoutes);
app.use('/', cursosRoutes);
app.use('/', disciplinasRoutes);
app.use('/', matriculaRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost: ${PORT}`);

});