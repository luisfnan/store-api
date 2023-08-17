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

router.get('/profile/:username', async (req, res) => {
    const userName = req.params.username
    const userFound = await prisma.user.findUnique({
        where: { username: userName }
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
});

router.put('/profile/:username', async (req, res) => {
    const userName = req.params.username
    const userFound = await prisma.user.update({
        where: { username: userName },
        data: req.body
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
});

router.delete('/profile/:username', async (req, res) => {
    const userName = req.params.username
    const userFound = await prisma.user.delete({
        where: { username: userName },
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
});

export default router;