// Storage Controller

// Item Controller
const ItemCtrl = (function () {
	// Item Constructor
	const Item = function (id, name, calories) {
		this.id = id
		this.name = name
		this.calories = calories
	}

	// Data Structure / State
	const state = {
		items: [
			{ id: 0, name: 'Steak Dinner', calories: 1200 },
			{ id: 1, name: 'Cookie', calories: 400 },
			{ id: 2, name: 'Eggs', calories: 300 },
		],
		currentItem: null,
		totalCalories: 0,
	}

	// Public methods
	return {
		getItems: function () {
			return state.items
		},
		logData: function () {
			return state
		},
	}
})()

// UI Controller
const UICtrl = (() => {
	const UISelectors = {
		itemList: '#item-list',
	}

	// Public methods
	return {
		populateItemList: function (items) {
			let html = ''

			items.forEach(item => {
				html += /* html */ `<li class='collection-item' id='item-${item.id}'>
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href='#' class='secondary-content'>
          <i class='fa fa-pencil edit-item'></i>
        </a>
      </li>`
			})

			// Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html
		},
	}
})()

// App Controller
const App = ((ItemCtrl, UICtrl) => {
	// Public methods
	return {
		init: function () {
			// Fetch items from data structure
			const items = ItemCtrl.getItems()

			// Populate list with items
			UICtrl.populateItemList(items)
		},
	}
})(ItemCtrl, UICtrl)

// Initialize App
App.init()
