const mongoose= require ('mongoose');

const OwnersDrawingsSchema = new mongoose.Schema({
    accountname: {type:String, required:true, unique:true},
    total: {type:Number,default:"0"},
}, {timestamps:true});

export default mongoose.models.OwnersDrawings || mongoose.model("OwnersDrawings", OwnersDrawingsSchema);