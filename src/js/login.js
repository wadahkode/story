/**
 * Handle user
 *
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since version 0.0.1
 */
function loginComponent(props) {
  const { root } = props;

  root.innerHTML = /*html*/ `
    <div class="container-login">
      <div id="error"></div>
      <form class="form-login" method="post">
        <div class="input-group">
          <label>Username</label>
          <input type="text" id="username" class="input-control username" placeholder="input username" required/>
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" id="password" class="input-control password" placeholder="input password" required/>
        </div>
        <div class="input-help">
          <div class="input-remember">
            <input type="checkbox" id="remember" class="input-control" value="off"/> remember me
          </div>
          <div>
            <a href="#">forget password?</a>
          </div>
        </div>
        <button type="submit" id="btn-login">Login</button>
      </form>
      
      <div>
        Don't have an account yet? <a href="#">Register now</a>
      </div>
    </div>
  `;
}
