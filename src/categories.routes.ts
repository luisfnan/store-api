import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router()
const prisma = new PrismaClient()

router.get('/categories', async (req, res) => {
    const categories = await prisma.category.findMany({
        include: {
            product: {
                select: { name: true, id: true }
            }
        },

    });
    if (!categories) {
        return res.status(404).json({ error: "No category found" });
    }
    res.json(categories);
})

router.post('/categories', async (req, res) => {
    const newCategory = await prisma.category.create({
        data: req.body
    })
    res.json(newCategory);
})

router.get('/categories/:id', async (req, res) => {
    const category = parseInt(req.params.id);
    const categories = await prisma.category.findUnique({
        where: {
            id: category
        },
        include: {
            product: {
                select: { name: true, id: true }
            }
        },
    });
    if (!categories) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json(categories);
});

router.put('/categories/:id', async (req, res) => {
    const category = parseInt(req.params.id);
    const categories = await prisma.category.update({
        where: {
            id: category
        },
        data: req.body
    });
    if (!categories) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json(categories);
});

router.delete('/categories/:id', async (req, res) => {
    const category = parseInt(req.params.id);
    const categories = await prisma.category.delete({
        where: {
            id: category
        }
    });
    if (!categories) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json(categories);
});

export default router;