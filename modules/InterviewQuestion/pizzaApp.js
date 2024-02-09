const mongoose = require('mongoose');
const {Schema} = mongoose;

const pizza = new Schema({
    pepperoni:{
        type: String 
        //        type: Boolean
    },
    sausage:{
        type: String
        //        type: Boolean
    },
    ham:{
        type: String
                //        type: Boolean  
    },
    chicken:{
        type: String
                //        type: Boolean
    },
    bacon:{
        type: String
                //        type: Boolean
    },
    olives:{
        type: String
                //        type: Boolean
    },
    pineapple:{
        type: String
                //        type: Boolean
    },
    spinach:{
        type: String
                //        type: Boolean
    }

},{
    timestamps:Date
})

const Pizza = mongoose.model('Pizza',pizza )
module.exports = Pizza