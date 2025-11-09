import express from 'express';
import { Produto } from './scr/models/produto';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


const mongo_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/meubanco';
mongoose.connect(mongo_URI)
.then(() => {console.log('Conectado ao MongoDB');})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
});

app.use(express.static(path.join(__dirname, '../public')))
   
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexao ao MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});
app.use('produtos', produtosRouter);
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});


const  PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

