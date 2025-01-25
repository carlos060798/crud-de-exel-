import { Request, Response } from "express";
import { AppDataSource } from "../config/database";

import { CreateProductDto, UpdateProductDto } from "../../shared/types/product";
import { Product } from "../entities/product";

const productRepository = AppDataSource.getRepository(Product);

export class ProductController {
  static async getAll(req: Request, res: Response) {
    try {
      const products = await productRepository.find();
      return res.json({ success: true, data: products });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Error al obtener productos" });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const product = await productRepository.findOne({
        where: { id: parseInt(req.params.id) }
      });
      
      if (!product) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" });
      }

      return res.json({ success: true, data: product });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Error al obtener el producto" });
    }
  }

  static async create(req: Request<{}, {}, CreateProductDto>, res: Response) {
    try {
      const newProduct = productRepository.create(req.body);
      await productRepository.save(newProduct);
      return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Error al crear el producto" });
    }
  }

  static async update(req: Request<{ id: string }, {}, UpdateProductDto>, res: Response) {
    try {
      const product = await productRepository.findOne({
        where: { id: parseInt(req.params.id) }
      });

      if (!product) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" });
      }

      productRepository.merge(product, req.body);
      const results = await productRepository.save(product);
      return res.json({ success: true, data: results });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Error al actualizar el producto" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const product = await productRepository.findOne({
        where: { id: parseInt(req.params.id) }
      });

      if (!product) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" });
      }

      await productRepository.remove(product);
      return res.json({ success: true, data: product });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Error al eliminar el producto" });
    }
  }
}