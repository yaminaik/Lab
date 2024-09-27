const { Schema, model } = require("mongoose")

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title:String,
            description:String,
            completed:Boolean
        },
        {timestamps:true}
    );
    schema.method("toJSON",function(){
        const{__v,_id,...object}= this.toObject();
        object.id =_id;
        return object;
    });
    const ToDo = mongoose.model("todo",schema);
    return ToDo;
};