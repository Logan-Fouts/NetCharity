// The Following Functions Handle Search Functionality.

// Note: The end goal would be for each charity to have its own little page to show there key info.

async function loadSearch(){
  console.log("Loading Organizations...")
  const orgs = await loadOrganizations()
  console.log("Done")
  
  const searchResultsContainer = document.querySelector('#search-results');
  // Initial Random Search Results
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = orgs[i].name;
    link.href = orgs[i].url;
    link.target = "_blank"; // Open link in a new window/tab
    li.appendChild(link);
    searchResultsContainer.appendChild(li);
    li.style.borderRadius = '10px';
    if (i % 2 === 0) {
      li.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
    }
    const starIcon = document.createElement('span');
    starIcon.innerHTML = '&#9733;'; // Star symbol HTML entity
    starIcon.classList.add('star-icon');
    li.appendChild(starIcon);
  
    starIcon.addEventListener('click', () => {
      starIcon.classList.toggle('clicked');
    });
  }
  
  
  const searchForm = document.querySelector('form');
  const searchInput = document.querySelector('input[name="query"]');

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const query = searchInput.value;

    if (query.length > 1) {
      searchResultsContainer.innerHTML = '';
      console.log("Searching For", query)
      const filteredWords = orgs.filter(word => {
        const regex = new RegExp(query, 'i');
        return regex.test(word.tags);
      });

      for (const result in filteredWords) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = filteredWords[result].name;
        link.href = filteredWords[result].url;
        link.target = "_blank"; // Open link in a new window/tab
        li.appendChild(link);
        searchResultsContainer.appendChild(li);
        li.style.borderRadius = '10px';
      
        if (result % 2 === 0) {
          li.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
        }
      
        const starIcon = document.createElement('span');
        starIcon.innerHTML = '&#9733;'; // Star symbol HTML entity
        starIcon.classList.add('star-icon');
        li.appendChild(starIcon);
      
        starIcon.addEventListener('click', () => {
          starIcon.classList.toggle('clicked');
        });
      }
    }
  });
}

// Called to read and parse all organizations from the JSON file.
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