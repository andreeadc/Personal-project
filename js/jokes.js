$(onHtmlLoaded);

function onHtmlLoaded(){
    
    var nerdyJokesButton = document.getElementById("nerdyJokes-button");
    nerdyJokesButton.addEventListener("click", getNerdyJokesFromApi);

    var explicitJokesButton=document.getElementById("explicitJokes-button");
    explicitJokesButton.addEventListener("click", getExplicitJokesFromApi);
    
}

function clearTemplate(){
    var template = document.getElementById("displayJoke"); 
    template.innerHTML = "";
}
    
function getNerdyJokesFromApi() {
    var jokesType;
     
    var urlNerdyJokes ="https://api.icndb.com/jokes/random/10?limitTo=[nerdy]";
     
    var nerdyJokesFromApi = fetch( urlNerdyJokes, {
        method:'GET'
    }).then( function(response){
            return response.json();
    })
    return nerdyJokesFromApi
    .then(clearJokesContainer)
    .then(displayJokes, displayError)
};

function getExplicitJokesFromApi() {
    var jokesType;
    urlExplicitJokes = "https://api.icndb.com/jokes/random/10?limitTo=[explicit]";
    var explicitJokesFromApi = fetch( urlExplicitJokes, {
        method:'GET'
    }).then( function(response){
            return response.json();
    })
    return explicitJokesFromApi
    .then(clearJokesContainer)
    .then(displayJokes, displayError);
};

function clearJokesContainer(explicitJokesFromApi, nerdyJokesFromApi){
        var jokesContainer = document.getElementById("displayJoke");
        jokesContainer.innerHTML="";
        if (explicitJokesFromApi !== 0){
            return jokesType = explicitJokesFromApi}
        else if (nerdyJokesFromApi !== 0){
            return jokesType = nerdyJokesFromApi
        }
}

function displayJokes(jokesType){
    
    var jokesContainer = document.getElementById("displayJoke");
    var template = document.getElementById("template");
    jokesContainer.innerHTML = "<button id='exit'><i class='fa fa-times-circle'></i></button>";
    var exitBtn = document.getElementById("exit");
    exitBtn.addEventListener("click", clearTemplate);
    
    for (var i = 0; i<10; i++){
        var jokesContainerClone = template.cloneNode(true);
        
        var jokeId = jokesContainerClone.querySelector(".joke-id");
        jokeId.innerHTML = "Joke number " + (i+1);
        
        var jokeBody = jokesContainerClone.querySelector(".joke-body");
        jokeBody.innerHTML = jokesType.value[i].joke; 
        
        var editButton = jokesContainerClone.querySelector(".joke-edit");
        editButton.classList.remove("hide");
        editButton.addEventListener("click", function(event){
            editJoke(event);
            console.log(event);
            });
                
        jokesContainer.appendChild(jokesContainerClone);
    };
    
    
}

function displayError(jqXHR, textStatus, errorThrown){
    console.log(jqXHR, textStatus, errorThrown);
    var errorContainer=document.getElementById("error");
    errorContainer.innerHTML="We're sorry. The request failed with status " + jqXHR.status + "!";
};

function editJoke(event){
    var jokeBody = event.path[2].querySelector(".joke-body");
    var str = jokeBody.innerText;
    console.log(str);
    var userName = prompt("Write your character's name in here:");
    console.log(userName);
    replaceJokeString(userName, str, jokeBody);
}

function replaceJokeString(userName, str, jokeBody){
    var userNameLength = userName.length;
    var resultStr;
    if (userName[userNameLength-1]==="a"){
        resultStr = str.replace("Chuck Norris", userName).replace(/Chuck/gi, userName).replace(/ he /gi, " she ")
        .replace(/ him /gi, " her ").replace(/ his /gi, " her ").replace(/ he's/," she's");
        jokeBody.innerText = resultStr;
        }else {
            resultStr = str.replace("Chuck Norris", userName).replace(/Chuck/gi, userName);
            jokeBody.innerText = resultStr;
        }
}

