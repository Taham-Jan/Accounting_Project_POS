const mongoose= require ('mongoose');

const ContraAssetSchema = new mongoose.Schema({
    accountname: {type:String, required:true, unique:true},
    total: {type:Number,required:true},
}, {timestamps:true});

export default mongoose.models.ContraAsset || mongoose.model("ContraAsset", ContraAssetSchema);