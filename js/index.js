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
  
 TableFilter.init(); 
})();

var demos_searchbar = document.getElementById('demos-searchbar-input')

demos_searchbar.addEventListener("keydown", function(event){
	if (event.keyCode === 13) {
		event.preventDefault();
		var input = demos_searchbar.value;
		keywords = input.trim().split(" ");
		console.log(keywords);
		input = '';
	}
});