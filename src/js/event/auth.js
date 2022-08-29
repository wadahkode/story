/**
 * Authentication
 *
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since version 0.0.1
 */
// localStorage.removeItem("userData")

const error = [
  {
    type: "ACCOUNT_NOT_READY",
    message: "username could not be found!",
  },
  {
    type: "PASSWORD_WRONG",
    message: "Password wrong!",
  },
  {
    type: "SUCCESS",
    message: "Successfully, please wait...",
  },
];
const formLogin = document.querySelector(".form-login");
const userData = [
  {
    username: "admin",
    password: "admin",
    remember: false,
  },
];
const containerError = document.getElementById("error");

const auth = ({ username, password, remember }) => {
  const validation = userData.map((item) => {
    if (item.username !== username.value) {
      containerError.innerHTML = error[0].message;
      containerError.classList.add(error[0].type);

      return null;
    } else if (item.password !== password.value) {
      containerError.innerHTML = error[1].message;
      containerError.classList.add(error[1].type);

      return null;
    } else {
      item.remember = remember.checked;

      return item;
    }
  });

  if (validation[0] === null) {
    formLogin.reset();

    return false;
  }

  localStorage.setItem("userData", JSON.stringify(validation));
  containerError.innerHTML = error[2].message;
  containerError.classList.add(error[2].type);

  setTimeout(() => {
    location.reload();
  }, 3000);
};

if (localStorage.getItem("userData") === null) {
  formLogin.onsubmit = (event) => {
    event.preventDefault();
    auth(event.currentTarget);
  };
}

const removeError = setInterval(() => {
  if (!containerError) {
    clearInterval(removeError);

    return false;
  }

  if (containerError.innerHTML !== "") {
    setTimeout(() => {
      containerError.innerHTML = "";
      containerError.removeAttribute("class");
    }, 2000);
  }
}, 200);
