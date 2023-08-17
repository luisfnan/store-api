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
router.get('/cart', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield prisma.order.findMany({
        include: {
            products: { select: { product: { select: { name: true, price: true } }, quantity: true } },
            user: { select: { name: true } }
        }
    });
    if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
}));
router.post('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = yield prisma.order.create({
        data: req.body
    });
    res.json(newCart);
}));
exports.default = router;
