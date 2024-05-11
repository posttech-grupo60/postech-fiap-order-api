import {Router} from 'express';

const router = Router();

//Registrando os pedidos
router.get('/checkout', (req, res) => {
    return res.json(['order']);
});
//Listar os pedidos registrados
router.get('/all', (req, res) => {
    return res.json(['order']);
});
//Listar os pedidos registrados em processo de produção
router.get('/:status', (req, res) => {
    return res.json(['order']);
});

export default router;