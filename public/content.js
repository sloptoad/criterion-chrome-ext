
if (window.location.href.indexOf('criterionchannel') > 0) {
     function callOnHover(){
        window.addEventListener('load',function(){
            getSelector()
        });
    }
    const getSelector = () =>{
        document.querySelectorAll('.slick-slide__card-wrapper').forEach(item => {
            console.log({item});
            item.addEventListener('mouseover', event => {
                console.log("hover");
                const getFilmTitle = () => {
                    if (item.querySelector('.ext-title') == null) {
                        title = item.getElementsByClassName("site-font-primary-color truncate");
                        console.log({title});
                        let newDiv = document.createElement("div");
                        newDiv.className = "ext-title";
                        title[0].appendChild(newDiv);
                        console.log(title[0].innerText);
                        let rating = rottenRequest(title[0].innerText, newDiv);
                    }
                }
                getFilmTitle();
            })
        })
    }
    const rottenRequest = (title, divToChange) => {
        let storedId = "";
        fetch(`https://www.omdbapi.com/?apikey=dc7602e8&s=${title}`)
            .then((success) => success.json())
            .then((movies) => {
                console.log(movies.Search[0].imdbID)
                storedId = movies.Search[0].imdbID;
            })
            .then(function (data) {
                fetch(`https://www.omdbapi.com/?i=${storedId}&apikey=dc7602e8`)
                    .then((success) => success.json())
                    .then((rating) => {
                        divToChange.innerText = divToChange.innerText + ` IMDB: ${rating.Ratings[0] ? rating.Ratings[0].Value : "n/a"}` + ` | RT: ${rating.Ratings[1] ? rating.Ratings[1].Value : "n/a"}`;
                    })
            })
            .catch((error) => { console.log(error) });
    }


    const NodeLocation = () => {
        if (document.getElementsByClassName('browse-rows').length > 0) {
            return [document.getElementsByClassName('browse-rows')[0], document.getElementsByClassName("site-font-primary-color truncate")];
        }
        return [document.getElementById('gridview'), document.getElementsByClassName('criterion-channel__td--title')]
    }
    
    const targetNode = NodeLocation()[0];
    const config = { attributes: false, childList: true, subtree: false };
    if (NodeLocation()[0] == document.getElementsByClassName('browse-rows')[0]) {
        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log("in callback2")
                    getSelector();                   
                }
                else if (mutation.type === 'subtree') {
                    console.log("in callback3")

                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
callOnHover();
}