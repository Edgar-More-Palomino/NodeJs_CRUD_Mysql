//listar lenguajes
import {getConnection} from "./../database/database";

//GET
const getLanguages= async (req,res)=>{
    try{
        const connection = await getConnection();
        const result= await connection.query("SELECT id, name, programmers FROM language");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

//GET / parametro busqueda por Id
const getLanguage= async (req,res)=>{
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result= await connection.query("SELECT id, name, programmers FROM language WHERE id = ?",id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

//POST 
const addLanguage = async (req,res) =>{
    try{
        const{name,programmers}=req.body;

        if(name===undefined || programmers === undefined){
            res.status(400).json({message:"mala peticion. Por favor llene los campos"});
        };
        const language={name,programmers};
        const connection = await getConnection();
        await connection.query("INSERT INTO language SET ?", language);
        res.json({message:"insertado correctamente"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//UPDATE
const updateLanguage= async (req,res)=>{
    try{
        const {id} = req.params;
        const{name,programmers}=req.body;

        if(id=== undefined || name===undefined || programmers === undefined){
            res.status(400).json({message:"mala peticion. Por favor llene los campos"});
        };
        const language={name, programmers};
        const connection = await getConnection();
        const result= await connection.query("UPDATE language SET ? WHERE id =?",[language, id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

//DELETE
const deleteLanguage= async (req,res)=>{
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result= await connection.query("DELETE FROM language WHERE id = ?",id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};


export const methods={
    getLanguages,
    getLanguage,
    addLanguage,
    deleteLanguage,
    updateLanguage
};