console.log("connected js");

// step 01
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// step 02
const displayCategories = (data) => {
  //   console.log(data);
  //   step 03
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  console.log(categoryBtnContainer);

  //   step 04
  data.forEach((item) => {
    console.log(item);
    const button = document.createElement("button");
    button.classList = "btn btn-error";
    button.innerText = item.category;
    categoryBtnContainer.append(button);
  });
};

// final function invocation
loadCategories();
