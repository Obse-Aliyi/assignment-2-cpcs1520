document.querySelector('#album-search-form').addEventListener('submit', onHandleForm);

let albumStore;

async function appInit() {
  const res = await fetch('/public/data/albums.json');
  const data = await res.json();

  albumStore = [...data];

  renderAlbums(albumStore);
}

function renderAlbums(albums) {
  const tableBody = document.querySelector('#album-rows');
  tableBody.innerHTML = '';
  
  albums.forEach(album => {
    const template = `
      <tr>
        <td>${album.album}</td>
        <td>${album.releaseDate}</td>
        <td>${album.artistName}</td>
        <td>${album.genres}</td>
        <td>${album.averageRating}</td>
        <td>${album.numberReviews}</td>
      </tr>`;
    tableBody.innerHTML += template;
  });
}

function onHandleForm(e) {
  e.preventDefault();
  const searchQuery = document.querySelector('#search-input').value.trim().toLowerCase();
  const minRating = parseFloat(document.querySelector('#min-album-rating-input').value.trim());
  
  const searchResults = searchText(searchQuery);
  const searchMinRating = rating(minRating);
  const albumResults = results(searchResults, searchMinRating);
  renderAlbums(albumResults);
}

function searchText(query){
  return albumStore.filter(album => album.artistName.toLowerCase().includes(query) 
  || album.album.toLowerCase().includes(query));
}

function rating(minRating) {
  return albumStore.filter(album => album.averageRating >= minRating);
}

function results(results1, results2) {
  const result = [...results1, ...results2];
  return result.filter((album, index) => result.indexOf(album) === index);
}

appInit();





