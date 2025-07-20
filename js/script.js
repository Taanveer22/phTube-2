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
  console.log(data);
};

// final function invocation
loadCategories();
