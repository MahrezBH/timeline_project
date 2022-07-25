const Entretien = require("../models/entretien")

const { create } = require("../models/User");

module.exports = {
    // Create an Entretien
    FixerEntretien : async (req,res)=>{
        const entr = new Entretien({...req.body});
        await entr.save();
        res.json(entr);
    },
    // Get all entretiens
    getAllEntretien : async (req,res)=>{
        const entr = await Entretien.find();
        res.json(entr);
    },
    getEntretienById : async (req, res)=>{
        const {id} = req.params;
        const entr = await Entretien.findById(id);
        res.json(entr);
    },
    // Delete an Entretien 
    deleteEntretien: async (req,res)=>{
        const {id} = req.params;
        const entr = await Entretien.remove({_id: id});
        if(entr !=null){
            return res.json({message: "Entretien has been deleted", entr});
        }
        res.status(404).json({message:"Could not be found"});
    },
    // Update an Entretien 
    updateEntretien: async (req, res)=>{
        const {id} = req.params;
        const entr = await Entretien.findByIdAndUpdate(id,{...req.body});
        res.json(entr);
    },





}