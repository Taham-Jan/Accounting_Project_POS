import connectDb from "../../middleware/mongoose";
import Account from "../../models/Account";
import Asset from "../../models/Asset";
import Expense from "../../models/Expense";
import Liability from "../../models/Liability";
import Revenue from "../../models/Revenue";
import OwnersEquity from "../../models/OwnersEquity"
import ContraAsset from "../../models/ContraAsset";
import OwnersDrawings from "../../models/OwnersDrawings";
import Journal from "../../models/Journal";

const handler = async (req, res) => {
  
  if(req.method=="DELETE"){
    const account=await Account.deleteMany()
    const asset=await Asset.deleteMany()
    const expense=await Expense.deleteMany()
    const liability=await Liability.deleteMany()
    const revenue=await Revenue.deleteMany()
    const ownersequity=await OwnersEquity.deleteMany()
    const contraasset=await ContraAsset.deleteMany()
    const ownersdrawing=await OwnersDrawings.deleteMany()
    const journal=await Journal.deleteMany()
    
    
    

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
