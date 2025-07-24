console.log("connected js");

// step 01 : load categories btn from api
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// step 03 : load videos card from api
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// step 06 : load videos by button clicked
const loadClickedBtnVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      // console.log(activeBtn);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(console.error()));
};

// loadDetails function
const loadDetails = (modalVideoId) => {
  console.log(modalVideoId);
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${modalVideoId}`
  )
    .then((res) => res.json())
    .then((data) => displayDetails(data.video))
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
    // const button = document.createElement("button");
    // button.classList = "btn btn-error";
    // button.innerText = item.category;
    // categoryBtnContainer.append(button);

    // sub-step 03 (clone of substep 02)
    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
          <button id="btn-${item.category_id}" class="btn cat-btn"
                  onclick = "loadClickedBtnVideos(${item.category_id})">
                        ${item.category}
          </button>
    `;
    categoryBtnContainer.append(buttonDiv);
  });
};

// step 04 : display videos card to the ui
const displayVideos = (data) => {
  //   console.log(data);
  // console.log(data.length);

  const videoCardContainer = document.getElementById("video-card-container");
  videoCardContainer.innerHTML = "";
  if (data.length === 0) {
    videoCardContainer.classList.remove("grid");
    videoCardContainer.innerHTML = `
        <div class = "flex justify-center items-center gap-5 w-full">
            <img src = "./assets/Icon.png">
        </div>
        <h1 class = "text-center text-xl font-bold mt-10"> 
            opps !! sorry <br> here is no content 
        </h1>
                                    `;
    return;
  } else {
    videoCardContainer.classList.add("grid");
  }
  data.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
        <figure class = "h-52 relative" >
            <img
                src = "${item.thumbnail}"
                class = "h-full w-full object-cover"
            />
            ${
              item.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute right-2 bottom-2 text-xs bg-black text-white rouded-sm p-2">
                  ${getTimeString(item.others.posted_date)}
                </span>`
            }
           
        </figure>
        <section class = "px-0 py-2 flex justify-evenly items-center">
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
                        ? ` <img class = "w-5 h-5" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000"> `
                        : ""
                    }
                </div>
                <p>${item.others.views}</p>
            </div>
            <button class = "btn btn-accent"
                    onclick = loadDetails('${item.video_id}')>
                            Details
            </button>
        </section>
    `;
    videoCardContainer.append(div);
  });
};

// displayDetails function
const displayDetails = (modalCard) => {
  // console.log(modalCard);
  const { thumbnail, title, description } = modalCard;

  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
        <img src = "${thumbnail}"/>
        <h2 class = "text-xl font-bold" >${title}</h2>
        <p class = "text-base font-normal text-justify">${description}</p>
  
  `;

  // modal show system
  document.getElementById("detailsModal").showModal();
};

//step 05: utility function declaretion
function getTimeString(paramSeconds) {
  const hour = parseInt(paramSeconds / 3600);
  let remainingSeconds = paramSeconds % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hour} hour ${minute} minute ${remainingSeconds} second ago`;
}

// remove active class function declaretion
function removeActiveClass() {
  const btns = document.getElementsByClassName("cat-btn");
  // console.log(btns);
  for (let btn of btns) {
    btn.classList.remove("active");
  }
}
// search functionality implementation
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", (event) => {
  loadVideos(event.target.value);
});

// final function invocation
loadCategories();
loadVideos();
