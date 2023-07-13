const mongoose= require ('mongoose');

const JournalSchema = new mongoose.Schema({
    debitList: {type:Array, required:true},
    creditList: {type:Array, required:true},
    date: {type:String, required:true},
}, {timestamps:true});

export default mongoose.models.Journal || mongoose.model("Journal", JournalSchema);