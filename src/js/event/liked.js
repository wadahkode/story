/**
 * Event handler for click like
 *
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since version 0.0.1
 */
class RealtimeLiked {
  constructor(prop) {
    this.btnLike = [];
    this.data = [];
    this.totalLiked = [];
    // uncomment this for developer
    // localStorage.removeItem("dataLiked")
  }

  /**
   * Event handleLiked
   *
   * @param MouseEvent(...)
   */
  async handleLiked(event) {
    const btn = event.currentTarget;
    const key = btn.dataset.target;

    if (localStorage.getItem("data")) {
      let newData = JSON.parse(localStorage.getItem("data"));
      newData.filter((item, index) => {
        if (!this.data[index]) {
          return this.data.push(item);
        }
      });
    }

    // console.log(this.data);

    if (btn.classList.contains("liked") && localStorage.getItem("dataLiked")) {
      this.data[key].liked.pop({
        id: key,
        value: this.data[key].liked.length + 1,
        text: "👍",
      });

      btn.classList.remove("liked");
    } else {
      this.data[key].liked.push({
        id: key,
        value: this.data[key].liked.length + 1,
        text: "👎",
      });

      btn.classList.add("liked");
    }
    // console.log(this.data);
    localStorage.setItem("dataLiked", JSON.stringify(this.data));
  }

  // Starting event handler for click like
  async start() {
    await this.getData();

    this.totalLiked = document.querySelectorAll(".total-liked");
    this.btnLike = document.querySelectorAll(".btn-like");
    this.btnLike.forEach(
      (btn) => (btn.onclick = (event) => this.handleLiked(event))
    );

    if (this.btnLike.length < 1) {
      return false;
    }

    this.realtimeContext();
  }

  // Context like from storage
  realtimeContext() {
    const context = setInterval(() => {
      if (localStorage.getItem("dataLiked")) {
        this.data = JSON.parse(localStorage.getItem("dataLiked"));
      }

      this.data.map((snapshot, key) => {
        if (snapshot.liked.length >= 1) {
          snapshot.liked.forEach((item) => {
            this.totalLiked[item.id].innerHTML = item.value + " like";
            this.btnLike[item.id].innerHTML = item.text;
            this.btnLike[item.id].classList.add("liked");
          });
        } else {
          this.totalLiked[key].innerHTML = snapshot.liked.length + " like";
          this.btnLike[key].innerHTML = "👍";
          this.btnLike[key].classList.remove("liked");
        }
      });
    }, 200);

    return () => {
      clearInterval(context);
    };
  }

  // Getting data from sample request
  async getData() {
    this.data = await sampleRequest();

    if (localStorage.getItem("data")) {
      let newData = JSON.parse(localStorage.getItem("data"));

      newData.filter((item, index) => {
        if (!this.data[index]) {
          return this.data.push(item);
        }
      });
    }
  }
}

// Run
((realtime) => realtime.start())(new RealtimeLiked());
