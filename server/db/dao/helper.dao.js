import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../../config/logger.config.js";
import HelperModel from "../models/helper.model.js"

dotenv.config({path: "./.env"});

class Helper {

    /**
     * It connects to the database.
     */
    constructor(){
        this.url = process.env.MONGODB_URI;
        this.mongodb = mongoose.connect;
        this.instance = this;
    }

    /**
     * It connects to the database, then it returns all the documents in the collection.
     * @returns The result of the query.
     */
    async getAll(toGet){
        try{
            this.mongodb(this.url);
            if(!toGet) toGet = {};
            return await HelperModel.find({}, toGet);
        }catch(err){
            logger.error(err);
            return {error: err};
        }
    }

    /**
     * It connects to the database, then it searches for a document with the given id, if it doesn't
     * find it, it throws an error, if it finds it, it returns the document.
     * @param id - The id of the document to be retrieved.
     * @returns The document with the id that was passed as a parameter.
     */
    async getById(id){
        try{
            this.mongodb(this.url);
            return await HelperModel.findById(id);
        }catch(err){
            logger.error(err);
            return false;
        }
    }
    
    /**
    * It connects to the database, then it searches for a document with the given id, if it doesn't
    * find it, it throws an error, if it finds it, it deletes the document.
    * 
    * @param id - The id of the document to be deleted.
    * @returns The result of the query.
    **/
    async addHelper(helperInfo){
        try{
            this.mongodb(this.url);
            const newHelper = new HelperModel(helperInfo);
            return newHelper.save();
        }catch(err){
            logger.error(err);
            return false;
        }
    }

    getInstance() {
        if (!this.instance) {
            this.instance = new Mensajes();
        }
        return this.instance;
    }

}

export default Helper;