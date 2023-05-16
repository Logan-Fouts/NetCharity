async function loadOrgs(){
    console.log("Loading Orginizations...")
    const orgs = await loadOrganizations()
    console.log("Done")
    
    var list = document.getElementById("selectOrg");
    for (let i = -1; i < orgs.length; i++) {
        const option = document.createElement('option');
        if(i==-1){
            option.textContent = "Choose an Organization";
            option.value = "choose";
        }
        else {
            option.textContent = orgs[i].name;
            option.value = orgs[i].name;
        }
      
      
      list.appendChild(option);
    }
}

  async function loadOrganizations() {
    const response = await fetch('../data/charities.json');
    const orgsData = await response.text();
    const lines = orgsData.split(/\r?\n/);
    orgs = [];
    for (const line of lines) {
      orgs.push(JSON.parse(line));
    }
    return orgs;
  }

function showEvent() {
    var select = document.getElementById("selectOrg");
    var element = document.getElementById("Event");
  
    if (select.value != "choose") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  function showPayment() {
    var select = document.getElementById("selectEvent");
    var element = document.getElementById("Payment");
  
    if (select.value != "choose") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
   
  function popUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
   
