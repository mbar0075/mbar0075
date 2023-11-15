// GitHub, Extracting repos:
const username = 'mbar0075';
const starPathData = 'M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68a1,1,0,0,0,.4,1,1,1,0,0,0,1.05.07L12,18.76l5.1,2.68a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.89l.72,4.19-3.76-2a1,1,0,0,0-.94,0l-3.76,2,.72-4.19a1,1,0,0,0-.29-.89l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z';

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    const repositoriesContainer = document.getElementById('repositories-container');
  
    const createRepoDivs = (repositories) => {
      repositories.forEach(repo => {
        
        const repoElement = document.createElement('div');
        repoElement.classList.add('repository-item');
        repoElement.style.cursor = 'pointer'; // Change cursor to indicate clickability
        repoElement.addEventListener('click', function() {
          const newTab = window.open(repo.html_url, '_blank');
          if (newTab) {
            newTab.focus();
          } else {
            window.location.href = repo.html_url; // Fallback if pop-up is blocked
          }
        });
  
        const extraContainer = document.createElement('div');
        extraContainer.classList.add('div-extra-container');

        const starContainer = document.createElement('div');
        starContainer.classList.add('star-container');
        starContainer.style.cursor = 'pointer'; // Change cursor to indicate clickability
      //   starContainer.addEventListener('click', function() {
      //     const newTab = window.open(repo.html_url, '_blank');
      //     if (newTab) {
      //         newTab.focus();
      //     } else {
      //         window.location.href = repo.html_url; // Fallback if pop-up is blocked
      //     }
      // });

        const starSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        starSvg.classList.add('octicon', 'octicon-star', 'star-svg');
        starSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        starSvg.setAttribute('viewBox', '0 0 24 24'); // Adjust as needed for the SVG

        const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        starPath.setAttribute('fill', 'var(--white)'); // Fill color for the star
        starPath.setAttribute('d', starPathData); // Use the starPathData string
        starSvg.appendChild(starPath);

        const starCount = document.createElement('span');
        starCount.textContent = ` ${repo.stargazers_count}`;
        starCount.classList.add('repository-star-count');

        starContainer.appendChild(starSvg);
        starContainer.appendChild(starCount);

        const description = document.createElement('p');
        description.classList.add('repository-description');
        description.classList.add('text-padding');
        description.textContent = repo.description || 'No description provided';

        const language = document.createElement('p');
        language.classList.add('repository-language');
        language.textContent = `Language: ${repo.language || 'Not specified'}`;

        const lastUpdated = document.createElement('p');
        const date = new Date(repo.updated_at);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
  
        lastUpdated.textContent = `Last updated: ${formattedDate}`;
        lastUpdated.classList.add('repository-last-updated');

        extraContainer.appendChild(description);
        extraContainer.appendChild(language);
        extraContainer.appendChild(lastUpdated);
        extraContainer.appendChild(starContainer);
  
        const nameLink = document.createElement('a'); // Anchor tag for repository name
        nameLink.href = repo.html_url; // Link to the GitHub repository
        nameLink.target = '_blank'; // Open link in a new tab
        const name = document.createElement('h3');
        name.classList.add('repository-name');
        name.textContent = repo.name;
        nameLink.appendChild(name); // Append the repository name to the anchor tag
  
        const topics = document.createElement('div');
        topics.classList.add('topics-container');

        repo.topics.forEach((topic) => {
          const topicButton = document.createElement('span');
          topicButton.textContent = topic;
          topicButton.classList.add('hoverable-button');
          topicButton.style.cursor = 'pointer'; // Change cursor to indicate clickability

          // Event listener to navigate to the GitHub topic page on click
          topicButton.addEventListener('click', () => {
            window.open(`https://github.com/topics/${topic}`, '_blank');
          });

          topics.appendChild(topicButton);
        });

        repoElement.appendChild(nameLink);
        repoElement.appendChild(description);
        repoElement.appendChild(topics);
        repoElement.appendChild(extraContainer);
  
        repositoriesContainer.appendChild(repoElement);

        
      });
    };

    createRepoDivs(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
