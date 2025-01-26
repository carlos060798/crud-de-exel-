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
exports.ProductController = void 0;
const database_1 = require("../config/database");
const product_1 = require("../entities/product");
const productRepository = database_1.AppDataSource.getRepository(product_1.Product);
class ProductController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productRepository.find();
                return res.json({ success: true, data: products });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: "Error al obtener productos" });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productRepository.findOne({
                    where: { id: parseInt(req.params.id) }
                });
                if (!product) {
                    return res.status(404).json({ success: false, error: "Producto no encontrado" });
                }
                return res.json({ success: true, data: product });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: "Error al obtener el producto" });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = productRepository.create(req.body);
                yield productRepository.save(newProduct);
                return res.status(201).json({ success: true, data: newProduct });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: "Error al crear el producto" });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productRepository.findOne({
                    where: { id: parseInt(req.params.id) }
                });
                if (!product) {
                    return res.status(404).json({ success: false, error: "Producto no encontrado" });
                }
                productRepository.merge(product, req.body);
                const results = yield productRepository.save(product);
                return res.json({ success: true, data: results });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: "Error al actualizar el producto" });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productRepository.findOne({
                    where: { id: parseInt(req.params.id) }
                });
                if (!product) {
                    return res.status(404).json({ success: false, error: "Producto no encontrado" });
                }
                yield productRepository.remove(product);
                return res.json({ success: true, data: product });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: "Error al eliminar el producto" });
            }
        });
    }
}
exports.ProductController = ProductController;
