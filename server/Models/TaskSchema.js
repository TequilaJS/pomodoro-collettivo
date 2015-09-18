var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var TaskSchema = new Schema({
    name: String,
    description: String,
	assigneeId: Number,
    pomodoroTicks: Number
});

//Export schema so it can be used where it is needed
module.exports 	= mongoose.model('Task', TaskSchema);