"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./src/products.routes"));
const profiles_routes_1 = __importDefault(require("./src/profiles.routes"));
const cart_routes_1 = __importDefault(require("./src/cart.routes"));
const suppliers_routes_1 = __importDefault(require("./src/suppliers.routes"));
const categories_routes_1 = __importDefault(require("./src/categories.routes"));
const order_routes_1 = __importDefault(require("./src/order.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', products_routes_1.default);
app.use('/api', profiles_routes_1.default);
app.use('/api', cart_routes_1.default);
app.use('/api', suppliers_routes_1.default);
app.use('/api', categories_routes_1.default);
app.use('/api', order_routes_1.default);
app.get('/api', (req, res) => {
    res.send('Bienvenidos!');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
