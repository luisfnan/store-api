import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router()
const prisma = new PrismaClient()

router.get('/suppliers', async (_req, res) => {
    const suppliers = await prisma.supplier.findMany();
    res.json(suppliers);
});

router.post('/suppliers', async (req, res) => {
    const newSupplier = await prisma.supplier.create({
        data: req.body
    })
    res.json(newSupplier);
});

router.get('/suppliers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const supplier = await prisma.supplier.findUnique({
        where: {
            id: id
        }
    });
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
});

router.put('/suppliers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const supplier = await prisma.supplier.update({
        where: {
            id: id
        },
        data: req.body
    });
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
});

router.delete('/suppliers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const supplier = await prisma.supplier.delete({
        where: {
            id: id
        }
    });
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
});

export default router;