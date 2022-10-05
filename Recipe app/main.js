const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const searchInput = document.getElementById('search-input');
const results = document.querySelector('.title')

searchInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        getMealList();
    }
})

searchBtn.addEventListener("click", getMealList);


mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

document.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})




//get meal list
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(Response => Response.json())
        .then(data => {
            let html = "`<h2>Your meal results</h2>`"
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound')
            } else {
                html = "Sorry, we couldn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


//get meal recipe
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(Response => Response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

//create modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `<h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-catagory">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>

                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="recipe-link">
                        
                    </div>`;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}



