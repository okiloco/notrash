/* GET home page. */
var SU=require('../models/subscriptors');
module.exports=function(app){
	app.get('/',function(req,res){
		SU.list(function(e,subs){
			res.render('index', { title: 'notrash', subscriptors:subs,error:'' });				
		});
	});

	app.post('/',function(req,res){
  		SU.create({name:req.param('name'),email:req.param('email')},function(err,obj){
			SU.list(function(e,subs){
  				res.render('index', { title: 'notrash', subscriptors:subs,error:err });				
			});
  		});
	});
	app.post('/save',function(req,res){
  		SU.edit({name:req.param('name'),email:req.param('email')},function(err,obj){
  			if(err){
  				res.redirect('/');
  			}else{
  				res.send('Error al actualizar registro',400);
  			}
			
  		});
	});

}
/*exports.index = function(req, res){
  res.render('index', { title: 'notrash' });
};*/
