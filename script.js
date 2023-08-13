const API_KEY = "c65ff48975844d0eacc7ee52ef95d7e0";
const url = "https://newsapi.org/v2/everything?q=";

 window.addEventListener("load", () => fetchNews("world"));

 function reload() {
      window.location.reload();
 }

 async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
 }

 function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        filDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
        
    });
 }

 function filDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description; 

    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`; 

    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
 }

 let curSelectedNav = null;
 function onNavItemClick(id) {
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = navItem;
   curSelectedNav.classList.add('active');
 }

 const searchButton = document.getElementById('search-button');
 const searchText = document.getElementById('search-text');

 searchButton.addEventListener("click", () => {
      const query =searchText.value;
      if (!query) return;
      fetchNews(query);
      curSelectedNav?.classList.remove("active");
      curSelectedNav = null;
 });