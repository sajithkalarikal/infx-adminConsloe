var isReadOnly = true;
var new_object = [];
var json_object = [];
// var tableDescription = {
  // 'RPT1081 CNA   Threshold Alerts': 'Description One',
  // 'RPT1054 Sirius Double Sold': 'Description two',
  // 'RPT1044 Scems Double Sold Validation': 'Description 3',
  // 'RPT1084 CNA   Threshold Alerts': 'Description 4'
// }




function saveToCSVTable() {
  // on confirm Save
  var url = '/updateXML';

  $.post(url, {data: JSON.stringify(new_object)}, function(res) {
    console.log(res)

	
	//var d = document.getElementById('messagebox');
//    d.textContent="Note: Change's Will Reflect In The Dashboard After The Control Trigger's";
	
    // message should disappear after 5 seconds
   // setTimeout(function(){ d.textContent=""; },300000);
	
     })
}





function  toggleInput(event) {
  var value = event.target.id;
  isReadOnly = value !== 'Edit';
  var inputs = document.getElementsByClassName('input-field');
  for (var item = 0; item < inputs.length; item++) {
    inputs[item].disabled = isReadOnly;    
  }
  if (isReadOnly) {
	  // open popup
		var popup = document.getElementById('popup');
		console.log(popup)
		popup.style.display = 'block';
		
  }
}

function renderDataToHtml(data, i, headerDiv, body) {
	var header = [];
	var keys = Object.keys(data);
	
	// adding data to table header
	keys.forEach(function(key) {
		if (header.indexOf(key) === -1 ) {
			header.push(key) 
		}       
	})
	
	
	header.forEach(function(title) {
		var div = document.createElement('div');
		div.textContent = title;
		div.className = ' table-header';
		
		headerDiv.appendChild(div);
	})
	
	for(var a = 1; a <= 4; a++) {	
		var x= headerDiv.children.length
		headerDiv.children[x-a].className = 'backgroundcolor' + a + ' table-header' 
	}


	var container = document.createElement('div');
	container.className = 'body-container ';
    // adding rest of the rows 
    keys.forEach(function(key, itr) {
		if(itr >= keys.length - 4 ){
			var input = document.createElement('input');
			input.value = data[key];
			// input.style = "white";
			input.disabled = isReadOnly; // input is disabled by default
			input.id = i + '_' + key ;
			input.className='input-field table-data';
			container.appendChild(input);
		} else {      
			var content = data[key].trim();
			var div = document.createElement('div');
			div.className = 'table-data ';
			div.textContent = content;
			//div.title = tableDescription[content]; // show description of the Threshold data
			container.appendChild(div); 
        }
    })
	body.appendChild(container);
	// to aligne all the table cell
	var maxHeight = 0;
		$('.table-data').each(function (index, node) {
		var header = $('.table-header')[index];
		maxHeight = header.offsetHeight;
		maxHeight = Math.max(maxHeight, node.offsetHeight);
		header.style.minHeight = maxHeight + "px";
		node.style.minHeight = maxHeight + "px";
		
	});


	
	var inputs = document.getElementsByClassName('input-field');
	// when input is not disabled - call function when editing the input column
	for(var x = 0; x < inputs.length; x++) {
     inputs[x].onchange = function(e) {
        var value = e.target.value;
        var id = e.target.id;

        var path = id.split('_');
        new_object[path[0]][path[1]] = value;
        console.log(new_object);
     };
  }
	
}
// get file from file
function handleFileSelect() {
	
	if (navigator.userAgent.search('Chrome') > -1) {
		$('head').append('<link rel="stylesheet" href="./css/main.css" type="text/css" />');
	} else {
		$('head').append('<link rel="stylesheet" href="./css/ie.css" type="text/css" />');
	}
	// $('.container-fluid').show();
	// $('.loader_container').hide();
	var url = '/getDataFromFile'
	// document.write(url);
	$.get(url).then( function(res) {
		json_object = res;
		console.log(json_object);
		new_object = json_object.slice(0);
	
		var select = document.getElementById("sel1"); 
		// var arryList = document.getelementbyclassName('table-data')
		
		var options= [] 
		new_object.forEach(function(arrayitem){
			options.push(arrayitem['Report']);	
		}) 

		for(var i = 0; i < options.length; i++) {
			var opt = options[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = i;	
			select.appendChild(el)
		};
	
    var actionList = ['Edit', 'Save'];
    var action = document.getElementById('actions');

    actionList.forEach(function(action) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = action;
      button.id = action;
      button.className = 'btn btn-outline-primary btn-sm'
	  if(action === 'Save') {
		  button.setAttribute("data-toggle","modal");
		  button.setAttribute("data-target","#myModal");
	  }

      actions.appendChild(button);
    })
    header = document.getElementById('headercontainer');
    body = document.getElementById('bodycontainer');

    renderDataToHtml(json_object[0], 0, header, body);
    document.getElementById('Edit').addEventListener('click', toggleInput, false);
    document.getElementById('Save').addEventListener('click', toggleInput, false);

	
  }).catch(function(err) {
    console.log(err)
  })
};
  //drop down to slect one report at a time
function selectreport(value){
	var header = document.getElementById('headercontainer');
    var body = document.getElementById('bodycontainer');

	while (body.hasChildNodes()) {
		body.removeChild(body.lastChild);
	}
	while (header.hasChildNodes()) {
		header.removeChild(header.lastChild);
	}
	var rep = json_object[value];
	renderDataToHtml(rep, value, header, body);
	
}

	
  
  
  
  
  
  
  
  
  

 
 
 
 