const searchSongs = async () => {
    const searchInput = document.getElementById('search-input').value;
    searchInput.innerHTML = '';
    const url = `https://api.lyrics.ovh/suggest/hello${searchInput}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.data.length > 0) {
        connectWithData(data.data)
    } else {
        console.log('Please search with a valid name')
    }
    document.getElementById('search-input').value = '';
}

const connectWithData = songs => {
    const showDisplay = document.getElementById('show-display');
    showDisplay.innerHTML = '';
    const showDetails = document.getElementById('show-details');
    showDetails.innerHTML = '';
    songs.forEach(song => {
        const singleSong = document.createElement('div');
        singleSong.className = '"single-result row align-items-center my-3 p-3"';
        singleSong.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.album.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="GetLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        showDisplay.appendChild(singleSong);
    });
}

const GetLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
}

const displayLyrics = lyrics => {
    const showDetails = document.getElementById('show-details');
    showDetails.innerText = lyrics;
}