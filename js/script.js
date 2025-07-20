console.log("connected js");

// step 01 : load categories btn from api
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// step 03 : load videos card from api
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// step 02 : display categories btn to ui
const displayCategories = (data) => {
  //   console.log(data);
  //   sub-step 02
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  //   console.log(categoryBtnContainer);

  //   sub-step 02
  data.forEach((item) => {
    // console.log(item);
    const button = document.createElement("button");
    button.classList = "btn btn-error";
    button.innerText = item.category;
    categoryBtnContainer.append(button);
  });
};

// step 04 : display videos card to the ui
const displayVideos = (data) => {
  //   console.log(data);
  const videoCardContainer = document.getElementById("video-card-container");
  data.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList = "card";
    div.innerHTML = `
        <figure class = "h-52">
            <img
                src = "${item.thumbnail}"
                class = "h-full w-full object-cover"
            />
        </figure>
        <section class = "px-0 py-2 flex gap-5">
            <img
                src = "${item.authors[0].profile_picture}"
                class = "h-12 w-12 rounded-full object-cover"
            />
            <div>
                <h2 class = "font-bold">${item.title}</h2>
                <div class = "flex gap-2 items-center">
                    <p>${item.authors[0].profile_name}</p>
                    ${
                      item.authors[0].verified === true
                        ? ' <img class = "w-5 h-5" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000"> '
                        : ""
                    }
                </div>
                <p>${item.others.views}</p>
            </div>
        </section>
    `;
    videoCardContainer.append(div);
  });
};

// final function invocation
loadCategories();
loadVideos();
