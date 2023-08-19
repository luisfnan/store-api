import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/products', async (_req, res) => {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        }
    });
    res.json(products);
});

router.post('/products', async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body
    });
    res.json(newProduct);
});

router.get('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id)
    const productFound = await prisma.product.findUnique({
        where: { id: productId },
        include: {
            category: true,
        }
    });
    if (!productFound) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(productFound);
})

router.put('/products/:sku', async (req, res) => {
    const productId = Number(req.params.sku)
    const productFound = await prisma.product.update({
        where: { id: productId },
        data: req.body
    });
    if (!productFound) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(productFound);
});

router.delete('/products/:sku', async (req, res) => {
    const productId = Number(req.params.sku)
    const productFound = await prisma.product.delete({
        where: { id: productId },
    });
    if (!productFound) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(productFound);
});

export default router;