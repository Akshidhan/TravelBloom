const searchbtn = document.getElementById('searchBtn');
const clearbtn = document.getElementById('clearBtn');
const searchResult = document.getElementById('searchResult');

function searchFunction(){
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data=>{
        var search = document.getElementById('searchBar').value.toLowerCase();
        if (search == 'beach' || search == 'beaches'){
            search = 'beaches';
        }
        else if(search == 'temple' || search == 'temples'){
            search = 'temples';
        }
        else if(search == 'country' || search == 'countries'){
            search = 'countries';
        }
        else{
            search = 'invalid';
        }
        debugger
        if(search == 'countries'){
            data.countries.forEach((country, id) => {
                country.cities.forEach((city, id) => {
                    var name = city.name;
                    var image = city.imageUrl;
                    var description = city.description;
                    searchResult.style.display = 'block';
                    searchResult.innerHTML += `<div class="searchCard">
                                                    <img src="${image}">
                                                    <p class="name">${name}</p>
                                                    <p class="description">${description}</p>
                                                </div>`
                })
            });
        }
        else if(search == 'beaches' || search == 'temples'){
            if (data[search] && Array.isArray(data[search])) {
                data[search].forEach((city, id) => {
                    var name = city.name;
                    var image = city.imageUrl;
                    var description = city.description;
                    searchResult.style.display = 'block';
                    searchResult.innerHTML += `<div class="searchCard">
                                                    <img src="${image}">
                                                    <p class="name">${name}</p>
                                                    <p class="description">${description}</p>
                                                </div>`;
                });
            } else {
                searchResult.style.display = 'block';
                searchResult.innerHTML = `<p class="name">No result found!</p>`;
            }
        }
        else{
            searchResult.style.display = 'block';
            searchResult.innerHTML = `<p class="searchCard">No result found!</p>`
        }
    })
    .catch(error=>{
        console.log('Error:', error);
    })
}

function clearFunction(){
    searchResult.innerHTML = "";
    searchResult.style.display = 'none';
}

searchbtn.addEventListener('click', searchFunction);
clearbtn.addEventListener('click', clearFunction);