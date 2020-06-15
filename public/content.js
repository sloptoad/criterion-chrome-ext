
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
                divToChange.innerText = divToChange.innerText + ` IMDB: ${rating.Ratings[0]? rating.Ratings[0].Value: "n/a"}`+ `RT: ${rating.Ratings[1]?rating.Ratings[1].Value: "n/a"}`;
            })
        })
        .catch((error)=>{ console.log(error)});
    // }
}


const getFilmTitle = () =>{
    let titles = document.getElementsByClassName("site-font-primary-color truncate");
    for(let title in titles){
      let rating = rottenRequest(titles[title].innerText, titles[title]);
    //   console.log({rating});
    //   titles[title].innerHTML = titles[title].innerHTML + rating;
    }
}

getFilmTitle();