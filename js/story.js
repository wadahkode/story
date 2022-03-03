/**
 * Story Component 
 * 
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since version 0.0.1
 */
// localStorage.removeItem("data")
// localStorage.removeItem("dataLiked")
// localStorage.removeItem("dataComment")
const storyComponent = (prop) => {
  if (localStorage.getItem("data")) {
    prop.data = JSON.parse(localStorage.getItem("data"));
  }
  
  prop.data.forEach((item, key) => prop.root.innerHTML += `
    <div class="card card-default">
      <div class="card-header">
        <div>
          <h2>${item.title}</h2>
          <sub>@${item.name}</sub>
        </div>
      </div>
      <div class="card-body">
        <p>${item.story}</p>
      </div>
      <div class="card-footer">
        <ul class="total">
          <li class="total-liked">${item.liked.length} like</li>
          <li>|</li>
          <li class="total-comments">${item.comments.length} comment</li>
        </ul>
        
        <div class="btn-group">
          <button type="button" class="btn-default btn-like" data-target="${key}">👍</button>
          <button type="button" class="btn-default btn-comment" data-target="${key}">💬</button>
        </div>
        <div class="form-comment">
          <textarea class="editor" placeholder="Write comment..." data-target="${key}"></textarea>
          <button type="button" class="btn-default btn-submit comment" disabled="true">send</button>
        </div>
        <ul class="container-comment">
          <li>tidak ada komentar</li>
        </ul>
      </div>
    </div>
  `)
}

const saveStory = async data => {
  let request = await sampleRequest()
  
  if (localStorage.getItem("data")) {
    request = JSON.parse(localStorage.getItem("data"));
  }
  
  let id = parseInt(request.length) + 1
  let name = "anonymous"
  let title = titleStory.value.length < 1 ? "Untitled " + id : titleStory.value
  
  const user = await getUserData()
  
  if (user!== null) {
    name = user[0].username
  }
  
  data = {
    id,
    title,
    name,
    story: data,
    liked: [],
    comments: []
  }
  request.push(data)
  
  editorStory.value = ""
  titleStory.value = ""
  btnStory.disabled = true
  
  localStorage.setItem("data", JSON.stringify(request))
  location.reload()
}

const btnStory = document.querySelector(".btn-story")
const editorStory = btnStory.previousElementSibling
const titleStory = editorStory.previousElementSibling

editorStory.onkeyup = event => {
  const target = event.currentTarget
  
  if (target.value.length >= 1) {
    btnStory.disabled = false
  } else {
    btnStory.disabled = true
  }
  
  btnStory.onclick = (event) => {
    event.preventDefault()
    saveStory(target.value)
  }
}
