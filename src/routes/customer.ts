/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MongoDBCustomerRepository from '@repository/MongoRepository/customer.repository';
import CreateCustomer from '@useCase/customer/createCustomer.usecase';
import GetCustomer from '@useCase/customer/getCustomer.usecase';
import DeleteCustomer from '@useCase/customer/deleteCustomer.usecase';
import {Router} from 'express';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const customerRepository = new MongoDBCustomerRepository();
        const createCustomer = new CreateCustomer(customerRepository);
        await createCustomer.execute(req.body);
        return res.status(201).json({message: 'Cliente criado com sucesso', status: 201});
    } catch (error) {
        return res.status(500).json({message: 'Erro ao criar produto, contate a administração', status: 500});
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const customerRepository = new MongoDBCustomerRepository();
        const getCustomerById = new GetCustomer(customerRepository);
        const customer = await getCustomerById.execute({id: Number(req.params.id)});
        return res.status(200).json({data: customer, status: 200});
    } catch (error: any) {
        if(error.message.includes('Customer not found')){
            return res.status(404).json({message: 'Cliente não encontrado', status: 404});
        }
        return res.status(500).json({message: 'Erro! Contate a administração.', status: 500});
    }
});

router.get('/cpf/:cpf', async (req, res) => {
    try {
        const customerRepository = new MongoDBCustomerRepository();
        const getCustomerByCPF = new GetCustomer(customerRepository);
        const customer = await getCustomerByCPF.execute({cpf: req.params.cpf});
        return res.status(200).json({data: customer, status: 200});
    } catch (error: any) {
        if(error.message.includes('Customer not found')){
            return res.status(404).json({message: 'Cliente não encontrado', status: 404});
        }
        return res.status(500).json({message: 'Erro! Contate a administração.', status: 500});
    }
});

router.delete('/:cpf', async (req, res) => {
    try {
        const customerRepository = new MongoDBCustomerRepository();
        const deleteCustomer = new DeleteCustomer(customerRepository);
        await deleteCustomer.execute({cpf: req.params.cpf});
        return res.status(200).json({ status: 200});
    } catch (error: any) {
        return res.status(500).json({message: 'Erro! Contate a administração.', status: 500});
    }
});

export default router;