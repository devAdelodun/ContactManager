import express from "express";
import { 
    creatContact,
    deleteContact,
    getAllContacts,
    getContact,
    updateContact,
    
} from "../controllers/contactController.js";
import validateToken  from "../middleware/validateTokenHandler.js";
const contactRouter = express.Router();

contactRouter.use(validateToken);
contactRouter.route("/").get(getAllContacts).post(creatContact);
contactRouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


export default contactRouter;