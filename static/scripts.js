// Function to ADD supermarket products to the list (LEFT)
function addSupermarketProduct() {
    const selectedProduct = document.getElementById('supermarket-products').value;
    fetch('/add_supermarket_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `product=${selectedProduct}`,
    })
    .then(response => {
        if (response.ok) {
            location.reload(); // Reload the page to update the list
        }
    });
}


// Event listener for checkbox changes (LEFT)
document.addEventListener('change', function(event) {
    if (event.target.classList.contains('supermarket-checkbox')) {
        checkSelection();
    }
});

// Event listener for clicks on the text associated with the checkbox
document.querySelector('.selected-products').addEventListener('click', function(event) {
    if (event.target.tagName === 'LABEL') {
        const checkbox = event.target.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        checkSelection();
    }
});



// Function to Add items to the custom list (RIGHT)
function addCustomItems() {
    const newProduct = document.getElementById('new-item-text').value.trim();

    if (newProduct !== '') {
        const existingItem = Array.from(document.querySelectorAll('.custom-item li')).find(item => {
            return item.textContent.startsWith(newProduct);
        });

        if (existingItem) {
            const label = existingItem.querySelector('label');
            const count = parseInt(label.dataset.count || 1) + 1;
            label.textContent = count > 1 ? `${newProduct} (${count})` : newProduct;
            label.dataset.count = count;
        } else {
            const newItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'custom-checkbox';
            checkbox.value = newProduct;

            const label = document.createElement('label');
            label.textContent = newProduct;

            newItem.appendChild(checkbox);
            newItem.appendChild(label);
            document.querySelector('.custom-item').appendChild(newItem);

            // Add event listener to the newly created checkbox
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    label.style.textDecoration = 'line-through'; // Apply strikethrough
                    checkCustomSelection();
                } else {
                    label.style.textDecoration = 'none'; // Remove strikethrough
                    checkCustomSelection();
                }
            });
        }

        document.getElementById('new-item-text').value = '';
        checkCustomSelection();
    }
}



// Function to check if custom checkboxes are selected (RIGHT)
function checkCustomSelection() {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const removeBtn = document.getElementById('remove-selected-right');

    let anyChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            anyChecked = true;
        }
    });

    if (anyChecked) {
        removeBtn.classList.remove('inactive');
    } else {
        removeBtn.classList.add('inactive');
    }
}


// Event listener for add button in the RIGHT column
document.getElementById('add-item').addEventListener('click', function() {
    addCustomItems();
});


// Event listener for checkbox changes in custom products (RIGHT)
document.addEventListener('change', function(event) {
    if (event.target.classList.contains('custom-checkbox') || event.target.id === 'new-item-text') {
        updateRemoveButtonState();
    }
});

// Event listener for clicks on the text associated with the checkbox
document.querySelector('.custom-item').addEventListener('click', function(event) {
    if (event.target.tagName === 'LABEL') {
        const checkbox = event.target.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        updateRemoveButtonState();
    }
});

// Event listener for remove button in the RIGHT column
document.getElementById('remove-selected-right').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.custom-checkbox:checked');
    checkboxes.forEach(checkbox => {
        checkbox.closest('li').remove();
    });

    checkCustomSelection();
});


// Function to handle adding an item on 'Enter' key press (RIGHT)
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        addCustomItems();
        event.preventDefault(); // Prevent default form submission behavior
    }
}

// Event listener for 'Enter' key press in the input field (RIGHT)
document.getElementById('new-item-text').addEventListener('keypress', handleEnterKey);



// Function to remove selected supermarket products (LEFT)
function removeSelectedSupermarketProducts() {
    const checkboxes = document.querySelectorAll('.supermarket-checkbox:checked');
    const selectedIndexes = Array.from(checkboxes).map(checkbox => checkbox.value);

    fetch('/remove_selected_supermarket_products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_indexes: selectedIndexes }),
    })
    .then(response => {
        if (response.ok) {
            location.reload(); // Reload the page to update the list
        }
    });
}

// Function to remove selected custom products (RIGHT)
function removeSelectedCustomProducts() {
    const checkboxes = document.querySelectorAll('.custom-checkbox:checked');
    const selectedIndexes = Array.from(checkboxes).map(checkbox => checkbox.value);

    fetch('/remove_selected_custom_products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_indexes: selectedIndexes }),
    })
    .then(response => {
        if (response.ok) {
            location.reload();
        }
    });
}


// Function to populate the supermarket products dropdown (LEFT)
function populateSupermarketDropdown() {
    const supermarketDropdown = document.getElementById('supermarket-products');

    // Clear existing options before adding new ones
    supermarketDropdown.innerHTML = '';

    supermarketProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product;
        option.text = product;
        supermarketDropdown.appendChild(option);
    });
}


// Function to add selected supermarket products to the list (LEFT)
function addSelectedProduct() {
    const selectedProduct = document.getElementById('supermarket-products').value;

    const existingItem = Array.from(document.querySelectorAll('.selected-products li')).find(item => {
        return item.textContent.startsWith(selectedProduct);
    });

    if (existingItem) {
        const label = existingItem.querySelector('label');
        const count = parseInt(label.dataset.count || 1) + 1;
        label.textContent = count > 1 ? `${selectedProduct} (${count})` : selectedProduct;
        label.dataset.count = count;
    } else {
        const newItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'supermarket-checkbox';
        checkbox.value = selectedProduct;

        const label = document.createElement('label');
        label.textContent = selectedProduct;

        newItem.appendChild(checkbox);
        newItem.appendChild(label);
        document.querySelector('.selected-products').appendChild(newItem);

        // Add event listener to the newly created checkbox
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                label.style.textDecoration = 'line-through'; // Apply strikethrough
                checkSelection();
            } else {
                label.style.textDecoration = 'none'; // Remove strikethrough
                checkSelection();
            }
        });
    }

    document.getElementById('supermarket-products').selectedIndex = -1;
}

// Function to check if checkboxes are selected in the LEFT column
function checkSelection() {
    const checkboxes = document.querySelectorAll('.supermarket-checkbox');
    const removeBtn = document.getElementById('remove-selected-left');

    let anyChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            anyChecked = true;
        }
    });

    if (anyChecked) {
        removeBtn.classList.remove('inactive');
    } else {
        removeBtn.classList.add('inactive');
    }
}

// Event listener for checkbox changes (LEFT)
document.addEventListener('change', function(event) {
    if (event.target.classList.contains('supermarket-checkbox')) {
        checkSelection();
    }
});

// Event listener for remove button (LEFT)
document.getElementById('remove-selected-left').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.supermarket-checkbox:checked');
    checkboxes.forEach(checkbox => {
        checkbox.closest('li').remove(); // Remove the entire list item
    });
});



// Call the function to populate the dropdown when the page loads (LEFT)
document.addEventListener('DOMContentLoaded', function() {
    populateSupermarketDropdown();
    document.getElementById('supermarket-products').selectedIndex = -1; // Set the selected index to -1
});


// Event listener for dropdown change (LEFT)
document.getElementById('supermarket-products').addEventListener('change', function() {
    addSelectedProduct();
});



// Function to Remove ALL selected items
function removeAllSelectedItems() {
    const insertedList = document.querySelector('.custom-item');
    const selectedList = document.querySelector('.selected-products');

    // Check if there are items in the lists
    const hasItems = insertedList.children.length > 0 || selectedList.children.length > 0;

    // If there are items in the lists display confirmation message
    if (hasItems) {
        const confirmed = confirm("Remove all items and reset the list?");

        // If user confirms remove all items
        if (confirmed) {
            // Remove all items from the inserted products list
            insertedList.innerHTML = '';

            // Remove all items from the selected products list
            selectedList.innerHTML = '';
        }
    } else {
        // If there are no items, maintain previous functionality
        const checkboxes = document.querySelectorAll('.inserted-checkbox:checked');
        checkboxes.forEach(checkbox => {
            checkbox.closest('li').remove();
        });
    }
}


// Event listener for the 'Remove ALL' button
document.getElementById('remove-all').addEventListener('click', function() {
    removeAllSelectedItems();
});

