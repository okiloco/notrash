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
  		SU.edit({id:req.param('id'),name:req.param('name'),email:req.param('email')},function(err,obj){
  			if(err){
  				res.redirect('/');
  			}else{
  				res.send('Error al actualizar registro',400);
  			}
  		});
	});
	app.post('/delete',function(req,res){
		// console.log(req.body._id);
  		SU.delete(req.body.id,function(err,o){
  			if(!o){
  				res.send('Registro Eliminado con éxito',200);
  			}else{
  				res.send('El registro no existe.',400);  				
  			}

  		});
	});

}
/*exports.index = function(req, res){
  res.render('index', { title: 'notrash' });
};*/
