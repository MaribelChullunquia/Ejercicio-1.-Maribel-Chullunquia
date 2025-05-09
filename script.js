document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // 
  
    const input = document.getElementById("searchInput").value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${input}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Pokémon no encontrado");
      const data = await response.json();
      createCard(data); // la card 
    } catch (error) {
      alert(error.message);
    }
  });
  
  const state = {}; //  los pokémon mostrados que luego seran eliminados

function createCard(pokemon) {
  const container = document.getElementById("cardsContainer");

  const card = document.createElement("div");
  card.className = "card";

  // Card frontal y reverso para efecto "voltear"
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <button class="delete-btn">Eliminar</button>
      </div>
      <div class="card-back">
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      </div>
    </div>
  `;

  // Manejo del click para voltear
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  // Botón para eliminar
  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que también dispare el "flip"
    container.removeChild(card);
    delete state[pokemon.name]; // Elimina del estado
  });

  container.appendChild(card);
  state[pokemon.name] = pokemon; // Guarda en el estado
}
