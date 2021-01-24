document.querySelector('button').addEventListener('click', function() {
    search();
})
document.querySelector('body').addEventListener('keydown', function(el) {
    if(el.key === 'Enter') {
        search();
    }
})
document.querySelector('body').addEventListener('click', function(el) {
    if(el.target.classList.contains('image')){
        el.target.nextSibling.classList.toggle('hidden');
    }
})
function search() {
    const inputValue = document.querySelector('input').value;
    if(inputValue === "") {
    // Aucune valeur dans l'input
    } else {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://api.tvmaze.com/search/shows?q=" + inputValue, false);
        xhttp.send();
        let results = JSON.parse(xhttp.response);
        document.querySelector('main').innerHTML = "";
        for (let i = 0; i < results.length; i++) {
            displaySerie(results[i]);
        }
        document.getElementByName('searchbar').reset();
    }
}
/*document.querySelector('input').value ? document.querySelector('input').value: "null";  <-- Commande ternaire*/
function displaySerie(serie) {
    let target = document.querySelector('main');
    let card = document.createElement('DIV');
    let name = document.createElement('H1');
    let img = document.createElement('IMG');
    let summary = document.createElement('P');
    let status = document.createElement('H2');

    name.innerHTML = serie.show.name;
    if (serie.show.image === null) {
        img.src = 'https://via.placeholder.com/210x295';
        img.classList.add('image');
    }else{
        img.src = serie.show.image.medium;
        img.classList.add('image');
    }
    if (serie.show.summary === null) {
        newSummary = 'We couldn\' t find a summary for this show.';
        summary.innerHTML = newSummary;
    }else{
        summary.innerHTML = serie.show.summary;
    }
    status.innerHTML = serie.show.status;
    
    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(summary);
    card.appendChild(status);
    target.appendChild(card);
    name.classList.add("serie_title_and_status");
    status.classList.add("serie_title_and_status")
    summary.classList.add("summary", "hidden");
    card.classList.add("borders", "column");
    target.classList.add("wrap");
}