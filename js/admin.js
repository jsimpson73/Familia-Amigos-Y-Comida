/**
 * Familia, Amigos Y Comida - Admin JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    checkAdminAccess();
    
    // Initialize admin tabs
    initAdminTabs();
    
    // Initialize admin actions
    initAdminActions();
    
    // Initialize recipe form if on add/edit recipe page
    initAdminRecipeForm();
});

/**
 * Check if user has admin access
 */
function checkAdminAccess() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
        // Redirect to login page
        window.location.href = '../login.html';
    }
}

/**
 * Initialize Admin Tabs
 */
function initAdminTabs() {
    const tabButtons = document.querySelectorAll('.admin-tab');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.admin-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Initialize Admin Actions
 */
function initAdminActions() {
    // Add Recipe Button
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    if (addRecipeBtn) {
        addRecipeBtn.addEventListener('click', function() {
            window.location.href = 'add-recipe.html';
        });
    }
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                    // In a real application, this would send a delete request to the server
                    // For demo purposes, we'll just remove the row from the table
                    const row = this.closest('tr');
                    if (row) {
                        row.remove();
                    }
                }
            });
        });
    }
    
    // Approve buttons
    const approveButtons = document.querySelectorAll('.btn-approve');
    if (approveButtons.length > 0) {
        approveButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (confirm('Are you sure you want to approve this recipe? It will be published on the site.')) {
                    // In a real application, this would send an approve request to the server
                    // For demo purposes, we'll just remove the row from the pending submissions
                    const row = this.closest('tr');
                    if (row) {
                        row.remove();
                        
                        // Show a success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Recipe approved and published successfully!';
                        successMessage.style.color = '#4CAF50';
                        successMessage.style.padding = '10px';
                        successMessage.style.marginBottom = '20px';
                        
                        const table = document.querySelector('#pending-submissions table');
                        if (table) {
                            table.parentNode.insertBefore(successMessage, table);
                            
                            // Remove the message after a few seconds
                            setTimeout(() => {
                                successMessage.remove();
                            }, 5000);
                        }
                    }
                }
            });
        });
    }
    
    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('#recent-recipes tbody tr');
            
            tableRows.forEach(row => {
                const title = row.querySelector('td:first-child').textContent.toLowerCase();
                const author = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const categories = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm) || categories.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Filter dropdown
    const filterDropdown = document.querySelector('.filter-dropdown');
    if (filterDropdown) {
        filterDropdown.addEventListener('change', function() {
            const category = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('#recent-recipes tbody tr');
            
            if (category === 'all') {
                tableRows.forEach(row => {
                    row.style.display = '';
                });
            } else {
                tableRows.forEach(row => {
                    const categories = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                    
                    if (categories.includes(category)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }
}

/**
 * Initialize Admin Recipe Form
 */
function initAdminRecipeForm() {
    const recipeForm = document.getElementById('add-recipe-form');
    
    if (recipeForm) {
        // Add ingredient row
        const addIngredientBtn = document.getElementById('add-ingredient');
        if (addIngredientBtn) {
            addIngredientBtn.addEventListener('click', function() {
                addIngredientRow();
            });
        }
        
        // Add instruction row
        const addInstructionBtn = document.getElementById('add-instruction');
        if (addInstructionBtn) {
            addInstructionBtn.addEventListener('click', function() {
                addInstructionRow();
            });
        }
        
        // Set up remove buttons for initial rows
        setupRemoveButtons();
        
        // Preview button
        const previewBtn = document.getElementById('preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', function() {
                // In a real application, this would generate a preview
                alert('Preview functionality would be implemented in a real application.');
            });
        }
        
        // Form submission
        recipeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateRecipeForm()) {
                return;
            }
            
            // Collect form data
            const formData = new FormData(recipeForm);
            const recipeData = {
                title: formData.get('title'),
                author: formData.get('author'),
                introduction: formData.get('introduction'),
                prep_time: formData.get('prep_time'),
                cook_time: formData.get('cook_time'),
                servings: formData.get('servings'),
                ingredients: [],
                instructions: [],
                categories: formData.getAll('categories[]'),
                notes: formData.get('notes'),
                status: formData.get('status'),
                featured: formData.get('featured') === 'on',
                creation_date: new Date().toISOString()
            };
            
            // Collect ingredients
            const ingredientInputs = recipeForm.querySelectorAll('input[name="ingredients[]"]');
            ingredientInputs.forEach(input => {
                if (input.value.trim()) {
                    recipeData.ingredients.push(input.value.trim());
                }
            });
            
            // Collect instructions
            const instructionInputs = recipeForm.querySelectorAll('textarea[name="instructions[]"]');
            instructionInputs.forEach(input => {
                if (input.value.trim()) {
                    recipeData.instructions.push(input.value.trim());
                }
            });
            
            // In a real application, this would send the data to the server
            // For demo purposes, we'll just log it and show a success message
            console.log('Recipe data:', recipeData);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Recipe saved successfully!';
            successMessage.style.color = '#4CAF50';
            successMessage.style.padding = '10px';
            successMessage.style.marginBottom = '20px';
            
            recipeForm.parentNode.insertBefore(successMessage, recipeForm);
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Remove the message after a few seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
            // Reset form if it's an add form (not edit)
            if (window.location.href.includes('add-recipe.html')) {
                recipeForm.reset();
                
                // Remove extra ingredient and instruction rows
                const ingredientContainer = document.getElementById('ingredients-container');
                const instructionContainer = document.getElementById('instructions-container');
                
                while (ingredientContainer.children.length > 1) {
                    ingredientContainer.removeChild(ingredientContainer.lastChild);
                }
                
                while (instructionContainer.children.length > 1) {
                    instructionContainer.removeChild(instructionContainer.lastChild);
                }
                
                // Hide image preview
                const imagePreview = document.getElementById('image-preview');
                if (imagePreview) {
                    imagePreview.style.display = 'none';
                }
            }
        });
    }
}

/**
 * Add a new ingredient row
 */
function addIngredientRow() {
    const container = document.getElementById('ingredients-container');
    
    if (container) {
        const newRow = document.createElement('div');
        newRow.className = 'ingredient-row';
        newRow.innerHTML = `
            <input type="text" name="ingredients[]" class="form-input" placeholder="e.g., 2 cups flour">
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        container.appendChild(newRow);
        
        // Add event listener to the new remove button
        const removeBtn = newRow.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            container.removeChild(newRow);
        });
    }
}

/**
 * Add a new instruction row
 */
function addInstructionRow() {
    const container = document.getElementById('instructions-container');
    
    if (container) {
        const newRow = document.createElement('div');
        newRow.className = 'instruction-row';
        newRow.innerHTML = `
            <textarea name="instructions[]" class="form-textarea" placeholder="Describe this step..."></textarea>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        container.appendChild(newRow);
        
        // Add event listener to the new remove button
        const removeBtn = newRow.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            container.removeChild(newRow);
        });
    }
}

/**
 * Set up remove buttons for initial rows
 */
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.parentElement;
            const container = row.parentElement;
            
            // Only remove if there's more than one row
            if (container.children.length > 1) {
                container.removeChild(row);
            }
        });
    });
}

/**
 * Validate Recipe Form
 */
function validateRecipeForm() {
    const title = document.getElementById('recipe-title').value.trim();
    const author = document.getElementById('recipe-author').value.trim();
    const intro = document.getElementById('recipe-intro').value.trim();
    const prepTime = document.getElementById('prep-time').value;
    const cookTime = document.getElementById('cook-time').value;
    const servings = document.getElementById('servings').value;
    
    // Check required fields
    if (!title || !author || !intro || !prepTime || !cookTime || !servings) {
        alert('Please fill out all required fields.');
        return false;
    }
    
    // Check ingredients
    const ingredients = document.querySelectorAll('input[name="ingredients[]"]');
    let hasIngredients = false;
    
    ingredients.forEach(input => {
        if (input.value.trim()) {
            hasIngredients = true;
        }
    });
    
    if (!hasIngredients) {
        alert('Please add at least one ingredient.');
        return false;
    }
    
    // Check instructions
    const instructions = document.querySelectorAll('textarea[name="instructions[]"]');
    let hasInstructions = false;
    
    instructions.forEach(input => {
        if (input.value.trim()) {
            hasInstructions = true;
        }
    });
    
    if (!hasInstructions) {
        alert('Please add at least one instruction step.');
        return false;
    }
    
    return true;
}