fetch('travel_recommendation_api.json')
.then(respose=>Response.json)
.then(data=>{
    console.log(data.countries);
})
.catch(error=>{
    console.log('Error:', error);
})