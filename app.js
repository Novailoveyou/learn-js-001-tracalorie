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
		logData: function () {
			return state
		},
	}
})()

// UI Controller
const UICtrl = (() => {
	// Public methods
	return {}
})()

// App Controller
const App = ((ItemCtrl, UICtrl) => {
	// Public methods
	return {
		init: function () {
			console.log('Initializing App...')
		},
	}
})(ItemCtrl, UICtrl)

// Initialize App
App.init()
