const mongoose= require ('mongoose');

const LiabilitySchema = new mongoose.Schema({
    accountname: {type:String, required:true, unique:true},
    total: {type:Number,default:"0"},
}, {timestamps:true});

export default mongoose.models.Liability || mongoose.model("Liability", LiabilitySchema);