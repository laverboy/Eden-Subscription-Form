$(document).ready(function(){
		
		/*==========	Effects	==========*/
		$('#address').hide();
		$('#more').on('click', function(e){
			e.preventDefault();
			$('#address').slideToggle(300);
			$('#more span').toggle();
		});
		
		/*========== Setup Functions ==========*/
		
		var subForm = $('#subForm');
				
		function clearForm () {
			subForm.find('input').not(':submit').val('');
			$('input:checked').attr('checked', false);
			$('input#natvis').attr('checked', 'checked');
			$('#alert').html("Thank You for subscribing!").fadeIn(1000).delay(2000).fadeOut(1000);
			$('#address:visible').slideUp();
		}
				
		window.storeToCSV = function () {
			
			var str = '';
			
			for(var i = 0; i < localStorage.length ; i++)
			{
				var key = localStorage.key(i),
					array = $.parseJSON(localStorage.getItem(key)),
					line = '';

				if( i === 0 ){
					var firstLine = '';
					for (var index in array) {firstLine += index + ',';}
					firstLine = firstLine.slice(0,line.length-1);
					str += firstLine + '\r\n';					
				}

				for (var index in array) { line += array[index] + ','; }
				line = line.slice(0,line.length-1);				
				str += line + '\r\n';

			}
			console.log(str);
			return str;
		}
		
		function adminScreen () {
			$('#adminScreen').fadeIn('slow');
			$('#download').attr('href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(storeToCSV()) );
		}

		$.fn.serializeJSON = function () {
			var json = {};
			jQuery.map($(this).serializeArray(), function(n, i){
				json[n.name] = n.value;
			});
			return json;
		};

		function getSerial () {
			var serialise = subForm.find('input').not(':checkbox').not(':submit').serializeJSON();
			
			$('#subForm input:checkbox').each(function () {
				var name = this.name,
				value = this.checked ? this.value : "false";
				
				serialise[name] = value;
			});
			
			return serialise;
		}
		
		function getTime () {var time = new Date(); return time;}
		
		
		/*========== Events ==========*/
		if(window.localStorage){
		
			subForm.on('submit', function (e) {
				e.preventDefault();
				localStorage.setItem( getTime(), JSON.stringify(getSerial()) );
				clearForm();
			});
			
		}else{
			
			subForm.on('submit', function (e) { e.preventDefault(); });
			
			alert("I'm afraid this browser is not compatible. Why not try Google Chrome.");
		}
		
		$('#admin').on('click', function(e){
			e.preventDefault();
			adminScreen();
		});
		
		$('button#cancel').on('click', function(e){
			e.preventDefault();
			location.reload();
		});
		
		$('button#clear').on('click', function(e){
			e.preventDefault();
			var answer = confirm("Are you sure you want to delete all entries in the database?");
			if (answer) { localStorage.clear(); }
			location.reload();
		});
		
		
});