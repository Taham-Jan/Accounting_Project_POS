const mongoose= require ('mongoose');

const ExpenseSchema = new mongoose.Schema({
    accountname: {type:String, required:true, unique:true},
    total: {type:Number,default:"0"},
}, {timestamps:true});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);