var bson=require("bson");
var mongodb=require("mongodb"),
Db=mongodb.Db,
Server=mongodb.Server;

var ObjectID = mongodb.ObjectID;
var dPort=27017,
dHost="localhost",
dbName="notrash";

var SUS={};

SUS.db=new Db(dbName,new Server(dHost,dPort,{auto_reconnect:true},{}));
SUS.db.open(function (e,d) {
	if(e){
		console.log(e);
	}else{
		console.log("Conectado exitosamente a base de datos: "+dbName);
	}
});
SUS.subscriptors=SUS.db.collection('subscriptors');

module.exports=SUS;

SUS.create=function(newData,callback){
	SUS.subscriptors.findOne({email:newData.email},function(e,obj){
		if(obj){
			callback("Ese email ya existe.");
		}else{
			SUS.subscriptors.insert(newData,function(e){
				SUS.subscriptors.find().toArray(function(err,res){
					if(err){
						callback(err);
					}else{
						callback(null,res);
					}
				});
			});
		}
	});
};
SUS.list=function(callback){
	SUS.subscriptors.find().toArray(function(e,res){
		if(e){
			callback(e);
		}else{
			callback(null,res);
		}
	});
};
SUS.listar=function(req, res){
	SUS.subscriptors.find().toArray(function(e,result){
		if(e){
			callback(e);
		}else{
			console.log(result)
			callback(result);
		}
	});
};
SUS.edit=function(newData,callback){
	SUS.subscriptors.findOne({_id:new mongodb.ObjectID(newData.id)},function(e,obj){
		obj.name=newData.name;
		obj.email=newData.email;
		SUS.subscriptors.save(obj);
		callback(obj);
	});
}
SUS.delete=function(id,callback){
	SUS.subscriptors.remove({_id:new mongodb.ObjectID(id)},function(e,obj){
		if(e){
			callback(e);
		}else{
			callback(e,obj);
		}
	});
}
