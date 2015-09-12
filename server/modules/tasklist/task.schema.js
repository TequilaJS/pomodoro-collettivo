var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var TaskSchema = new Schema({
    name: String,
    email: String,
    location: String,
    primary: String
});

//Export schema so it can be used where it is needed
module.exports 	= mongoose.model('Contact', ContactSchema);