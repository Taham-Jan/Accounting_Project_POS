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
    const date = req.body.newDate;

    let u = new Journal({
      debitList,
      creditList,
      date
    });
    await u.save();

    debitList.forEach(async element => {
      let i=0
      
      
      let account = await Account.find({accountname:element.accountname});
      console.log(account[i].accounttype)
      if(account[i].accounttype=="Asset"){
        
        let assetaccount = await Asset.find({accountname:element.accountname});
        console.log(assetaccount)
        let assetTotal=assetaccount[i].total
        assetTotal=assetTotal+parseInt(element.amount)

        let result=await Asset.updateOne({accountname:element.accountname},{$set:{total:assetTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Liability"){
        
        let liabilityaccount = await Liability.find({accountname:element.accountname});
        console.log(liabilityaccount)
        let liabilityTotal=liabilityaccount[i].total
        liabilityTotal=liabilityTotal-parseInt(element.amount)

        let result=await Liability.updateOne({accountname:element.accountname},{$set:{total:liabilityTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Revenue"){
        
        let revenueaccount = await Revenue.find({accountname:element.accountname});
        console.log(revenueaccount)
        let revenueTotal=revenueaccount[i].total
        revenueTotal=revenueTotal-parseInt(element.amount)

        let result=await Revenue.updateOne({accountname:element.accountname},{$set:{total:revenueTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Expense"){
        
        let expenseaccount = await Expense.find({accountname:element.accountname});
        console.log(expenseaccount)
        let expenseTotal=expenseaccount[i].total
        expenseTotal=expenseTotal+parseInt(element.amount)

        let result=await Expense.updateOne({accountname:element.accountname},{$set:{total:expenseTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Owner's Equity"){
        
        let ownersequityaccount = await OwnersEquity.find({accountname:element.accountname});
        console.log(ownersequityaccount)
        let ownersequityTotal=ownersequityaccount[i].total
        ownersequityTotal=ownersequityTotal-parseInt(element.amount)

        let result=await OwnersEquity.updateOne({accountname:element.accountname},{$set:{total:ownersequityTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Owner's Drawings"){
        
        let ownersdrawingsaccount = await OwnersDrawings.find({accountname:element.accountname});
        console.log(ownersdrawingsaccount)
        let ownersdrawingsTotal=ownersdrawingsaccount[i].total
        ownersdrawingsTotal=ownersdrawingsTotal-parseInt(element.amount)

        let result=await OwnersDrawings.updateOne({accountname:element.accountname},{$set:{total:ownersdrawingsTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Contra Asset"){
        
        let contraassetaccount = await ContraAsset.find({accountname:element.accountname});
        console.log(contraassetaccount)
        let contraassetTotal=contraassetaccount[i].total
        contraassetTotal=contraassetTotal-parseInt(element.amount)

        let result=await ContraAsset.updateOne({accountname:element.accountname},{$set:{total:contraassetTotal}})
        console.log(result)
      }
      i++
    });
    creditList.forEach(async element => {
      let i=0
      
      
      let account = await Account.find({accountname:element.accountname});
      console.log(account[i].accounttype)
      if(account[i].accounttype=="Asset"){
        
        let assetaccount = await Asset.find({accountname:element.accountname});
        console.log(assetaccount)
        let assetTotal=assetaccount[i].total
        assetTotal=assetTotal-parseInt(element.amount)

        let result=await Asset.updateOne({accountname:element.accountname},{$set:{total:assetTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Liability"){
        
        let liabilityaccount = await Liability.find({accountname:element.accountname});
        console.log(liabilityaccount)
        let liabilityTotal=liabilityaccount[i].total
        liabilityTotal=liabilityTotal+parseInt(element.amount)

        let result=await Liability.updateOne({accountname:element.accountname},{$set:{total:liabilityTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Revenue"){
        
        let revenueaccount = await Revenue.find({accountname:element.accountname});
        console.log(revenueaccount)
        let revenueTotal=revenueaccount[i].total
        revenueTotal=revenueTotal+parseInt(element.amount)

        let result=await Revenue.updateOne({accountname:element.accountname},{$set:{total:revenueTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Expense"){
        
        let expenseaccount = await Expense.find({accountname:element.accountname});
        console.log(expenseaccount)
        let expenseTotal=expenseaccount[i].total
        expenseTotal=expenseTotal-parseInt(element.amount)

        let result=await Expense.updateOne({accountname:element.accountname},{$set:{total:expenseTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Owner's Equity"){
        
        let ownersequityaccount = await OwnersEquity.find({accountname:element.accountname});
        console.log(ownersequityaccount)
        let ownersequityTotal=ownersequityaccount[i].total
        ownersequityTotal=ownersequityTotal+parseInt(element.amount)

        let result=await OwnersEquity.updateOne({accountname:element.accountname},{$set:{total:ownersequityTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Owner's Drawings"){
        
        let ownersdrawingsaccount = await OwnersDrawings.find({accountname:element.accountname});
        console.log(ownersdrawingsaccount)
        let ownersdrawingsTotal=ownersdrawingsaccount[i].total
        ownersdrawingsTotal=ownersdrawingsTotal+parseInt(element.amount)

        let result=await OwnersDrawings.updateOne({accountname:element.accountname},{$set:{total:ownersdrawingsTotal}})
        console.log(result)
      }
      if(account[i].accounttype=="Contra Asset"){
        
        let contraassetaccount = await ContraAsset.find({accountname:element.accountname});
        console.log(contraassetaccount)
        let contraassetTotal=contraassetaccount[i].total
        contraassetTotal=contraassetTotal+parseInt(element.amount)

        let result=await ContraAsset.updateOne({accountname:element.accountname},{$set:{total:contraassetTotal}})
        console.log(result)
      }
      i++
    });

    

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
