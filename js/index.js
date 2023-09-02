//if escape key close out lightbox
window.document.onkeydown = function (e) {
	if (!e) {
		e = event;
	}
	if (e.keyCode == 27) {
		lightbox_close(); lightbox2_close();
	}
}

function lightbox_open() {
	document.getElementById('light').style.display = 'block';
	document.getElementById('fade').style.display = 'block';
}

function lightbox_close(value) {
	if(value != null) {
		let goalText = document.getElementById('weight-goal-text');
		let checkbox = document.getElementById('weight-goal-checkbox');
		if(value == 'gain') {
			goalText.innerHTML = 'GAIN WEIGHT';
		} else if(value == 'lose') {
			goalText.innerHTML = 'LOSE WEIGHT'
		} else {
			goalText.innerHTML = 'MAINTAIN WEIGHT';
		}
		//check the checkbox if automatic or not
		if(checkbox.checked) {
			goalText.innerHTML += " (AUTOMATIC)";
		}
		
	}
	document.getElementById('light').style.display = 'none';
	document.getElementById('fade').style.display = 'none';
}

function lightbox2_open() {
	document.getElementById('light2').style.display = 'block';
	document.getElementById('fade2').style.display = 'block';
}

function lightbox2_close() {
	document.getElementById('error-text').innerHTML = "";
	document.getElementById('error-text').style.display = "none";
	document.getElementById('light2').style.display = 'none';
	document.getElementById('fade2').style.display = 'none';
}

//The following variables are only to load for reset_profile,
//NOT for update_profile().
var profile_name;
var profile_height;
var profile_weight;
var profile_weight_goal;
var profile_birthdate;
function load_profile() {
	//TODO: Loads profile stats from the database and saves them to
	//their respective variables (listed above this function).
	//Form variables to load into:
	//	name: document.getElementById('profile-name-input').value
	//	height: document.getElementById('profile-height-input').value
	//	weight: document.getElementById('profile-weight-input').value
	//	weight goal: document.getElementById('weight-goal-text').innerHTML
	//	date: document.getElementById('profile-birthdate-input').value
}

function update_profile() {
	//TODO: Update profile data based on current info in the form.
	
	
	
	//Update local variables for reset_profile.
	profile_name = document.getElementById('profile-name-input').value;
	profile_height = document.getElementById('profile-height-input').value;
	profile_weight = document.getElementById('profile-weight-input').value;
	profile_weight_goal = document.getElementById('weight-goal-text').innerHTML;
	profile_birthdate = document.getElementById('profile-birthdate-input').value;
}

function reset_profile() {
	//Reset profile with the vars initialized from load_profile.
	if(profile_name == null) { 
		console.log("Error: load_profile did not initialize variables!"); 
	} else {
		document.getElementById('profile-name-input').value = profile_name;
		document.getElementById('profile-height-input').value = profile_height;
		document.getElementById('profile-weight-input').value = profile_weight;
		document.getElementById('weight-goal-text').innerHTML = profile_weight_goal;
		document.getElementById('profile-birthdate-input').value = profile_birthdate;
	}
}

function export_data() {
	//Exports data via the params specified by our form.
	//If invalid input, give error text and don't close window.
	let file_format = document.querySelectorAll('input[name="file-format"]:checked')[0].value;
	let exports = document.querySelectorAll('input[name="export-type"]:checked');
	
	if(exports.length == 0) {
		//Give error text- they need to select something to export
		document.getElementById('error-text').innerHTML = "Error: No selected data to export!";
		document.getElementById('error-text').style.display = "block";
	} else {
		//TODO: Start exporting
		
		
		lightbox2_close();
	}
}

//when import history button is clicked, click hidden file input button
$("#import-history-btn").click(function(e){
	e.preventDefault();
	$("#import-history-file").trigger('click');
});
//hide the import history file input button
$("#import-history-file").css('opacity','0');
$("#import-history-file").css('filter','alpha(opacity = 0');

//when a file is uploaded, start importing it's data.
$("#import-history-file").on('change', import_history);

function import_history() {
	//Imports history data from a file.
	//Make sure it's a csv, xml, or json
	var file = document.getElementById('import-history-file').files[0];
	if (file) {
		console.log("File to import: " + file.name);
	}
	var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
	console.log(['csv','xml', 'json'].includes(extension));
	if(['csv','xml', 'json'].includes(extension) == false) {
		//Generate error message- wrong file format
		document.getElementById('error-import-text').innerHTML = "Error: Incorrect file import type!";
		document.getElementById('error-import-text').style.display = "block";
		setTimeout( ()=> {
			document.getElementById('error-import-text').innerHTML = "";
			document.getElementById('error-import-text').style.display = "none";
		}, 5000)
	} else {
		//TODO: Import history data now
	}
}

function load_history() {
	//TODO: Loads existing history data from the database into the History table.
	document.getElementById('history-list').style = "display: table";
}

//Ingredient/Shopping List tb switcher
function switchTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
//auto set it to the ingredients tab
document.getElementById('ingredients-tab-btn').click();


//Search function for ingredients and shopping list tables
(function() {
	'use strict';

var TableFilter = (function() {
 var Arr = Array.prototype;
		var input;
  
		function onInputEvent(e) {
			input = e.target;
			var table1 = document.getElementsByClassName(input.getAttribute('data-table'));
			Arr.forEach.call(table1, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, filter);
				});
			});
		}

		function filter(row) {
			var text = row.textContent.toLowerCase();
       //console.log(text);
      var val = input.value.toLowerCase();
      //console.log(val);
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = onInputEvent;
				});
			}
		};
 
	})();

  /*console.log(document.readyState);
	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
      console.log(document.readyState);
			TableFilter.init();
		}
	}); */
  
 TableFilter.init(); 
})();