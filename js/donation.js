const events = [
  {
    id: "1",
    event: "event1",
    paymentType: "money",
    organization: "Coalition for the Homeless"
  },
  {
    id: "2",
    event: "event2",
    paymentType: "time",
    organization: "Action on Smoking and Health"
  },
  {
    id: "3",
    event: "event1",
    paymentType: "time",
    organization: "African Wildlife Foundation"
  },
  {
    id: "4",
    event: "event2",
    paymentType: "clothes",
    organization: "Alley Cat Allies"
  },
  {
    id: "5",
    event: "event2",
    paymentType: "money",
    organization: "American Battlefield Trust"
  },
  {
    id: "6",
    event: "event2",
    paymentType: "money",
    organization: "Arts Education Foundation"
  },
  {
    id: "7",
    event: "event1",
    paymentType: "time",
    organization: "Bowery Residents Committee"
  }
];

function getEventIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

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

  initEvent();
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

/**
 * Initializes the event selection by setting the selected organization 
 * based on the event ID from the URL.Shows or hides the event-related 
 * elements accordingly.
 */
function initEvent() {
  const eventId = getEventIdFromUrl();
  const select = document.getElementById("selectOrg");
  const element = document.getElementById("Event");

  if (eventId) {
    const selectedEvent = events.find((event) => event.id === eventId);

    if (selectedEvent) {
      select.value = selectedEvent.organization;
      initType();
    }
  }

  if (select.value !== "choose") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function showEvent() {
  var select = document.getElementById("selectOrg");
  var element = document.getElementById("Event");

  console.log("Selected Organization:", select.value);

  if (select.value != "choose") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

/**
 * Initializes the event type selection by setting the selected 
 * event type based on the event ID from the URL. Shows or hides
 * the type-related elements accordingly.
 */
function initType() {
  const eventId = getEventIdFromUrl();
  const select = document.getElementById("selectEvent");
  const element = document.getElementById("type");

  if (eventId) {
    const selectedEvent = events.find((event) => event.id === eventId);
    if (selectedEvent) {
      select.value = selectedEvent.event;
      initPayment()
    }
  }

  if (select.value !== "choose") {
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

/**
 * Initializes the payment type selection by setting the selected 
 * payment type based on the event ID from the URL. Shows or hides
 * the payment-related elements accordingly.
 */
function initPayment() {
  const eventId = getEventIdFromUrl();
  const select = document.getElementById("selectType");
  var elementPayment = document.getElementById("Payment");
  var elementTime = document.getElementById("Time");
  var elementClothes = document.getElementById("Clothes");

  if (eventId) {
    const selectedEvent = events.find((event) => event.id === eventId);

    if (selectedEvent) {
      select.value = selectedEvent.paymentType;
    }
  }

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
