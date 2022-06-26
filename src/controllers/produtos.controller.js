const Produto = require ('../models/produto.model');



module.exports={
    async index(req,res){
        const product = await Produto.find();
        res.json(product);

    },
   async create (req,res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario}= req.body;
        let data ={};
        let product = Produto.findOne({email_usuario});
        if(!product){
            data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario};
        product = await Produto.create(data);
            return res.status(200).json(product);

        }else{
            return res.status(500).json(product);

        }
    },
       async details(req,res){
        const {_id} = req.params;
        const product = await Usuario.find({_id});
        res.json(product);

    },
    async delete(req,res){
        const {_id} = req.params;
        const product = await Produto.findByIdAndDelete({_id});
        return res.json(product);

    },
    async update(req,res){
        const {_id, nome_usuario, email_usuario, tipo_usuario, senha_usuario}= req.body;
        const data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario};
        const product = await Produto.findOneAndUpdate({_id},data,{new:true});
        res.json(product);
    }
}

