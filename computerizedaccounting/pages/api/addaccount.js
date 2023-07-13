import connectDb from "../../middleware/mongoose";
import Account from "../../models/Account";
import Asset from "../../models/Asset";
import Expense from "../../models/Expense";
import Liability from "../../models/Liability";
import Revenue from "../../models/Revenue";
import OwnersEquity from "../../models/OwnersEquity"
import OwnersDrawings from "../../models/OwnersDrawings";
import ContraAsset from "../../models/ContraAsset"

const handler = async (req, res) => {
  let account = await Account.findOne({ accountname: req.body.accountname });
  if (!account) {
    const accountname = req.body.accountname;
    const accounttype = req.body.accounttype;
    const total = req.body.total;
    let u = new Account({
      accountname,
      accounttype,
      
    });
    await u.save();
    if (accounttype == "Asset") {
      let a = new Asset({
        accountname,
        total,
      });
      await a.save();
    }
    if (accounttype == "Contra Asset") {
      let a = new ContraAsset({
        accountname,
        total,
      });
      await a.save();
    }
    else if (accounttype == "Liability") {
        let a = new Liability({
          accountname,
          total,
        });
        await a.save();
      }
      else if (accounttype == "Revenue") {
        let a = new Revenue({
          accountname,
          total,
        });
        await a.save();
      }
      else if (accounttype == "Expense") {
        let a = new Expense({
          accountname,
          total,
        });
        await a.save();
      }
      else if (accounttype == "Owner's Equity") {
        let a = new OwnersEquity({
          accountname,
          total,
        });
        await a.save();
      }
      else if (accounttype == "Owner's Drawings") {
        let a = new OwnersDrawings({
          accountname,
          total,
        });
        await a.save();
      }

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "Account Already Exist" });
  }
};

export default connectDb(handler);
