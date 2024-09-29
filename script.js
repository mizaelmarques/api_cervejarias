const url = "https://api.openbrewerydb.org/v1/breweries";
let cervejarias = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos"));

function displayCervejarias(cervejariasFiltradas) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    
    cervejariasFiltradas.forEach(cervejaria => {
        const favoritoBtn = document.createElement("button");
        const div = document.createElement("div");
        const titulo = document.createElement("h2");
        const nome = document.createElement("h3");
        const contato = document.createElement("p");
        const cidade = document.createElement("p");
        const endereco = document.createElement("p");
        
        favoritoBtn.innerText = favoritos.includes(cervejaria.id) ? "Remover dos Favoritos" : "Favoritar";
        div.classList.add("cervejaria-div_2");
        titulo.innerText = "CERVEJARIA:";
        nome.innerText = cervejaria.name;
        contato.innerText = "Contato: " + cervejaria.phone;
        cidade.innerText = "Cidade: " + cervejaria.city;
        endereco.innerText = "Endereço: " + cervejaria.address_1;
        
        favoritoBtn.addEventListener("click", () => {
        Favorito(cervejaria.id, favoritoBtn);
        });

        nome.addEventListener("click", () => {
        nome.classList.toggle("active"); 
        contato.classList.toggle("active");
        cidade.classList.toggle("active");
        endereco.classList.toggle("active");
        });

        div.appendChild(titulo);
        div.appendChild(nome);
        div.appendChild(contato);
        div.appendChild(cidade);
        div.appendChild(endereco);
        div.appendChild(favoritoBtn);
        container.appendChild(div);
    });
}

function Favorito(cervejariaId, button) {
    const favorito_2 = favoritos.indexOf(cervejariaId);
    
    if (favorito_2 > -1) {
        favoritos.splice(favorito_2, 1); 
        button.innerText = "Favoritar";
    } else {
        favoritos.push(cervejariaId); 
        button.innerText = "Remover dos Favoritos";
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function filtrarEstado(estado) {
    const filtradas = cervejarias.filter(cervejaria => 
        cervejaria.state.toLowerCase().includes(estado.toLowerCase())
    );
    displayCervejarias(filtradas);
}

function exibirFavoritos() {
    const cervejariasFavoritas = cervejarias.filter(cervejaria => favoritos.includes(cervejaria.id));
    displayCervejarias(cervejariasFavoritas);
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        cervejarias = data;
        displayCervejarias(cervejarias);
    })
    .catch(error => console.error("Erro ao buscar cervejarias:", error));

document.getElementById("btn").addEventListener("click", () => {
    const estado = document.getElementById("filtro").value;
    filtrarEstado(estado);
});
document.getElementById("btn-favoritos").addEventListener("click", exibirFavoritos);
