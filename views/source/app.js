const apiKey = 'f04548d102414532b2d0f483624c7224';
const defaultSource = 'the-washington-post';
const newsArticles = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');


window.addEventListener('load', async e => {
    await updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try{
            console.log('SW...');
            navigator.serviceWorker.register('serviceWorker.js');
            console.log('SW  registered');
        }catch(error){
            console.log(error);
        }
    }
});

async function updateSources() {
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await response.json();
    console.log(json);
    sourceSelector.innerHTML = json.sources
                                  .map(source => `<option value="${source.id}">${source.name}</option>`)
                                  .join('\n');
  }

async function updateNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
  const json = await response.json();
  console.log(json);
  newsArticles.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}