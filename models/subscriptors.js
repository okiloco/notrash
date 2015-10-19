var Mongo=require("mongodb"),
Db=Mongo.Db,
Server=Mongo.Server;

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
			SUS.subscriptors.insert(newData,callback(null));
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
}
SUS.edit=function(newData,callback){
	SUS.subscriptors.findOne({_id:this.getObectId(newData.id)},function(e,obj){
		obj.name=newData.name;
		obj.email=newData.email;
		SUS.subscriptors.save(obj);
		callback(obj);
	});
}
SUS.getObectId=function(id){
	return SUS.subscriptors.db.bson_serializer.ObjectID.createFromHexString(id);
}
