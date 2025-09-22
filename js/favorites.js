/**
 * Familia, Amigos Y Comida - Favorites JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginRequired = document.getElementById('login-required');
    const noFavorites = document.getElementById('no-favorites');
    const favoritesGrid = document.getElementById('favorites-grid');
    
    // Update navigation based on login status
    updateNavigation(isLoggedIn);
    
    if (!isLoggedIn) {
        // Show login required message
        loginRequired.style.display = 'block';
        noFavorites.style.display = 'none';
        favoritesGrid.style.display = 'none';
    } else {
        // Hide login required message
        loginRequired.style.display = 'none';
        
        // Get favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favorites.length === 0) {
            // Show no favorites message
            noFavorites.style.display = 'block';
            favoritesGrid.style.display = 'none';
        } else {
            // Hide no favorites message
            noFavorites.style.display = 'none';
            favoritesGrid.style.display = 'grid';
            
            // Load favorite recipes
            loadFavoriteRecipes(favorites);
        }
    }
});

// Function to update navigation based on login status
function updateNavigation(isLoggedIn) {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    
    if (isLoggedIn) {
        // Change login link to logout
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
        
        // Hide register link
        registerLink.style.display = 'none';
    }
}

// Function to load favorite recipes
function loadFavoriteRecipes(favorites) {
    const favoritesGrid = document.getElementById('favorites-grid');
    
    // Clear existing content
    favoritesGrid.innerHTML = '';
    
    // Recipe data (in a real app, this would come from a database)
    const recipes = [
        {
            id: '1',
            title: "Abuela's Enchiladas",
            description: "A family recipe passed down through generations, these enchiladas are the perfect comfort food.",
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tags: ["Main Dish", "Family Favorite"],
            url: "recipe-detail.html"
        },
        {
            id: '2',
            title: "Homemade Churros",
            description: "Crispy on the outside, soft on the inside, these churros are perfect for any celebration.",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tags: ["Dessert", "Holiday"],
            url: "recipe-churros.html"
        },
        {
            id: '3',
            title: "Sunday Paella",
            description: "This vibrant and flavorful paella is perfect for Sunday family gatherings.",
            image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tags: ["Main Dish", "Weekend"],
            url: "recipe-paella.html"
        },
        {
            id: '4',
            title: "Tres Leches Cake",
            description: "A light and airy sponge cake soaked in three types of milk, topped with whipped cream.",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tags: ["Dessert", "Family Favorite"],
            url: "recipe-tres-leches.html"
        },
        {
            id: '5',
            title: "Homemade Salsa",
            description: "Fresh and vibrant salsa made with ripe tomatoes, onions, cilantro, and a hint of lime.",
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tags: ["Appetizer", "Quick & Easy"],
            url: "recipe-salsa.html"
        },
        {
            id: '6',
            title: "Breakfast Tacos",
            description: "Start your day with these delicious breakfast tacos filled with eggs, cheese, and your favorite toppings.",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tags: ["Breakfast", "Quick & Easy"],
            url: "recipe-breakfast-tacos.html"
        }
    ];
    
    // Filter recipes to only show favorites
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
    
    // Create recipe cards for each favorite
    favoriteRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        
        const tagsHtml = recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('');
        
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-tags">
                    ${tagsHtml}
                </div>
                <div class="recipe-actions">
                    <a href="${recipe.url}" class="recipe-link">View Recipe</a>
                    <button class="favorite-button active" data-id="${recipe.id}" title="Remove from favorites">♥</button>
                </div>
            </div>
        `;
        
        favoritesGrid.appendChild(recipeCard);
        
        // Add event listener to favorite button
        const favoriteButton = recipeCard.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-id');
            removeFromFavorites(recipeId, recipeCard);
        });
    });
}

// Function to remove a recipe from favorites
function removeFromFavorites(recipeId, recipeCard) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(recipeId);
    
    if (index !== -1) {
        // Remove from favorites array
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Remove the card with animation
        recipeCard.style.opacity = '0';
        setTimeout(() => {
            recipeCard.remove();
            
            // Check if there are no more favorites
            if (favorites.length === 0) {
                document.getElementById('no-favorites').style.display = 'block';
                document.getElementById('favorites-grid').style.display = 'none';
            }
        }, 300);
    }
}