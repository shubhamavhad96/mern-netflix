import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {                                     // this is the object that we are using to create the user model and it contains the username field
        type: String,       
        required: true,                              // this is the required field that means the username is required
        unique: true,                                // this is the unique field that means the username should be unique                        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        default: ""
    },
    searchHistory: {
        type: Array,                                // why array because we want to store the search history of the user
        default: []
    }
}); // this is the schema that we are using to create the user model and schema means the structure of the document means how the document will look like


export const User = mongoose.model('User', userSchema);  // we craeted a model called User and that says create a user collection in the database and the structure of the document will be the userSchema

// the model name should be singular and the letter should be capital 