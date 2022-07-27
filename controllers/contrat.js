const Contrat = require('../models/Contrat');



module.exports = {
    add: async(req, res) => {
    try{
        const contrat = Contrat({...req.body})
        await contrat.save();
        return res.json(contrat);
    }
    catch(err){
        console.log(err);
        return res.status(400).json( {'data': 'Verifier votre saisie' });
    }
    },


    affiche: async (req, res) => {
        const {id} = req.query;
        try{
        if (!id) {
            let contrats = await Contrat.find();

            return res.status(200).json(contrats);
        }
        let contrat = await Contrat.findById(id);
        if (!contrat){
            return res.status(404).json();
        }
        return res.json(contrat);
    }
    catch(err){
        console.log(err);
        return res.status(400).json( {'data': 'Verifier votre saisie' });
    }
    },


    delete: async (req, res) => {
        const {id} = req.query;
        try{
            let contrat = await Contrat.findById(id);
            if (contrat){
                await contrat.remove();
                return res.status(200).json("deleted with success");
            }
            else{
                return res.status(200).json("verify the id");
 
            }
        }
        catch(err){
            console.log(err);
            return res.status(400).json( {'data': 'Verifier votre saisie' });
        }
    },



    update: async (req, res) => {    
        
        const { id } = req.body;
        console.log(id);

        try {
            let contrat = await Contrat.findOne({ id: id })
            if (!contrat) {
                res.status(400).json({ 'data': 'Inexist contat' });
            }
            else {
                await Contrat.findByIdAndUpdate(id, { ...req.body })
                    .then(doc => {
                        return res.status(200).json({ 'data': 'Updated with success' });
                    })
            }

        }
        catch (err) {
            res.status(400).json({ 'data': 'Updated with fail' });
        }
    },
    generate_pdf: async (req, res) => {
        var PDFDocument = require('pdfkit');
        const doc = new PDFDocument();
        let contrats = await Contrat.find();
        doc.fontSize(15)
            .fillColor('blue')
            .text(JSON.stringify(contrats, null, 2), 100, 100)
    
        doc.pipe(res);
    
        doc.end();
    }

}
