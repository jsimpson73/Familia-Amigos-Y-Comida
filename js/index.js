/**
 * Familia, Amigos Y Comida - Index Page JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update recipe links to point to the correct recipe pages
    updateRecipeLinks();
});

/**
 * Update recipe links to point to the correct recipe pages
 */
function updateRecipeLinks() {
    // Recipe data with correct links
    const recipes = [
        {
            title: "Abuela's Enchiladas",
            url: "recipe-detail.html"
        },
        {
            title: "Homemade Churros",
            url: "recipe-churros.html"
        },
        {
            title: "Sunday Paella",
            url: "recipe-paella.html"
        },
        {
            title: "Tres Leches Cake",
            url: "recipe-tres-leches.html"
        },
        {
            title: "Homemade Salsa",
            url: "recipe-salsa.html"
        },
        {
            title: "Breakfast Tacos",
            url: "recipe-breakfast-tacos.html"
        }
    ];
    
    // Get all recipe cards
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    // Update links for each recipe card
    recipeCards.forEach(card => {
        const titleElement = card.querySelector('.recipe-title');
        const linkElement = card.querySelector('.recipe-link');
        
        if (titleElement && linkElement) {
            const title = titleElement.textContent;
            const recipe = recipes.find(r => r.title === title);
            
            if (recipe) {
                linkElement.href = recipe.url;
            }
        }
    });
}