import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true , "token is required to be added to the blacklist"], 
    },
},{
    timestamps : true
});  

const BlacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistTokenModel