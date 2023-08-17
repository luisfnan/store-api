import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router()
const prisma = new PrismaClient()

router.get('/cart', async (_req, res) => {
    const cart = await prisma.order.findMany({
        include: {
            products: { select: { product: { select: { name: true, price: true } }, quantity: true } },
            user: { select: { name: true } }
        }
    });
    if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
});

router.post('/cart', async (req, res) => {
    const newCart = await prisma.order.create({
        data: req.body
    })
    res.json(newCart);
})


export default router;