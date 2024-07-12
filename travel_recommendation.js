const searchbtn = document.getElementById('searchBtn');
const clearbtn = document.getElementById('clearBtn');
const searchResult = document.getElementById('searchResult');

function searchFunction(){
    clearFunction();
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data=>{
        var cityName;
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
            const options = { timeZone: 'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const cityTime = new Date().toLocaleTimeString('en-US', options);
            console.log("Current time in Sao Paulo, Brazil: " , cityTime);
            document.getElementById('time').innerHTML = `Current time in <b>Sao Paulo, Brazil</b>:<br> ${cityTime}`
        }
        else if(search == 'beaches' || search == 'temples'){
            if (data[search] && Array.isArray(data[search])) {
                data[search].forEach((city, id) => {
                    var name = city.name;
                    cityName = name;
                    var image = city.imageUrl;
                    var description = city.description;
                    searchResult.style.display = 'block';
                    searchResult.innerHTML += `<div class="searchCard">
                                                    <img src="${image}">
                                                    <p class="name">${name}</p>
                                                    <p class="description">${description}</p>
                                                </div>`;
                });
                if (search == 'temples'){
                    var timeZone = 'Asia/Kolkata';
                    cityName = 'Taj Mahal, India';
                }
                else{
                    var timeZone = 'Pacific/Tahiti';
                    cityName = 'Copacabana beach, Frech Polynesia';
                }
                const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                const cityTime = new Date().toLocaleTimeString('en-US', options);
                console.log("Current time in ", cityName, ": " , cityTime);
                document.getElementById('time').innerHTML = `Current time in <b>${cityName}</b>:<br> ${cityTime}`
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
    searchResult.innerHTML = `<div id="time"></div>`;
    searchResult.style.display = 'none';
}



searchbtn.addEventListener('click', searchFunction);
clearbtn.addEventListener('click', clearFunction);