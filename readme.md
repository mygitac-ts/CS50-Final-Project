# CS50 Final Project - My List

#### Video Demo:  <https://www.youtube.com/watch?v=VgJaB6ZngKY>

#### Description:
"My List" is a simple web application designed to help users create and manage their daily to-do lists for shopping or other notes that should not forget.

## Table of Contents

- [Technologies used](#technologies-used)
- [Files and Functionality](#files-and-functionality)
- [Styles](#styles)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

### Technologies used
- HTML
- JavaScript
- Python
- CSS

## Files and Functionality

### `index.html`
The HTML file structures the layout of the application. It includes two columns: one to select daily products from a pre-defined list of foods and drinks and a second to insert custom notes. The file contains placeholders for selected products, checkboxes, and buttons that trigger various actions.

### `scripts.js`
The JavaScript file controls the dynamic behavior of the application. It handles functions for adding daily products, managing custom items, removing selected products, and checking selections through checkboxes.

### `app.py`
The Flask backend powers the application's server-side functionality. It manages routes for rendering templates, adding and removing daily products and custom items, and clearing all items. The file includes sample data for daily products and integrates the frontend actions with server-side logic.

### `styles.css`
The CSS file contains the styling information for the application to define its visual appearance and layout.

## Features

- **Daily List Management:** Select items from a pre-defined list.
- **Custom Notes:** Add personalized notes to the custo list.
- **Easy Removal:** Remove selected item that are completed.
- **Reset lists:** Remove everything and reset both lists with a button.

## How to launch application

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/mygitac-ts/CS50-Final-Project.git`
2. Navigate to the project directory: `cd CS50-Final-Project.git`
3. Open workspace
4. Run 'flask.run'
5. Open the application in your web browser: `http://127.0.0.1:5000/`
