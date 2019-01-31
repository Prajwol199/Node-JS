$(document).on('click','#userDelete',function(e){
	e.preventDefault();
    var choice = confirm($(this).attr('data-confirm'));

    if (choice) {		        
		var id = $(this).data('route');
		$.ajax({
	        type: "delete",
	        url: '/user/delete/'+id,
	        success: function(response) {
	            window.location='/';
	        },
	        error: function(response) {
	            alert('User Not deleted');
	        }
	    });
    }
   	return false;
});

$(document).on('click','#productDelete',function(e){
	e.preventDefault();
	var choice = confirm($(this).attr('data-confirm'));

    if (choice) {
		var id = $(this).data('id');
		$.ajax({
	        type: "delete",
	        url: '/products/'+id+'/delete',
	        success: function(response) {
	            window.location='/products';
	        },
	        error: function(response) {
	            alert('User Not deleted');
	        }
	    });
    }
    return false;
});

$(document).on('click','#imageDelete',function(e){
	e.preventDefault();
	var choice = confirm($(this).attr('data-confirm'));

    if (choice) {
		var id = $(this).data('id');
		$.ajax({
	        type: "delete",
	        url: '/image/delete/'+id,
	        success: function(response) {
	            window.location='/image';
	        },
	        error: function(response) {
	            alert('Image Not deleted');
	        }
	    });
    }
   	return false;
});

$(document).on('submit','#updateUser',function(e){
	e.preventDefault();
	var id = $(this).data('id');
	var data = {};
	data ['name'] = $("[name=name]").val();
	data ['email'] = $("[name=email]").val();
	$.ajax({
        type: "put",
        url: '/user/update/'+id,
        data: data,
        dataType: "x-www-form-urlencoded",
        success: function(response) {
            window.location='/';
        },
        error: function(response) {
            // alert('User Not Updated');
            window.location='/';
        }
    });
});

$(document).on('submit','#updateProduct',function(e){
	e.preventDefault();
	var id = $(this).data('id');
	var data = {};
	data ['name'] = $("[name=name]").val();
	data ['price'] = $("[name=price]").val();
	$.ajax({
        type: "put",
        url: '/products/'+id+'/update',
        data: data,
        dataType: "x-www-form-urlencoded",
        success: function(response) {
            window.location='/';
        },
        error: function(response) {
            // alert('User Not Updated');
            window.location='/products';
        }
    });
});