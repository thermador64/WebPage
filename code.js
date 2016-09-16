$(document).ready(function () {
	$('#mainDiv').after('<div id="div2"><div>');
	$('#angDiv').find('input').after('<br /><br /><button class="ui-button ui-widget ui-corner-all" id="myButton">Add values</button>');
	$('#myTable').after('<div id="myDialog">' +
		'<div class="dialogLine"><label>Value1:</label><input type="text" id="addValue1" ></div><br />' +
		'<div class="dialogLine"><label>Value2:</label><input type="text" id="addValue2" ></div><br />' + 
		'<div class="dialogLine"><label>Value3:</label><input type="text" id="addValue3" ></div></div>');
	$('#myButton').on('click', function (event) { 
		$("#myDialog").dialog({
						autoOpen: false,
						height: 290,
						width: 430,
						modal: true,
						buttons: {
								"Add": function() {
									var val1 = $('#addValue1').val();
									var val2 = $('#addValue2').val();
									var val3 = $('#addValue3').val();
									var newRow = '<tr><td class="body">' + val1 + '</td><td class="body">' + val2 + '</td><td class="body">' + val3 + '</td></tr>';
									$('#myTable').append(newRow);
									$('#addValue1').val('');
									$('#addValue2').val('');
									$('#addValue3').val('');
								},
								"Cancel": function() {
										$( this ).dialog( "close" );
								}
						},
						close: function() {
						    $( this ).dialog( "close" );
						}
					});
		$("#myDialog").dialog( "open" );	
	});
	
	$.ajax({
		url: 'data.txt',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var tbl = '';
			 _.forIn(data, function (value, key) { 
				tbl += '<tr>'
				for(var i = 0; i < data[key].length; i++){
					if(key == 'titles'){
						tbl += '<td class="header">' + data[key][i] + '</td>'
					}
					else{
						tbl += '<td class="body">' + data[key][i] + '</td>'
					}
				}
				tbl += '</tr>'
			 });
			$('#myTable').append(tbl);
		},error: function(var1, var2, var3) {
			$('#div2').text(JSON.stringify(var1));
		}
	});
	
});