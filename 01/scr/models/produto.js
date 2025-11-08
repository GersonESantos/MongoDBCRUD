import mongoose from "mongoose";
const produtoSchema = new mongoose.Schema({
    nome: {type:String, required:true},
    preco: {type:Number, required:true},
    descricao: {type:String, required:true},
    criadoEm: {type:Date, default:Date.now}
});
export const Produto = mongoose.model('Produto', produtoSchema);