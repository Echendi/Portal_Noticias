const express = require('express');
const router = express.Router();
const NEWS_PER_PAGE = 10;

let news = []; 

router.get('/', async(req, res) => {
    loadNews().then(()=>{
        let pages = 0;
        if(news.length%NEWS_PER_PAGE!=0){
            pages = news.length/NEWS_PER_PAGE;
        }else{
            pages = (news.length/NEWS_PER_PAGE)+1;
        }
        res.send({pages: news.length/NEWS_PER_PAGE});
    });
});

router.get('/:page',  async(req, res) => {
    if (news.length == 0) {
        loadNews().then(() => getNewsPerPage(req, res));
    }else{
        getNewsPerPage(req, res);
    }
});

router.get('/:page/:num',  async(req, res) => {
    if (news.length == 0) {
        loadNews().then(() => getOneNews(req, res));
    }else{
        getOneNews(req, res);
    }
});

function getOneNews(req, res) {
    let page = req.params.page;
    let num = req.params.num;
    let pos = parseInt((NEWS_PER_PAGE * page) - NEWS_PER_PAGE + num,10);
    console.log("pos", pos);
    res.send({ article: news[pos] });
}

function getNewsPerPage(req, res) {
    let num = req.params.page;
    let start = (NEWS_PER_PAGE * num) - NEWS_PER_PAGE;
    let end = NEWS_PER_PAGE * num;
    let page = news.slice(start, end);
    res.send(page);
}

function loadNews() {
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d96b845987e346ab907b6701cbe4d3c0')
        .then(response => response.json())
        .then(json => {
            let aux = json.articles;
            news = [];
            aux.forEach(article => news.push(
                {
                    title: article.title,
                    author: article.author,
                    description: article.description,
                    image: article.urlToImage
                }
            ));
        });
}

module.exports = router;