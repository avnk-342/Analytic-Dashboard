const { default: mongoose } = require("mongoose")
const mongoos = require("mongoose")
const schema = mongoos.Schema

let data = new schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    intensity:{type:Number},
    sector:{type:String},
    topic:{type:String},
    insight:{type:String},
    url:{type:String},
    region:{type:String},
    added:{type:String},
    published:{type:String},
    country:{type:String},
    relevance:{type:Number},
    pestle:{type:String},
    source:{type:String},
    title:{type:String},
    likelihood:{type:Number},
    end_year:{type:Number},
    impact:{type:Number},
    start_year:{type:Number},
})

module.exports = mongoos.model("insights", data)