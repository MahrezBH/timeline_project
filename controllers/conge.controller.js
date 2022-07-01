const {Conge} = require ("../models/conge.model");
const {Soldeconge}= require("../models/soldeconge.model")

module.exports = {
    createConge : async (req,res)=>{
        const cong = new Conge({ ...req.body });
        await cong.save();
        res.json(cong);
    },
    getAllConge : async (req,res)=>{
        const conge = await Conge.find();
     res.json(conge);
    },
    getCongeById : async (req, res)=>{
        const {id} = req.params;
        const conge = await Conge.findById(id);
        res.json(conge);
    },

    deleteConge: async (req,res)=>{
        const {id} = req.params;
        const conge = await Conge.remove({_id: id});
        if(conge !=null){
            return res.json({message: "conge delete", conge});
        }
        res.status(404).json({message:"Could not be found"});
    },
    updateConge: async (req, res)=>{
        const {id} = req.params;
        const conge = await Conge.findByIdAndUpdate(id,{...req.body});
        res.json(conge);
    },
    addSoldeConge: async(req, res)=>{
        const solde = new Soldeconge({...req.body});
        await solde.save();
        res.json(solde);
         },
        
         showAllSoldeConge: async (req, res)=>{
            const solde = await Soldeconge.find();
            res.json(solde);
         },
        
          showsoldebyid: async (req, res)=>{
            const {id} = req.params;
        const sode = await Soldeconge.findById(id);
        res.json(sode);
          }
        
}