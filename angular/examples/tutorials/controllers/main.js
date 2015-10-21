var app=angular.module('MyFirstApp',['ngRoute']);
app.controller("firstController",
	["$scope","$http",function($scope,$http){
		$scope.nombre="Fabian";	
		$scope.newPost={
		};
		$scope.posts=[
		];
		$http.get("http://jsonplaceholder.typicode.com/posts").
		success(function(data,status,headers,config){
			$scope.posts=data;
			// console.log(data);
		}).
		error(function(error,status,headers,config) {
			/* Act on the event */
		});
		$scope.addPost=function(){
			/*$scope.newPost.title=$scope.nombre;
			$scope.posts.push($scope.newPost);
			$scope.newPost={
				body:""
			};*/
			$http.post("http://jsonplaceholder.typicode.com/posts",{
				title:$scope.newPost.title,
				body:$scope.newPost.body,
				userId:1
			}).
			success(function(data,status,headers,config){
				$scope.posts.push(data);
				$scope.newPost={};
				console.log(data);
			}).
			error(function(error,status,headers,config) {
				/* Act on the event */
			});
		};

	}]
);
