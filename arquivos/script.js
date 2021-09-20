//const BASE_URL = 'https://movie-list.alphacamp.io'
const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=60bba78b05a7f23ef2cd3064c7b84599&language=pt-BR&page=1'
//const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=60bba78b05a7f23ef2cd3064c7b84599&language=pt-BR'
let INDEX_URL = ''
const INDEX_URL_1 = 'https://api.themoviedb.org/3/movie/'
const INDEX_URL_2 = '?api_key=60bba78b05a7f23ef2cd3064c7b84599&language=pt-BR'
//const POSTER_URL = BASE_URL + '/posters/'
const POSTER_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
const MOVIES_PER_PAGE = 8

const dataPanel = document.getElementById('data-panel')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const paginator = document.getElementById('paginator')
const dataToggle = document.getElementById('data-toggle')

let movies = []
let filtered = []
let cards = true
let page = 1



//axios.get(INDEX_URL).then((response) => {
  axios.get(BASE_URL).then((response) => {
  movies.push(...response.data.results)
  displayPaginator(movies.length)
  displayMovies(getMoviesByPage(1))
})

function displayMovies(movies) {
  if (cards === true) {
    displayMoviesCards(movies)
  } else {
    displayMoviesList(movies)
  }
}




function displayMoviesCards(movies) {
  let html = ''
  movies.forEach(function (movie) {
    html += `<div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${POSTER_URL + movie.poster_path}" alt="Movie Image" class="card-img-top">
          <div class="card-body">
            <h7 class="card-title">${movie.title}</h7>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline-primary btn-sm btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${movie.id}">Ver mais...</button>
            <button class="btn btn-outline-secondary btn-sm btn-add-favorite" data-id="${movie.id}">+</button>
          </div>
        </div>
      </div>
    </div>`
  })
  dataPanel.innerHTML = html
}

function displayMoviesList(movies) {
  let html = '<table class="table"><tbody>'
  movies.forEach(function (movie) {
    html += `<tr>
      <td>
        <h5 class="card-title">${movie.title}</h5>
      </td>
      <td>
      <button class="btn btn-outline-primary btn-sm btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${movie.id}">Ver mais...</button>
      <button class="btn btn-outline-secondary btn-sm btn-add-favorite" data-id="${movie.id}">+</button>
      </td>
    </tr>`
  })
  html += '</tbody></table>'
  dataPanel.innerHTML = html
}

function displayPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let html = ''
  for (let page = 1; page <= numberOfPages; page++) {
    html += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = html
}

 function showMovieModal(id) {
  //function showMovieModal(id) {
  const modalName = document.getElementById('movie-modal-name')
  const modalImage = document.getElementById('movie-modal-image')
  const modalDescription = document.getElementById('movie-modal-description')

 
INDEX_URL = INDEX_URL_1 + id + INDEX_URL_2

  axios.get(INDEX_URL).then((response) => {

    const movie = response.data
    console.log(movie)
       modalName.textContent =  `${movie.title}`
       modalImage.innerHTML = `<img src=${POSTER_URL + movie.poster_path} class="img-fluid" alt="Responsive image">`
       modalDescription.innerHTML = `<p>Release date: ${movie.release_date}</p>
       <p>${movie.overview} </p>` 
     })
    } 
/*
 await axios.get(INDEX_URL ).then((response) => {

 const movie = response.data.results
 console.log(movie + "oi")
    modalName.textContent = `${movie.title}` + "texto"
    modalImage.innerHTML = `<img src=${POSTER_URL + movie.poster_path} class="img-fluid" alt="Responsive image">`
    modalDescription.innerHTML = `<p>Release date: ${movie.release_date}+ 10/01/19</p>
      <p>${movie.overview} + lorem ipsum</p>
   `  
  })
 } 
*/

/*
 (async () => {
   try {
     const response = await axios.get(INDEX_URL )
     const movie = response.data.results
     console.log(response.data.explanation);
   } catch (error) {
     console.log(error.response.body);
   }
 })();

*/

function getMoviesByPage(page) {
  const data = filtered.length ? filtered : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function addToFavorites(id) {
  const list = JSON.parse(localStorage.getItem('favorites')) || []
  const movie = movies.find(movie => movie.id === id)
  if (list.some((movie) => movie.id === id)) {
    return alert('This movie is already in your favorites' + id)
  }
  list.push(movie)
  localStorage.setItem('favorites', JSON.stringify(list))
}

// Event Listeners

dataToggle.addEventListener('click', function onDataTogglePressed(event) {
  if (event.target.matches('.fa-th') && !cards) {
    cards = true
    displayMovies(getMoviesByPage(page))
  } else if (event.target.matches('.fa-bars') && cards) {
    cards = false
    displayMovies(getMoviesByPage(page))
  }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  page = Number(event.target.dataset.page)
  displayMovies(getMoviesByPage(page))
})

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorites(Number(event.target.dataset.id))
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filtered = movies.filter(movie => movie.title.toLowerCase().includes(keyword))

  if (filtered.length === 0) return alert('No movies found')

  displayPaginator(filtered.length)
  displayMovies(getMoviesByPage(1))
})