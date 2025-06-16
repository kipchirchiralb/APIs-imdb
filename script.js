const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "04b9e190a9msh47d09a5fe559570p1c9d81jsn3fa51f8478e1",
    "x-rapidapi-host": "imdb236.p.rapidapi.com",
  },
};

async function searchAndDisplayMovies(title) {
  try {
    const response = await fetch(
      `https://imdb236.p.rapidapi.com/api/imdb/search?originalTitle=${title}&rows=25&sortOrder=ASC&sortField=id`,
      options
    );
    const result = await response.json();
    console.log(result.numFound);
    console.log(result);
    const moviesList = document.getElementById("results-list");
    moviesList.innerHTML = ""; // Clear previous results

    result.results.forEach((movie) => {
      console.log(typeof movie.description);

      const movieItem = document.createElement("li");
      movieItem.className = "movie-item";
      movieItem.innerHTML = `
            <img src="${movie.primaryImage}" alt="${movie.primaryTitle}">
            <h3><span>${movie.type}</span>${movie.primaryTitle}</h3>
            <p>${
              movie.description?.slice(0, 200) || "No description available"
            }</p>
            ${
              movie.contentRating
                ? `<p>Content Rating: ${movie.contentRating}</p>`
                : ""
            }
        `;
      moviesList.appendChild(movieItem);
    });
  } catch (error) {
    console.error(error);
    const moviesList = document.getElementById("results-list");
    moviesList.innerHTML =
      '<li class="error">Error loading movies. Please try again later.</li>';
  }
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // stop form from reloading page(default behavior of sending form data to a server)

  const searchTerm = document.querySelector("#title").value;
  if (searchTerm.trim() === "") {
    alert("Please search for something before submiting the form.");
    return;
  }
  searchAndDisplayMovies(searchTerm);
  document.querySelector("#title").value = ""; // Clear the input field after submission
});

// task - ammend the code to include a dropdown for a search category - movie, tv seccierrs , show, ......
