// The Following Functions Handle Search Functionality.

async function loadSearch() {
  console.log("Loading Organizations...");
  const orgs = await loadOrganizations();
  console.log("Done");

  const searchResultsContainer = document.querySelector('#search-results');

  // Initial Random Search Results
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = orgs[i].name;
    link.href = 'javascript:void(0);'; // Set the link href to void(0) since it will be handled by JavaScript
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

    // Event listener to handle clicking on a charity
    link.addEventListener('click', (event) => {
      event.stopPropagation();
      openCharityPage(orgs[i]);
    });
  }

  const searchForm = document.querySelector('form');
  const searchInput = document.querySelector('input[name="query"]');
  
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const query = searchInput.value;
  
    if (query.length > 1) {
      searchResultsContainer.innerHTML = '';
      console.log("Searching For", query);
      const filteredWords = orgs.filter(word => {
        const regex = new RegExp(query, 'i');
        return regex.test(word.tags);
      });
  
      for (const [index, result] of filteredWords.entries()) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = result.name;
        link.href = 'javascript:void(0);'; // Set the link href to void(0) since it will be handled by JavaScript
        li.appendChild(link);
        searchResultsContainer.appendChild(li);
        li.style.borderRadius = '10px';
  
        if (index % 2 === 0) {
          li.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
        }
  
        const starIcon = document.createElement('span');
        starIcon.innerHTML = '&#9733;'; // Star symbol HTML entity
        starIcon.classList.add('star-icon');
        li.appendChild(starIcon);
  
        starIcon.addEventListener('click', () => {
          starIcon.classList.toggle('clicked');
        });
  
        // Event listener to handle clicking on a charity
        link.addEventListener('click', (event) => {
          event.stopPropagation();
          openCharityPage(result);
        });
      }
    }
  });
  

  function openCharityPage(charity) {
    const body = document.querySelector('body');
    body.innerHTML = ''; // Clear the current page content
  
    const backButton = document.createElement('a');
    backButton.href = '../screens/search.html';
    backButton.id = 'back-button';
    const backButtonImg = document.createElement('img');
    backButtonImg.src = '../screens/img/back.png';
    backButtonImg.alt = 'Back';
    backButtonImg.id = 'backimg';
    backButton.appendChild(backButtonImg);
    body.appendChild(backButton);
  
    const h1 = document.createElement('h1');
    h1.textContent = charity.name;
    h1.style.marginTop = '50px';
    body.appendChild(h1);
  
    const h3 = document.createElement('h3');
    h3.textContent = 'The goal';
    h3.style.textAlign = 'center';
    h3.style.marginBottom = '-10px';
    body.appendChild(h3);
  
    const p = document.createElement('p');
    p.textContent = charity.description;
    p.style.width = '70%';
    p.style.textAlign = 'center';
    body.appendChild(p);
  
    const starsDiv = document.createElement('div');
    body.appendChild(starsDiv);
  
    // Add a random number of stars
    const numStars = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numStars; i++) {
      const starIcon = document.createElement('span');
      starIcon.innerHTML = '&#9733;';
      starIcon.classList.add('star-icon');
      starsDiv.appendChild(starIcon);
    }
  
    const websiteLink = document.createElement('a');
    websiteLink.href = charity.url;
    websiteLink.target = '_blank';
    websiteLink.textContent = 'Visit Website';
    websiteLink.style.color = 'blue'
    body.appendChild(websiteLink);
  
    const reviewH3 = document.createElement('h3');
    reviewH3.textContent = 'Review(s)';
    reviewH3.style.textAlign = 'center';
    reviewH3.style.marginBottom = '-10px';
    body.appendChild(reviewH3);

    // Generate a random number of reviews (1, 2, or 3)
    const numReviews = Math.floor(Math.random() * 3) + 1;
    const reviews = generateUniqueReviews(numReviews);
    reviews.forEach((review) => {
      const reviewParagraph = document.createElement('p');
      reviewParagraph.textContent = review;
      reviewParagraph.style.width = '70%';
      reviewParagraph.style.listStyleType = 'disc';
      reviewParagraph.style.textAlign = 'center';
      reviewParagraph.style.marginLeft = '20px';
      reviewParagraph.style.marginBottom = '-10px'
      body.appendChild(reviewParagraph);
    });

  
    // Adjust the styling to fit the content properly
    const style = document.createElement('style');
    style.textContent = `
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        color: white;
      }
      .star-icon {
        color: gold;
        font-size: 20px;
        margin-right: 5px;
      }
    `;
    body.appendChild(style);
  }
  
  function generateUniqueReviews(numReviews) {
    const reviews = [
      'Great organization! They make a real impact.',
      'I\'m impressed by their dedication and transparency.',
      'A wonderful cause. They truly make a difference.',
      'Highly recommend supporting this charity.',
      'They have a strong mission and vision.',
      'I\'ve seen the positive impact of their work firsthand.',
      'An excellent charity that deserves support.',
    ];
  
    const uniqueReviews = [];
    while (uniqueReviews.length < numReviews && reviews.length > 0) {
      const randomIndex = Math.floor(Math.random() * reviews.length);
      const review = reviews.splice(randomIndex, 1)[0];
      uniqueReviews.push(review);
    }
  
    return uniqueReviews;
  }
  
  
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
