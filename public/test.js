const button = document.querySelector(".button-corriger");
let url = ''
button.addEventListener("click", () => {
    if(url === '') {
        const repos = document.querySelector("input[name=repos]").value
        const epreuve = document.querySelector("select[name=epreuve]").value
        const langage = document.querySelector("select[name=langage]").value
        if(repos.trim() !== '') {
            document.querySelector("input[name=repos]").disabled = true
            document.querySelector("select[name=epreuve]").disabled = true
            document.querySelector("select[name=langage]").disabled = true
            button.disabled = true;
            button.innerHTML = "Téléchargement des fichier en cours...";
            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    repos,
                    epreuve,
                    langage,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                url = data.url
                if (data.error) {
                    console.log(data.error)
                    document.querySelector("input[name=repos]").disabled = false
                    document.querySelector("select[name=epreuve]").disabled = false
                    document.querySelector("select[name=langage]").disabled = false
                } else {
                    button.onclick = function() {
                        location.href=data.url;
                    }
                    button.disabled = false;
                    button.innerHTML = "Corriger";
                    button.id = "correction";
                    
                }
            });
        }
    } else {
        button.disabled = true;
        button.innerHTML = "Correction en cours...";
        location.href=url;

    }
});