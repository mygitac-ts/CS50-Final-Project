from flask import Flask, render_template, request
import json

app = Flask(__name__, template_folder='templates')

# Sample data for daily list (supermarket)
supermarket_products = [
    "Apples",
    "Beef",
    "Bread",
    "Cake",
    "Carrots",
    "Cheese",
    "Chicken",
	"Chocolate",
    "Cucumbers",
    "Cranberries",
    "Coffee",
	"Eggs",
	"Flour",
    "Gum",
	"Honey",
	"Ice cream",
	"Juice",
	"Lemons",
	"Margarine",
    "Milk",
	"Onions",
    "Oranges",
    "Pork",
	"Potatoes",
    "Rice",
    "Salt",
    "Strawberries",
    "Tea",
	"Tomatoes",
	"Watermelon"
]


@app.route('/')
def index():
    return render_template('index.html', supermarket_products=json.dumps(supermarket_products))

@app.route('/add_supermarket_product', methods=['POST'])
def add_supermarket_product():
    product = request.form['product']
    selected_supermarket_products.append(product)
    return 'Product added successfully'

@app.route('/add_custom_product', methods=['POST'])
def add_custom_product():
    item = request.form['item']
    selected_custom_products.append(item)
    return 'Item added successfully'

@app.route('/remove_selected_supermarket_products', methods=['POST'])
def remove_selected_supermarket_products():
    selected_indexes = request.form.getlist('selected_indexes[]')
    for index in sorted(selected_indexes, reverse=True):
        del selected_supermarket_products[int(index)]
    return 'Selected products removed successfully'

@app.route('/remove_selected_custom_products', methods=['POST'])
def remove_selected_custom_products():
    selected_indexes = request.form.getlist('selected_indexes[]')
    for index in sorted(selected_indexes, reverse=True):
        del selected_custom_products[int(index)]
    return 'Selected products removed successfully'

@app.route('/remove_all', methods=['POST'])
def remove_all():
    selected_supermarket_products.clear()
    selected_custom_products.clear()
    return 'All products removed successfully'

if __name__ == '__main__':
    app.run(debug=True)
