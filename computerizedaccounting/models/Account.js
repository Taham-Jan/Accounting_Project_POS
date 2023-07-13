const mongoose= require ('mongoose');

const AccountSchema = new mongoose.Schema({
    accountname: {type:String, required:true,unique:true},
    accounttype: {type:String, required:true},
}, {timestamps:true});

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);