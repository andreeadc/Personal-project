window.onload = onHtmlLoaded;

function onHtmlLoaded() {
    // localStorage.setItem("temperature", "C");
    
    const cookies = getCookiesAsObject();

    // variabila availableStorage e confusing: m-as astepta
    // sa vad in ea C sau F, dar de fapt vad daca storage-ul e available
    const availableStorage = storageAvailable("localStorage") ?
    localStorage.getItem("temperature") : cookies.temperature;

    getWeather(availableStorage);

    const radios = document.getElementsByName("temperature");
    radios.forEach(function radioChecked(radio) {
        if (radio.value === availableStorage) {
            radio.checked = "checked";
        }

        radio.addEventListener("click", function(){
            if ( storageAvailable("localStorage")){
                localStorage.setItem("temperature", this.value);
                getWeather();
            } else{
                document.cookie = "temperature=" + this.value;
            }
        })
    });

      
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
};

function getCookiesAsObject() {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split("; ");
    console.log(cookiesArray); 
    
    const cookies = {};
    cookiesArray.forEach(function(c) {
        const cookie = c.split("=");
        console.log(cookie);
        const key = cookie[0];
        const value = cookie[1]; 
        cookies[key] = value;
        getWeather(cookie[1]);
    });
    
    return cookies;
}

function getWeather(availableStorage) {
    $.ajax({
    url: 'https://api.wunderground.com/api/cfbfc5f603141e07/conditions/q/RO/Cluj_Napoca.json',
    method:'GET',
    success: function temp(response){
                const temperatureElement= document.getElementById("temperature");
                const tempC = response.current_observation.temp_c;
                const tempF = response.current_observation.temp_f;
                if ( (localStorage.temperature === "C") || (availableStorage === localStorage)){
                    // temperatureElement.innerText="Cluj-Napoca "+ tempC + " degrees C";
                    temperatureElement.innerHTML= "";
                    const img = document.createElement("img");
                    img.src = "css/image-video/Weather.png"
                    img.className += "img-weather";
                    const city = document.createElement("p");
                    city.className += "city";
                    city.innerText = "Cluj-Napoca";
                    const temp = document.createElement("p");
                    temp.className += "temp";
                    temp.innerText = tempC + " C";
                    temperatureElement.appendChild(img);
                    temperatureElement.appendChild(city);
                    temperatureElement.appendChild(temp);
                } else {
                    temperatureElement.innerHTML= "";
                    const img = document.createElement("img");
                    img.src = "css/image-video/Weather.png"
                    img.className += "img-weather";
                    const city = document.createElement("p");
                    city.className += "city";
                    city.innerText = "Cluj-Napoca";
                    const temp = document.createElement("p");
                    temp.className += "temp";
                    temp.innerText = tempF + " F";
                    temperatureElement.appendChild(img);
                    temperatureElement.appendChild(city);
                    temperatureElement.appendChild(temp);
                }
            }
    });

}
