const mongoose= require ('mongoose');

const RevenueSchema = new mongoose.Schema({
    accountname: {type:String, required:true, unique:true},
    total: {type:Number,default:"0"},
}, {timestamps:true});

export default mongoose.models.Revenue || mongoose.model("Revenue", RevenueSchema);