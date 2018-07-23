var isReadOnly = true;
var new_object = [];
function saveToCSVTable() {
// on confirm Save
     var url = '/updateXML';
     var body = {
        data: new_object
     };
     fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(function(res) {
        console.log(res)
		//final popup message.
		alert("will reflect in 24hrs")
		//var popup = document.getElementById('popup');
		      }).catch(function(err) {
        console.log(err)
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

function renderDataToHtml(jsonObject, headerDiv, body) {
  var header = [];
  jsonObject.forEach(function(data, i) {
    var container = document.createElement('div');
    container.className = 'col-md-12 data-container';
    var div = document.createElement('div');
    div.className = 'col-md-3 table-data';
    var input = document.createElement('input');

    var keys = Object.keys(data);
    keys.forEach(function(key) {
      if (header.indexOf(key) === 1) { header.push(key) }       
    })
    keys.forEach(function(key, itr) {
      if ( itr === 0 ) {
        div.textContent = data[key];
        container.appendChild(div);
      } else {
        input.value = data[key];
        input.disabled = isReadOnly;
        input.id = i + '_' + key;
        input.className='col-md-3 input-field table-data';
        container.appendChild(input);
      }
      body.appendChild(container);
      
    })
  })
  var inputs = document.getElementsByClassName('input-field');
  for(var x = 0; x < inputs.length; x++) {
     inputs[x].onchange = function(e) {
        var value = e.target.value;
        var id = e.target.id;

        var path = id.split('_');
        new_object[path[0]][path[1]] = value;
        console.log(new_object);
     };
  }

   header.forEach(function(title) {
    var div = document.createElement('div');
      div.textContent = title;
      div.className = 'col-md-3 table-header';
      headerDiv.appendChild(div);
    })

}

function handleFileSelect() {
  var url = '/getDataFromFile'
  fetch(url, {cache: 'no-store'}).then(async function(res) {
    console.log(res)
    var response = res.json();
			    var json_object = await response;
		console.log(json_object);
    new_object = json_object.slice(0);
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

    renderDataToHtml(json_object, header, body);
    document.getElementById('Edit').addEventListener('click', toggleInput, false);
    document.getElementById('Save').addEventListener('click', toggleInput, false);

  }).catch(function(err) {
    console.log(err)
  })
  };
  
  
  
  
  
  
  
  
  
  
  
  

 
 
 
 