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

  function showType() {
    var select = document.getElementById("selectEvent");
    var element = document.getElementById("type");
  
    if (select.value != "choose") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  function showPayment() {
    var select = document.getElementById("selectType");
    var elementPayment = document.getElementById("Payment");
    var elementTime = document.getElementById("Time");
    var elementClothes = document.getElementById("Clothes");
  
    if (select.value == "choose") {
      elementPayment.style.display = "none";
      elementTime.style.display = "none";
      elementClothes.style.display = "none";
      
    }
    if (select.value == "money") {
      elementPayment.style.display = "block";
      elementTime.style.display = "none";
      elementClothes.style.display = "none";
    }
    if (select.value == "time") {
      elementPayment.style.display = "none";
      elementTime.style.display = "block";
      elementClothes.style.display = "none";
    }
    if (select.value == "clothes") {
      elementPayment.style.display = "none";
      elementTime.style.display = "none";
      elementClothes.style.display = "block";
    }
  }
   
  function popUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
   
