const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', estudanteRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost: ${PORT}`);

});