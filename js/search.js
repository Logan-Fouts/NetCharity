// The Following Functions Handle Search Functionality.

async function loadSearch(){
  console.log("Loading Orginizations...")
  const orgs = await loadOrganizations()
  console.log("Done")
  
  const searchResultsContainer = document.querySelector('#search-results');

  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = orgs[i].name;
    link.href = orgs[i].url;
    li.appendChild(link);
    searchResultsContainer.appendChild(li);
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

      for (const result in filteredWords){
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = filteredWords[result].name;
        link.href = filteredWords[result].url;
        li.appendChild(link);
        searchResultsContainer.appendChild(li);
      }

      console.log(filteredWords);
    }
  });
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