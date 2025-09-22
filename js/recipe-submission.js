/**
 * Familia, Amigos Y Comida - Recipe Submission JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize recipe submission form
    initRecipeForm();
    
    // Check if user is logged in
    checkLoginStatus();
});

/**
 * Check if user is logged in and show/hide form accordingly
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const recipeFormContainer = document.getElementById('recipe-form-container');
    const loginRequiredMessage = document.getElementById('login-required');
    
    if (recipeFormContainer && loginRequiredMessage) {
        if (isLoggedIn) {
            recipeFormContainer.style.display = 'block';
            loginRequiredMessage.style.display = 'none';
        } else {
            recipeFormContainer.style.display = 'none';
            loginRequiredMessage.style.display = 'block';
        }
    }
}

/**
 * Initialize Recipe Submission Form
 */
function initRecipeForm() {
    const recipeForm = document.getElementById('recipe-submission-form');
    
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
        
        // Handle image preview
        const recipeImage = document.getElementById('recipe-image');
        if (recipeImage) {
            recipeImage.addEventListener('change', function(e) {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    const preview = document.createElement('img');
                    preview.className = 'image-preview';
                    preview.style.maxWidth = '300px';
                    preview.style.marginTop = '10px';
                    
                    // Remove any existing preview
                    const existingPreview = this.parentElement.querySelector('.image-preview');
                    if (existingPreview) {
                        existingPreview.remove();
                    }
                    
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        recipeImage.parentElement.appendChild(preview);
                    }
                    
                    reader.readAsDataURL(file);
                }
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
                introduction: formData.get('introduction'),
                prep_time: formData.get('prep_time'),
                cook_time: formData.get('cook_time'),
                servings: formData.get('servings'),
                ingredients: [],
                instructions: [],
                categories: formData.getAll('categories[]'),
                notes: formData.get('notes'),
                author: localStorage.getItem('username') || 'Anonymous',
                submission_date: new Date().toISOString(),
                status: 'pending'
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
            console.log('Recipe submission:', recipeData);
            
            // Show success message
            recipeForm.innerHTML = `
                <div class="submission-success">
                    <h3>Thank You for Your Submission!</h3>
                    <p>Your recipe has been submitted for review. Our admin team will review it shortly.</p>
                    <p>You will receive an email notification when your recipe is approved and published.</p>
                    <a href="index.html" class="form-button">Return to Homepage</a>
                </div>
            `;
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
    const intro = document.getElementById('recipe-intro').value.trim();
    const prepTime = document.getElementById('prep-time').value;
    const cookTime = document.getElementById('cook-time').value;
    const servings = document.getElementById('servings').value;
    
    // Check required fields
    if (!title || !intro || !prepTime || !cookTime || !servings) {
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
    
    // Check categories
    const categories = document.querySelectorAll('input[name="categories[]"]:checked');
    if (categories.length === 0) {
        alert('Please select at least one category.');
        return false;
    }
    
    return true;
}