import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router()
const prisma = new PrismaClient()

router.get('/orders', async (_req, res) => {
    const orderDetails = await prisma.orderDetail.findMany();
    if (!orderDetails) {
        return res.status(404).json({ error: "Details not found" });
    }
    res.json(orderDetails);
});

router.post('/orders', async (req, res) => {
    const newCart = await prisma.orderDetail.create({
        data: req.body
    })
    res.json(newCart);
})

router.delete('/orders/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await prisma.orderDetail.delete({
        where: {
            id: id
        }
    });
    if (!deleted) {
        return res.status(404).json({ error: "Details not found" });
    }
    res.json(deleted);
});

router.put('/orders/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updated = await prisma.orderDetail.update({
        where: {
            id: id
        },
        data: req.body
    });
    if (!updated) {
        return res.status(404).json({ error: "Details not found" });
    }
    res.json(updated);
});


export default router;