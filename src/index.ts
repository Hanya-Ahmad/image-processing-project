import express from 'express';
import routes from './routes/index';
const app = express();
const port = 3000;


//middleware
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`);
});

export default app;
