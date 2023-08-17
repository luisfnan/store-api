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
router.get('/orders', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderDetails = yield prisma.orderDetail.findMany();
    if (!orderDetails) {
        return res.status(404).json({ error: "Details not found" });
    }
    res.json(orderDetails);
}));
router.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = yield prisma.orderDetail.create({
        data: req.body
    });
    res.json(newCart);
}));
router.delete('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const deleted = yield prisma.orderDetail.delete({
        where: {
            id: id
        }
    });
    if (!deleted) {
        return res.status(404).json({ error: "Details not found" });
    }
    res.json(deleted);
}));
router.put('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updated = yield prisma.orderDetail.update({
        where: {
            id: id
        },
        data: req.body
    });
    if (!updated) {
        return res.status(404).json({ error: "Details not found" });
    }
    res.json(updated);
}));
exports.default = router;
