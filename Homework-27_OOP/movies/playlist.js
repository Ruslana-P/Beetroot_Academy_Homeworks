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
export default PlayList;
