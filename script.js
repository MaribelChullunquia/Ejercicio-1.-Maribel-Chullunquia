document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que recargue la página
  
    const input = document.getElementById("searchInput").value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${input}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Pokémon no encontrado");
      const data = await response.json();
      createCard(data); // Creamos la card con la info
    } catch (error) {
      alert(error.message);
    }
  });
  