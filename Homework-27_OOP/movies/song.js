import Media from "./media.js";

class Song extends Media {
  constructor(title, duration, artist) {
    super(title, duration);
    this.artist = artist;
  }
  getInfo() {
    return this.artist;
  }
}

export default Song;
