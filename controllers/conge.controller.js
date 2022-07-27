const {Conge} = require("../models/conge.model")
const {Soldeconge}= require("../models/soldeconge.model")
const XLSX = require("xlsx");
//const exceljs = require("exceljs");

module.exports = {
    createConge : async (req,res)=>{
        const conge = new Conge({...req.body});
        await conge.save();
        res.json(conge);
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
  },

  updateSoldeConge: async (req, res)=>{
    const {id} = req.params;
    const solde = await Soldeconge.findByIdAndUpdate(id,{...req.body});
    res.json(solde);
},

deleteSoldeConge: async (req,res)=>{
    const {_id} = req.params;
    const solde = await Soldeconge.remove({_id: _id});
    if(solde !=null){
        return res.json({message: "solde delete", conge});
    }
    res.status(404).json({message:"Could not be found"});
},




exportData : (rep, res)=>{
    var wb = XLSX.utils.book_new();
    Conge.find((err,conge)=>{
        if(err){
            res.json(err) 
          }
            
            else
            {
                var temp = JSON.stringify(conge);
                temp = JSON.parse(temp);
                var ws = XLSX.utils.json_to_sheet(temp);
                var down = __dirname+'\public\expotdata.xlsx'
                XLSX.utils.book_append_sheet(wb,ws,"sheet1");
                XLSX.writeFile(wb,down);
                res.download(down);
            }

     });


},


/*
exprtConge: async (req, res, next)=>{
    const startData = moment(new Date()).startOf('month').toDate();
    const endData = moment (new Date()).endOf('month').toDate();
    try{
        const conge = await Conge.find({created_at:{$gte : startData, $let: endData}});
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('my Conge');
        worksheet.columns=[
            {headers:'s.no', key:'s_no',width:10},
            {headers:'numconge', key:'numconge' , width:10},
            {headers:'matricul', key:'matricul' , width:10},
            {headers:'nom', key:'nom' , width:10},
            {headers:'prenom', key:'prenom' , width:10},
            {headers:'dataDepart', key:'dataDepart' , width:10},
            {headers:'dateretour', key:'dateretour' , width:10},
            {headers:'nbjour', key:'nbjour' , width:10},
            {headers:'typeconge', key:'typeconge' , width:10},
             ];
        let count =1;
        conge.forEach(conge=>{
            conge.s_no = count;
            worksheet.addRow(conge);
            count++;
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
          });

          const data = await workbook.xlsx.writeFile('conge.xlsx');
          res.json('done')

    }
    catch (e){
        res.json({
            status: "error",
            message: "Something went wrong",
          });

    }

}*/

 



}