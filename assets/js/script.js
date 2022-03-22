
function tempConversion(temp) {
    return Math.floor((temp - 273.15) * 9 / 5 + 32)
}

function populateForecast (response) {

    let temp = tempConversion(response.current.temp);
    for (let i = 0; i < 5; i++) {
        let day = response.daily[i]

        let date = new Date(day.dt).toDateString();

        console.log(date);
    }
}

function getWeather() {

    let searchText = $("#search").val();
    console.log(searchText);

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=6479f2af5b538ffcb85e2f9c83f465e0"

    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchText + "&limit=2&appid=6479f2af5b538ffcb85e2f9c83f465e0")
        .then(response => response.json())
        .then(function (response) {

            let lon = response[0].lon
            let lat = response[0].lat

            console.log(lon, lat);

            fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=6479f2af5b538ffcb85e2f9c83f465e0")
                .then(response => response.json())
                .then(function (response) {                    

                    populateForecast(response);

                })
        })


};


$(document).ready(function () {

    $("#search-btn").on("click", getWeather);
    $("#search").keypress(function (event) {

        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            getWeather();
            $("#search").val("")
        }

    })

});