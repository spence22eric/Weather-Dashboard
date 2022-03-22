
function tempConversion(temp) {
    return (temp - 273.15) * 9/5 + 32
}

function getWeather() {

    let searchText = $("#search").val();
    console.log(searchText);

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=6479f2af5b538ffcb85e2f9c83f465e0"

    fetch(apiUrl)
        .then(response => response.json())
        .then(function (response) {

            let temp = tempConversion(response.main.temp);

            console.log("succeeded");
            console.log(temp);

        })
};

$(document).ready(function () {

    $("#search-btn").on("click", getWeather);

});