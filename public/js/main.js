var isReadOnly = true;
var new_object = [];
var tableDescription = {
  'Report Threshold': 'Description One',
  'Report Threshold 2': 'Description two'
}

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

    var d = document.getElementById('messagebox');
    d.textContent="Updates Will Reflect In 24 Hours";
    // message should disappear after 5 seconds
    setTimeout(function(){ d.textContent=""; }, 4000);	
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

    // adding data to table header
    keys.forEach(function(key) {
      if (header.indexOf(key) === 1) { header.push(key) }       
    })

    header.forEach(function(title) {
      var div = document.createElement('div');
      div.textContent = title;
      div.className = 'col-md-3 table-header';
      headerDiv.appendChild(div);
    })

    // adding rest of the rows 
    keys.forEach(function(key, itr) {
      if ( itr === 0 ) { // first column data of table
        var content = data[key];
        div.textContent = content;
        div.title = tableDescription[content]; // show description of the Threshold data
        container.appendChild(div); 
      } else {
        input.value = data[key];
        input.disabled = isReadOnly; // input is disabled by default
        input.id = i + '_' + key;
        input.className='col-md-3 input-field table-data';
        container.appendChild(input);
      }

      body.appendChild(container);
    })
  })

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
  
  
  
  
  
  
  
  
  
  
  
  

 
 
 
 