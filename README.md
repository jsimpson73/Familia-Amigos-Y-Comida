# Familia, Amigos Y Comida - Cookbook Website

A comprehensive cookbook website with recipe management, user authentication, and admin features.

## Features

### User Features
- Browse recipes by category
- Search for recipes
- View detailed recipe pages with ingredients, instructions, and images
- Register and login to access additional features
- Submit recipes for admin approval
- Subscribe to newsletter for updates on new recipes

### Admin Features
- Password-protected admin area
- Dashboard with site statistics
- Manage recipes (add, edit, delete)
- Review and approve user-submitted recipes
- Manage users and categories
- Send newsletter updates

## Technical Details

### Frontend
- HTML5, CSS3, and JavaScript
- Responsive design for mobile and desktop
- Clean, warm, and homey design aesthetic

### Authentication
- User registration and login system
- Password-protected admin area
- Form validation and security measures

### Recipe Management
- Multi-category tagging system
- Image upload capability
- Detailed recipe information (prep time, cook time, servings, etc.)
- Recipe submission and approval workflow

## Admin Access

To access the admin area, navigate to `/admin` and use the following credentials:
- Username: admin
- Password: admin123

## Project Structure

```
/
├── index.html              # Homepage
├── recipes.html            # All recipes page
├── categories.html         # Categories page
├── recipe-detail.html      # Recipe detail page
├── submit-recipe.html      # Recipe submission form
├── login.html              # User login page
├── register.html           # User registration page
├── about.html              # About page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Main JavaScript file
│   ├── auth.js             # Authentication functions
│   ├── recipe-submission.js # Recipe submission functions
│   └── admin.js            # Admin panel functions
├── admin/
│   ├── index.html          # Admin dashboard
│   ├── add-recipe.html     # Add recipe page
│   └── .htaccess           # Password protection
├── images/                 # Image directory
└── uploads/                # User uploaded images
    └── recipes/            # Recipe images
```

## Author
John Simpson

## License
All rights reserved. This project is for demonstration purposes only.