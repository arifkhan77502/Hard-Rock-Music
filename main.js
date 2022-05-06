const searchBtn = document.getElementById('search-btn');
const inputBox = document.getElementById('input-box');
const inputSong = document.getElementById('input-song');
const songName = document.getElementById('song-name');
const songFewLine = document.getElementById('song-few-line');
const lyricsBox = document.getElementById('lyrics-box');


searchBtn.addEventListener('click', getSongInfo);


function getSongInfo(){
    const inputSong = document.getElementById('input-song').value;
    const url = `https://api.lyrics.ovh/suggest/${inputSong}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySong(data.data))
}

const displaySong = songs => {
    inputSong.value = '';
    const songBox = document.getElementById('song-box');
    songBox.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "row lyrich-details d-flex justify-content-between align-items-center";
        songDiv.innerHTML = `
        <div class="col-md-8">
            <div class="column lyric-details">
                <h2 id="song-name">"${song.title}"</h2>
                <p id="artist">
                    Album By <span>"${song.artist.name}"</span>
                </p>
            </div>
        </div>

        <div class="col-md-4 d-flex justify-content-end align-items-center">
            <button onclick="getLyricsBox('${song.artist.name}', '${song.title}')" data-id="get-lyrics" class="btn btn-success get-link-btn">Get Lyrics</button>
        </div>
        `;
        songBox.appendChild(songDiv);
    });
};


function getLyricsBox(artist, title){
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data))
}

function displayLyrics(data){
    const lyricsBox = document.getElementById('lyrics-box');
    lyricsBox.innerHTML = '';
    const lyrics = data.lyrics;
    const lyricsDiv = document.createElement('div');
    lyricsDiv.className = "lyrics-box";
    lyricsDiv.innerHTML = `

    <button class="remove-btn" onclick="removeLyrics()">
    <i class="fa fa-times" aria-hidden="true"></i>
    </button>

    <div class="lyrics-details text-center">
        <figure class="text-center">
            <p id="full-lyrics" class="lead">"${lyrics}"</p>
        </figure>
    </div>
    `;
    inputBox.style.display = 'none';
    lyricsBox.appendChild(lyricsDiv);

}

function removeLyrics(){
    inputBox.style.display = 'block';
    lyricsBox.innerHTML = '';
}
