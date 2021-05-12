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
			// { id: 0, name: 'Steak Dinner', calories: 1200 },
			// { id: 1, name: 'Cookie', calories: 400 },
			// { id: 2, name: 'Eggs', calories: 300 }
		],
		currentItem: null,
		totalCalories: 0
	}

	// Public methods
	return {
		getItems: function () {
			return state.items
		},
		addItem: function (name, calories) {
			let ID

			// Create ID
			if (state.items.length > 0) {
				ID = state.items[state.items.length - 1].id + 1
			} else {
				ID = 0
			}

			// Calories to number
			calories = parseInt(calories)

			// Create new item
			newItem = new Item(ID, name, calories)

			// Add to items array
			state.items.push(newItem)

			return newItem
		},
		logData: function () {
			return state
		}
	}
})()

// UI Controller
const UICtrl = (() => {
	const UISelectors = {
		itemList: '#item-list',
		addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories'
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
		getItemInput: function () {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		addListItem: function (item) {
			// Show the list
			document.querySelector(UISelectors.itemList).style.display = 'block'

			// Create li element
			const li = document.createElement('li')
			// Add class
			li.className = 'collection-item'
			// Add ID
			li.id = `item-${item.id}`
			// Add HTML
			li.innerHTML = /* html */ `
					<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
					<a href='#' class='secondary-content'>
						<i class='fa fa-pencil edit-item'></i>
					</a>
				`
			// Insert item
			document
				.querySelector(UISelectors.itemList)
				.insertAdjacentElement('beforeend', li)
		},
		clearInput: function () {
			document.querySelector(UISelectors.itemNameInput).value = ''
			document.querySelector(UISelectors.itemCaloriesInput).value = ''
		},
		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = 'none'
		},
		getSelectors: function () {
			return UISelectors
		}
	}
})()

// App Controller
const App = ((ItemCtrl, UICtrl) => {
	// Load event listeners
	const loadEventListeners = function () {
		// Get UI Selectors
		const UISelectors = UICtrl.getSelectors()

		// Add item event
		document
			.querySelector(UISelectors.addBtn)
			.addEventListener('click', itemAddSubmit)
	}

	// Add item submit
	const itemAddSubmit = function (e) {
		// Get form input from UI Controller
		const input = UICtrl.getItemInput()

		// Check for name and calories input
		if (input.name !== '' && input.calories !== '') {
			// Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories)

			// Add item to UI list
			UICtrl.addListItem(newItem)

			// Clear fields
			UICtrl.clearInput()
		}

		e.preventDefault()
	}

	// Public methods
	return {
		init: function () {
			// Fetch items from data structure
			const items = ItemCtrl.getItems()

			// Check if any items
			if (items.length === 0) {
				UICtrl.hideList()
			} else {
				// Populate list with items
				UICtrl.populateItemList(items)
			}

			// Load event listeners
			loadEventListeners()
		}
	}
})(ItemCtrl, UICtrl)

// Initialize App
App.init()
