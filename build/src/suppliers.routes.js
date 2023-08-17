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
router.get('/suppliers', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suppliers = yield prisma.supplier.findMany();
    res.json(suppliers);
}));
router.post('/suppliers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSupplier = yield prisma.supplier.create({
        data: req.body
    });
    res.json(newSupplier);
}));
router.get('/suppliers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const supplier = yield prisma.supplier.findUnique({
        where: {
            id: id
        }
    });
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
}));
router.put('/suppliers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const supplier = yield prisma.supplier.update({
        where: {
            id: id
        },
        data: req.body
    });
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
}));
router.delete('/suppliers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const supplier = yield prisma.supplier.delete({
        where: {
            id: id
        }
    });
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
}));
exports.default = router;
