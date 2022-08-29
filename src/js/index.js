/**
 * Story Card
 *
 * How to create feature like, dislike and comment
 *
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @github https://github.com/wadahkode/wadahkode
 * @since version 0.0.1
 */
(async (root) => {
  const data = localStorage.getItem("userData");

  if (data === null) {
    loginComponent({ root: document.querySelector(".container") });
  } else {
    storyComponent({ root, data: await sampleRequest() });
  }
})(document.getElementById("root"));
