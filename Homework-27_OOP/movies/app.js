// class Media
class Media {
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
    this.isPlaying = false;
  }
  play() {
    return (this.isPlaying = true);
  }
  stop() {
    return (this.isPlaying = false);
  }
  getInfo() {
    throw Errow("Method must be overriden in subclass");
  }
  toHtml() {
    return `<div class="row py-3 ${this.isPlaying ? "current" : ""}">
      <div class="col-sm-9">${this.title} - ${this.getInfo()}</div>
      <div class="col-sm-3">${this.duration}</div>
    </div>`;
  }
}

// class Song
class Song extends Media {
  constructor(title, duration, artist) {
    super(title, duration);
    this.artist = artist;
  }
  getInfo() {
    return this.artist;
  }
}

//class Movie
class Movie extends Media {
  constructor(title, duration, year) {
    super(title, duration);
    this.year = year;
  }
  getInfo() {
    return this.year;
  }
}

// class Playlist
class PlayList {
  constructor() {
    this.items = [];
    this.currentIndex = 0;
  }
  add(item) {
    this.items.push(item);
  }
  play() {
    this.items[this.currentIndex].play();
    console.log(this.items[this.currentIndex]);
  }
  stop() {
    this.items[this.currentIndex].stop();
  }
  next() {
    this.stop();
    this.currentIndex =
      this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
    this.play();
  }

  render(el) {
    let m = this.items
      .map((item) => {
        return item.toHtml();
      })
      .join("");
    el.innerHTML = m;
  }
}

// create songs / movies
const song1 = new Song("Yellow submarine", "4:33", "Beatles");
const song2 = new Song("There're must be an angel", "6:03", " Eurythmics");
const song3 = new Song("There're must be a third song", "4:03", "Some artist");
const movie1 = new Movie("Man of steal", "2:00:03", "2012");

// create playlist1
const playlist1 = new PlayList();

// add items to playlist
playlist1.add(song1);
playlist1.add(song2);
playlist1.add(song3);
playlist1.add(movie1);

//add functionality to buttons
document.querySelector("#btn-player").addEventListener("click", handleClick);

function handleClick(e) {
  let target = e.target;
  switch (target.id) {
    case "btn-play":
      playlist1.play();
      break;
    case "btn-next":
      playlist1.next();
      break;
    case "btn-stop":
      playlist1.stop();
      break;
  }
}

// render playlist
const list = document.querySelector("#list");
playlist1.render(list);
