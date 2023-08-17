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
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma.category.findMany({
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
}));
router.post('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield prisma.category.create({
        data: req.body
    });
    res.json(newCategory);
}));
router.get('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = parseInt(req.params.id);
    const categories = yield prisma.category.findUnique({
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
}));
router.put('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = parseInt(req.params.id);
    const categories = yield prisma.category.update({
        where: {
            id: category
        },
        data: req.body
    });
    if (!categories) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json(categories);
}));
router.delete('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = parseInt(req.params.id);
    const categories = yield prisma.category.delete({
        where: {
            id: category
        }
    });
    if (!categories) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json(categories);
}));
exports.default = router;
