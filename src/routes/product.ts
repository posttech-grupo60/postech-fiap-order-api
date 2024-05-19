/* eslint-disable @typescript-eslint/no-explicit-any */
/* c8 ignore start */
import MongoDBProductRepository from '@repository/MongoRepository/product.repository';
import CreateProduct from '@useCase/product/createProduct.usecase';
import GetProductById from '@useCase/product/getProductById.usecase';
import ListAllProducts from '@useCase/product/listAllProducts.usecase';
import {Router} from 'express';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const productRepository = new MongoDBProductRepository();
        const createProduct = new CreateProduct(productRepository);
        await createProduct.execute(req.body);
        return res.status(201).json({message: 'Produto criado com sucesso', status: 201});
    } catch (error) {
        return res.status(500).json({message: 'Erro ao criar produto, contate a administração', status: 500});
    }
});

router.get('/', (_, res) => {
    try {
        const productRepository = new MongoDBProductRepository();
        const listAllProducts = new ListAllProducts(productRepository);
        const products = listAllProducts.execute();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message: 'Erro ao criar produto, contate a administração', status: 500});
    }
});

//Retorna produto específico
router.get('/:id', (req, res) => {
    try {
        const productRepository = new MongoDBProductRepository();
        const getProductById = new GetProductById(productRepository);
        const product = getProductById.execute({id: Number(req.params.id)});
        return res.status(200).json(product);
    } catch (error: any) {
        if(error.message === 'Product not found'){
            return res.status(404).json({message: 'Produto não encontrado', status: 404});
        }
        return res.status(500).json({message: 'Erro ao criar produto, contate a administração', status: 500});
    }
});

//Deleta produto
router.get('/:id', (req, res) => {
    try {
        const productRepository = new MongoDBProductRepository();
        const getProductById = new GetProductById(productRepository);
        const product = getProductById.execute({id: Number(req.params.id)});
        return res.status(200).json(product);
    } catch (error: any) {
        if(error.message === 'Product not found'){
            return res.status(404).json({message: 'Produto não encontrado', status: 404});
        }
        return res.status(500).json({message: 'Erro ao criar produto, contate a administração', status: 500});
    }
});


export default router;