const Formation = require("../models/Formation");
const User = require("../models/User");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'tajouri.ahmed@esprit.tn',
            pass: '201SMT5242',
        }
    });

    
// verify connection configuration
transporter.verify(
    function (error, success) {
        if (error) { console.log(error); }
        else { console.log("Server is ready"); }
    });
    const sendEmail = async (email, subject, text) => {
        try {
            await transporter.sendMail({
                from: process.env.USER,
                to: email,
                subject: subject,
                text: text,
            });
            console.log("email sent sucessfully");
            return true;
        } catch (error) {
            console.log(error, "email not sent");
            return false;
        }
    }










module.exports = {
    createFormation : async (req,res)=>{
        const formation = await Formation.create({ ...req.body });
        res.json(formation);
    }, 
    getAllformation : async (req,res)=>{
        const formation = await Formation.find();
     return res.json(formation);
   
    },
    getFormationById : async (req, res)=>{
        const {id} = req.params;
        const formation = await Formation.findById(id);
        return   res.json(formation);
    },

    sendEmail : async (req, res)=>{
        try {
            const {userId, formationId} = req.body;
            console.log(userId);
            console.log(formationId);
            const user = await User.findById(userId);
            const formation = await Formation.findById(formationId);
            console.log(user);
            sendEmail(user.email, 
                "Formation Notification",
                "Formation details:\n" + formation.description);
            return res.status(200).json();  
        } catch (error) {
            console.log(error);
            return res.status(400).json();  
        }
       
    },
    deleteFormation : async (req, res) => {
        if (req.method == 'DELETE') {
            const { id } = req.body;
    
            try {
                let formation = await Formation.findOne({ _id: id })
                if (!formation) {
                    res.status(400).json({ 'data': 'formation non existe ' });
                }
                else {
                    await Formation.findOneAndRemove({ _id: id })
                        .then(doc => {
                            return res.status(200).json({ 'data': 'Supression est fait' });
                        })
                }
    
            }
            catch (err) {
                res.status(400).json({ 'data': 'erreur de suppression' });
            }
        }
    },
 




    
 updateFormation : async (req, res) => {
        if (req.method == 'PUT') {
            const { _id } = req.body;
            console.log(_id);
    
            try {
                let formation = await Formation.findOne({ id: _id })
                if (!formation) {
                    res.status(400).json({ 'data': 'non exist' });
                }
                else {
                    await Formation.findByIdAndUpdate(_id, { ...req.body })
                        .then(doc => {
                            return res.status(200).json({ 'data': 'Updated ok' });
                        })
                }
    
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ 'data': 'Updated with fail' });
            }
        }
    }
    

}


