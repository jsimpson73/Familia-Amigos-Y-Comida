/**
 * Familia, Amigos Y Comida - Recipes JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update recipe links to point to the correct recipe pages
    updateRecipeLinks();
    
    // Initialize filter and search functionality
    initFilterSearch();
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

/**
 * Initialize filter and search functionality
 */
function initFilterSearch() {
    const filterCategory = document.getElementById('filter-category');
    const sortDropdown = document.getElementById('sort-dropdown');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const recipeGrid = document.getElementById('recipe-grid');
    const noResults = document.getElementById('no-results');
    const resetFilters = document.getElementById('reset-filters');
    
    if (filterCategory && sortDropdown && searchInput && searchButton && recipeGrid && noResults && resetFilters) {
        // Filter recipes based on current filters
        function filterRecipes() {
            const category = filterCategory.value;
            const sortBy = sortDropdown.value;
            const searchTerm = searchInput.value.toLowerCase();
            
            const recipeCards = recipeGrid.querySelectorAll('.recipe-card');
            let visibleCount = 0;
            
            recipeCards.forEach(card => {
                const title = card.querySelector('.recipe-title').textContent.toLowerCase();
                const description = card.querySelector('.recipe-description').textContent.toLowerCase();
                const tags = card.querySelector('.recipe-tags').textContent.toLowerCase();
                
                let categoryMatch = category === 'all' || tags.includes(category);
                let searchMatch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);
                
                if (categoryMatch && searchMatch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                recipeGrid.style.display = 'none';
                noResults.style.display = 'block';
            } else {
                recipeGrid.style.display = 'grid';
                noResults.style.display = 'none';
            }
            
            // Sort visible recipes
            sortRecipes(sortBy);
        }
        
        // Sort recipes based on selected option
        function sortRecipes(sortBy) {
            const recipeCards = Array.from(recipeGrid.querySelectorAll('.recipe-card'));
            const visibleCards = recipeCards.filter(card => card.style.display !== 'none');
            
            visibleCards.sort((a, b) => {
                const titleA = a.querySelector('.recipe-title').textContent;
                const titleB = b.querySelector('.recipe-title').textContent;
                
                switch(sortBy) {
                    case 'a-z':
                        return titleA.localeCompare(titleB);
                    case 'z-a':
                        return titleB.localeCompare(titleA);
                    case 'newest':
                        // In a real application, this would sort by date
                        // For demo purposes, we'll just use the current order
                        return -1;
                    case 'oldest':
                        // In a real application, this would sort by date
                        // For demo purposes, we'll just reverse the current order
                        return 1;
                    default:
                        return 0;
                }
            });
            
            // Reorder the cards in the DOM
            visibleCards.forEach(card => {
                recipeGrid.appendChild(card);
            });
        }
        
        // Event listeners
        filterCategory.addEventListener('change', filterRecipes);
        sortDropdown.addEventListener('change', filterRecipes);
        searchButton.addEventListener('click', filterRecipes);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterRecipes();
            }
        });
        
        resetFilters.addEventListener('click', function() {
            filterCategory.value = 'all';
            sortDropdown.value = 'newest';
            searchInput.value = '';
            filterRecipes();
        });
    }
}