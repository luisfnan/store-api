import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router()
const prisma = new PrismaClient()

router.get('/profile', async (_req, res) => {
    const profile = await prisma.user.findMany();
    res.json(profile);
});

router.post('/profile', async (req, res) => {
    const newProfile = await prisma.user.create({
        data: req.body
    });
    res.json(newProfile);
});

router.get('/profile/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const userFound = await prisma.user.findUnique({
        where: { id: id }
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
});

router.put('/profile/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const userFound = await prisma.user.update({
        where: { id: id },
        data: req.body
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
});

router.delete('/profile/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const userFound = await prisma.user.delete({
        where: { id: id },
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
});

export default router;