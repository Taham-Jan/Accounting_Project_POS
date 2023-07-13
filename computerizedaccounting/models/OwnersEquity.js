const mongoose= require ('mongoose');

const OwnersEquitySchema = new mongoose.Schema({
    accountname: {type:String, required:true, unique:true},
    total: {type:Number,default:"0"},
}, {timestamps:true});

export default mongoose.models.OwnersEquity || mongoose.model("OwnersEquity", OwnersEquitySchema);