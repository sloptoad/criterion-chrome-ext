
const rottenRequest = (title,divToChange) =>{
    let storedId= "";
    // if(title === "The Sniper"){
        fetch(`https://www.omdbapi.com/?apikey=dc7602e8&s=${title}`)
        .then((success) => success.json())
        .then((movies) => { 
            console.log(movies.Search[0].imdbID) 
            storedId = movies.Search[0].imdbID;
        })
        .then(function(data){
             fetch(`https://www.omdbapi.com/?i=${storedId}&apikey=dc7602e8`)
             .then((success) => success.json())
             .then((rating)=>{
                console.log({rating});
                divToChange.innerText = divToChange.innerText + ` IMDB: ${rating.Ratings[0]? rating.Ratings[0].Value: "n/a"}`+ `| RT: ${rating.Ratings[1]?rating.Ratings[1].Value: "n/a"}`;
            })
        })
        .catch((error)=>{ console.log(error)});
    // }
}


const getFilmTitle = (titles = document.getElementsByClassName("site-font-primary-color truncate")) =>{

    for(let title in titles){
        console.log(titles[title]);
        if(titles[title].querySelector('ext-title') == null){
            console.log("test");
            let newDiv = document.createElement("div");
            newDiv.className = "ext-title";
            titles[title].appendChild(newDiv);
            let rating = rottenRequest(titles[title].innerText, newDiv);
        }
    //   consChildole.log({rating});
    //   titles[title].innerHTML = titles[title].innerHTML + rating;
    }
}

const targetNode = document.getElementsByClassName('browse-rows')[0];
const config = {  attributes: false, childList: true, subtree: false };

const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    console.log("in callback")

    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log("in callback2")
            getFilmTitle();
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'subtree') {
            console.log("in callback3")

            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);
getFilmTitle();


