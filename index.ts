import express from 'express';
import productsRoutes from './src/products.routes';
import profilesRoutes from './src/profiles.routes';
import cartRoutes from './src/cart.routes';
import suppliersRoutes from './src/suppliers.routes';
import categoriesRoutes from './src/categories.routes';
import orderRoutes from './src/order.routes';

const app = express();
app.use(express.json());

app.use('/api', productsRoutes);
app.use('/api', profilesRoutes);
app.use('/api', cartRoutes);
app.use('/api', suppliersRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', orderRoutes);

app.get('/api', (req, res) => {
    res.send('Bienvenidos!');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});
