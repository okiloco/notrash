$(document).ready(function(){
	$('a.cancel').on('click',function(ev){
		ev.preventDefault();
		var li=$(this).closest('li');
		console.log(li.find('form.edit.form'))
		li.find('div.text').removeClass("hidden");
		li.find('form.edit').addClass("hidden");
	});
	$('a.save').on('click',function(ev){
		ev.preventDefault();
		var li=$(this).closest('li');
		li.find('div.text').removeClass("hidden");
		li.find('form.edit').addClass("hidden");
		$(this).closest('form.edit').submit();
	});
	$('a.edit').on('click',function(ev){
		ev.preventDefault();
		var li=$(this).closest('li');
		console.log(li.find('form.edit.form'))
		li.find('div.text').addClass("hidden");
		li.find('form.edit').removeClass("hidden");
	});
	$('a.delete').on('click',function(ev){
		ev.preventDefault();
		var li=$(this).closest('li');
		$.ajax({
			url: '/delete',
			type: 'post',
			data: {id: li.find('input[name=id]').val()},
			success:function(data){
				li.remove();
			}
		});
		
		var li=$(this).closest('li');
		console.log(li.find('form.edit.form'))
		li.find('div.text').addClass("hidden");
		li.find('form.edit').removeClass("hidden");
	});
});