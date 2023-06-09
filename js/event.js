// Add an event to the table
function create() {
    var nameInput = document.getElementById("nameInput");
    var nameValue = nameInput.value.trim();
  
    // Check if the name input is blank
    if (nameValue === "") {
      return;
    }
  
    var table = document.querySelector("#eventTable");
    var row = document.createElement("tr");
  
    var startDate = document.createElement("td");
    startDate.textContent = document.getElementById("startDateInput").value;
  
    var endDate = document.createElement("td");
    endDate.textContent = document.getElementById("endDateInput").value;
  
    var name = document.createElement("td");
    name.textContent = nameValue;
  
    var deletion = document.createElement("td");
    var button = document.createElement("input");
    button.type = "button";
    button.value = "delete";
    button.setAttribute("onclick", "remove(this)");
  
    deletion.appendChild(button);
    row.appendChild(startDate);
    row.appendChild(endDate);
    row.appendChild(name);
    row.appendChild(deletion);
    table.appendChild(row);
  
    // Reset the name input value
    nameInput.value = "";
  }
  
  // Remove an event from the table
  function remove(event) {
    var i = event.parentNode.parentNode.rowIndex;
    document.getElementById("eventTable").deleteRow(i);
  }
