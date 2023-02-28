// Enregistrer les données dans le localStorage avant de quitter la page
window.onbeforeunload = function() {
    var listItems = document.querySelectorAll("li");
    var localStorageData = {};
    listItems.forEach(function(item) {
        var value = item.firstChild.textContent;
        localStorageData[value] = value;
    });
    localStorage.setItem("userData", JSON.stringify(localStorageData));
};

// Récupérer les données du localStorage et les afficher dans la liste lorsque la page est chargée
window.onload = function() {
    var localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (localStorageData) {
        Object.values(localStorageData).forEach(function(value) {
            var newLi = document.createElement("li");
            var textNode = document.createTextNode(value);
            var deleteButton = document.createElement("button");
            var buttonText = document.createTextNode("X");
            deleteButton.appendChild(buttonText);

            deleteButton.addEventListener("click", function() {
                newLi.remove();
                var localStorageData = JSON.parse(localStorage.getItem("userData"));
                delete localStorageData[value];
                localStorage.setItem("userData", JSON.stringify(localStorageData));
            });

            newLi.appendChild(textNode);
            newLi.appendChild(deleteButton);

            document.getElementById("ma-liste").appendChild(newLi);
            deleteButton.classList.add("delete-button");
        });
    }
};

function envoi() {
    // Récupérer la valeur de l'input
    var inputValue = document.getElementById("inp").value;

    // Vérifier si l'input a une valeur
    if (inputValue !== '') {

        // Créer un nouvel élément li
        var newLi = document.createElement("li");

        // Créer un élément texte avec la valeur de l'input
        var textNode = document.createTextNode(inputValue);

        // Créer un bouton pour supprimer l'élément li
        var deleteButton = document.createElement("button");
        var buttonText = document.createTextNode("X");
        deleteButton.appendChild(buttonText);

        // Ajouter un gestionnaire d'événement pour supprimer l'élément li lorsque le bouton est cliqué
        deleteButton.addEventListener("click", function() {
            newLi.remove();
            var localStorageData = JSON.parse(localStorage.getItem("userData"));
            delete localStorageData[inputValue];
            localStorage.setItem("userData", JSON.stringify(localStorageData));
        });

        // Ajouter le texte et le bouton au nouvel élément li
        newLi.appendChild(textNode);
        newLi.appendChild(deleteButton);

        // Ajouter le nouvel élément li à la liste ul
        document.getElementById("ma-liste").appendChild(newLi);

        // Effacer le champ input
        document.getElementById("inp").value = "";

        // Stocker l'élément li dans le localStorage
        var localStorageData = JSON.parse(localStorage.getItem("userData")) || {};
        localStorageData[inputValue] = inputValue;
        localStorage.setItem("userData", JSON.stringify(localStorageData));

        deleteButton.classList.add("delete-button");

    }
    else {
        alert('Veuillez écrire');
    }
}

// Ajouter la fonctionnalité d'envoi avec la touche Entrée
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        envoi();
    }
});

//
// const dark = document.getElementsByClassName('dark-theme')[0];
// const inputText = document.getElementById("inp");
// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
//     inputText.classList.toggle("dark");
// }
//
// dark.addEventListener('click', toggleDarkMode);

const dark = document.getElementsByClassName('dark-theme')[0];
const inputText = document.getElementById("inp");

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    inputText.classList.toggle("dark");
    updateInputTextColor();
}

function updateInputTextColor() {
    if (document.body.classList.contains('dark-mode')) {
        inputText.style.color = "white";
    } else {
        inputText.style.color = "";
    }
}

dark.addEventListener('click', toggleDarkMode);

updateInputTextColor(); // Appeler la fonction pour initialiser la couleur du texte du input






