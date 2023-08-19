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
router.get('/profile', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield prisma.user.findMany();
    res.json(profile);
}));
router.post('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProfile = yield prisma.user.create({
        data: req.body
    });
    res.json(newProfile);
}));
router.get('/profile/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userFound = yield prisma.user.findUnique({
        where: { id: id }
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
}));
router.put('/profile/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userFound = yield prisma.user.update({
        where: { id: id },
        data: req.body
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
}));
router.delete('/profile/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userFound = yield prisma.user.delete({
        where: { id: id },
    });
    if (!userFound) {
        return res.status(404).json({ error: "Profile not found" });
    }
    res.json(userFound);
}));
exports.default = router;
