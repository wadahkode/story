function sampleRequest() {
  const reader = new FileReader();
  let example = new Blob(
    [
      JSON.stringify(
        [
          {
            id: 1,
            title: "Title 1",
            name: "wadahkode",
            story: "Blabla",
            liked: [],
            comments: [],
          },
          {
            id: 2,
            title: "Title 2",
            name: "wadahkode",
            story: "Blibli",
            liked: [],
            comments: [],
          },
          {
            id: 3,
            title: "Title 3",
            name: "wadahkode",
            story: "Blublu",
            liked: [],
            comments: [],
          },
          {
            id: 4,
            title: "Title 4",
            name: "wadahkode",
            story: "Bleble",
            liked: [],
            comments: [],
          },
          {
            id: 5,
            title: "Title 5",
            name: "wadahkode",
            story: "Bloblo",
            liked: [],
            comments: [],
          },
        ],
        null,
        2
      ),
    ],
    {
      type: "application/json",
    }
  );

  return new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(JSON.parse(e.target.result));
    reader.readAsText(example);
  });
  //return JSON.parse(await (new Response(example)).text())
}

const getUserData = async () => {
  let data = null;

  if (localStorage.getItem("userData")) {
    data = JSON.parse(localStorage.getItem("userData"));
  }

  return await data;
};
