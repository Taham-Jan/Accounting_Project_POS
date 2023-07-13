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
  
  if(req.method=="POST"){
    const debitList = req.body.debitList;
    const creditList = req.body.creditList;
    const date=req.body.newDate
    console.log(date)
    

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
