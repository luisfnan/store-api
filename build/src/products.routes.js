"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/products', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        include: {
            category: true,
        }
    });
    res.json(products);
}));
router.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield prisma.product.create({
        data: req.body
    });
    res.json(newProduct);
}));
router.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    const productFound = yield prisma.product.findUnique({
        where: { id: productId },
        include: {
            category: true,
        }
    });
    if (!productFound) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(productFound);
}));
router.put('/products/:sku', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.sku);
    const productFound = yield prisma.product.update({
        where: { id: productId },
        data: req.body
    });
    if (!productFound) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(productFound);
}));
router.delete('/products/:sku', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.sku);
    const productFound = yield prisma.product.delete({
        where: { id: productId },
    });
    if (!productFound) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(productFound);
}));
exports.default = router;
