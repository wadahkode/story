/**
 * Event handler for comment
 * 
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since version 0.0.1
 */
class RealtimeComment {
  constructor(prop) {
    this.btnComment = []
    this.btnSubmit = []
    this.containerComments = []
    this.data = []
    this.editor = []
    this.formComment = []
    this.keyboard = {}
    this.keyboardHistory = []
    this.totalComments = []
    // localStorage.removeItem("dataComment")
    // localStorage.removeItem("keyboardHistory")
  }
  
  // Getting data from sample request
  async getData() {
    this.data = await sampleRequest()
    
    if (localStorage.getItem("data")) {
      let newData = JSON.parse(localStorage.getItem("data"));
      
      newData.filter((item, index) => {
        if (!this.data[index]) {
          return this.data.push(item)
        }
      })
    }
  }
  
  async handleToggleComment(event) {
    const btn = event.currentTarget
    const key = btn.dataset.target
    
    this.formComment[key].classList.toggle("active")
  }
  
  async handleChange(event) {
    const editor = event.currentTarget
    const key = editor.dataset.target
    this.btnSubmit = this.formComment[key].querySelector(".btn-submit")
    
    if (editor.value.length >= 1) {
      this.btnSubmit.disabled = false
    } else {
      this.btnSubmit.disabled = true
    }
    
    this.btnSubmit.onclick = () => {
      this.formComment[key].classList.remove("active")
      this.keyboard = {
        id: key,
        name: "Anonymous",
        value: editor.value
      }
      editor.value = ""
      this.saveComment()
    }
  }
  
  async saveComment() {
    if (localStorage.getItem("dataComment") && localStorage.getItem("keyboardHistory")) {
      this.data = JSON.parse(localStorage.getItem("dataComment"))
      this.keyboardHistory = JSON.parse(localStorage.getItem("keyboardHistory"));
    }
    
    this.data[this.keyboard.id].comments.push(this.keyboard)
    this.keyboardHistory.push(this.keyboard)
    
    localStorage.setItem("dataComment", JSON.stringify(this.data))
    localStorage.setItem("keyboardHistory", JSON.stringify(this.keyboardHistory))
    
    window.onload()
  }
  
  async realtimeContext() {
    const context = setInterval(() => {
      if (localStorage.getItem("dataComment") && localStorage.getItem("keyboardHistory")) {
        this.data = JSON.parse(localStorage.getItem("dataComment"));
        this.keyboardHistory = JSON.parse(localStorage.getItem("keyboardHistory"));
      }
      
      // console.log(this.keyboardHistory);
      if (this.keyboardHistory.length >= 1) {
        this.keyboardHistory.map((keyboard) => {
          let totalComments = this.data[keyboard.id].comments.length
          
          this.totalComments[keyboard.id].innerHTML = totalComments + " comment"
        })
      }
    }, 200)
    
    return () => {
      clearInterval(context)
    }
  }
  
  // Start event handler
  async start() {
    await this.getData()
    
    console.log(this.data);
    
    this.btnComment = document.querySelectorAll(".btn-comment")
    this.btnSubmit = document.querySelectorAll(".btn-submit")
    this.containerComments = document.querySelectorAll(".container-comment")
    this.editor = document.querySelectorAll(".editor")
    this.formComment = document.querySelectorAll(".form-comment")
    this.totalComments = document.querySelectorAll(".total-comments")
    this.btnComment.forEach((btn) => {
      btn.onclick = (event) => this.handleToggleComment(event)
    })
    
    this.editor.forEach(editor => {
      editor.onkeyup = (event) => this.handleChange(event)
    })
    
    await this.realtimeContext()
    
    window.onload = () => {
      if (localStorage.getItem("dataComment") && localStorage.getItem("keyboardHistory")) {
        this.data = JSON.parse(localStorage.getItem("dataComment"));
        this.keyboardHistory = JSON.parse(localStorage.getItem("keyboardHistory"));
      }
      
      this.data.map((snapshot) => {
        let comments = snapshot.comments.map((item) => {
          if (item.id in this.containerComments) {
            return `
              <li>
                <div class="card-comments">
                  <div>
                    <h2>${item.name}</h2>
                  </div>
                  <div>
                    ${item.value}
                  </div>
                </div>
              </li>
            `
          }
        })
        
        snapshot.comments.map((item) => {
          this.containerComments[item.id].innerHTML = comments.join("")
          this.containerComments[item.id].classList.add("active")
        })
      })
    }
    
    window.onload()
  }
}

((realtime) => realtime.start())(new RealtimeComment())