var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var URL='';
if (process.env.NODE_ENV === 'production') {
    URL = process.env.MONGO_URI;
}
else{
URL = 'mongodb://localhost/Test';
}
    mongoose.connect('mongodb://amm:7371@ds123499.mlab.com:23499/todoammar');
var db = mongoose.connection;
// check connection

db.once('open',function () {
    console.log('Conected to database');

});
var Schema = mongoose.Schema;

var TASKSchema = new Schema(
    {
        text: {type: String, required: true},
        status: {type: Boolean, required:true}
    } );

var task = mongoose.model('TASK', TASKSchema);


//check for db errors
db.on('error',function (err) {
    console.log(err);

});
router.post('/UPD', function(req, res, next) {
    var id = req.body.ida;
    var text = req.body.tash;
   // console.log(id+"---"+text)
    task.findById(id, function(err, doc) {

        doc.text = text;

        doc.save();
    });
    res.redirect('/');
});
/* GET home page. */
router.get('/', function(req, res, next) {

    task.find()
        .then(function(doc) {
            if(doc) {

                task.count({status:false},function (err,d) {
                    if(err){
                        console.log("Rooooooooooooo");
                        console.log(err);
                    }
                    else {

                        res.render('index', {items: doc ,coun:d });
                    }

                });

            }
            else
                res.render('index');
        });

});

// get all active tasks
router.get('/active', function(req, res, next) {

    task.find({status:false})
        .then(function(doc) {
            res.render('index', {items: doc});
        });
   // res.render('index');
});
// get all completed tasks
router.get('/complete', function(req, res, next) {

    task.find({status:true})
        .then(function(doc) {
            res.render('index', {items: doc});
        });
    //res.render('index');
});

// Save the task
router.post('/save', function(req, res, next) {
var a = new task();
a.text = req.body.tas;
a.status = false;

a.save();

res.redirect('/');
});
router.get('/update/:id', function(req, res, next) {
    var id = req.params.id;

    task.findById(id, function(err, doc) {

        doc.status = !doc.status;

        doc.save();
    })
    res.redirect('/');
});

router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;

    task.findById(id,function (err,doc) {
       if(err){
           console.log(err);
           res.redirect('/');
       }
       else
       {
           console.log(doc);
           doc.remove();
           res.redirect('/');
       }
    });


});

// Delete all complted
router.get('/completed', function(req, res, next) {

   task.remove({status:true},function (err) {
        console.log(err);
    });
   res.redirect('/');
});
module.exports = router;
