$(document).ready(function(){
	$('a.cancel').on('click',function(ev){
		ev.preventDefault();
		var li=$(this).closest('li');
		console.log(li.find('form.edit.form'))
		li.find('div.text').removeClass("hidden");
		li.find('form.edit.form').addClass("hidden");
	});
	$('a.save').on('click',function(ev){
		ev.preventDefault();
		$(this).parent().submit();
	});
	$('a.edit').on('click',function(ev){
		ev.preventDefault();
		var li=$(this).closest('li');
		console.log(li.find('form.edit.form'))
		li.find('div.text').addClass("hidden");
		li.find('form.edit.form').removeClass("hidden");
	});

})