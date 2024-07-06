
const store_customers = {
	namespaced: true,
	state: {
		data: [],
		enums: {
			status: [
				{
					value: "active",
					name: "Активный",
					icon: "mdi mdi-check-circle",
					color_scheme: "success",
					default: true
				},
				{
					value: "blocked",
					name: "Заблокирован",
					icon: "mdi mdi-block-helper",
					color_scheme: "danger",
					default: false
				}
			],
			gender: [
				{ value: "male", name: "Мужчина", icon: "mdi mdi-gender-male", color_scheme: "primary" },
				{ value: "female", name: "Женщина", icon: "mdi mdi-gender-female", color_scheme: "danger" },
				{ value: "other", name: "Другой", icon: "mdi mdi-gender-transgender", color_scheme: "secondary" }
			]
		}
	},
	getters: {
		data: state => id => {
			if (id) return state.data.find(customer => customer.id === id);
			else return state.data;
		},
		enum: state => (enumName, value) => {
			const enumList = state.enums[enumName];
			if (enumList) {
				const enumItem = enumList.find(item => item.value === value);
				if (enumItem) {
					return enumItem;
				} else {
					console.error(`Значение "${value}" для enum "${enumName}" не найдено.`);
					return null;
				}
			} else {
				console.error(`Enum "${enumName}" не найден.`);
				return null;
			}
		}
	},
	mutations: {
		set(state, customers) {
			state.data = customers;
		},
		add(state, customer) {
			state.data.push(customer);
		},
		update(state, updatedCustomer) {
			const index = state.data.findIndex(customer => customer.id === updatedCustomer.id);
			if (index !== -1) {
				state.data.splice(index, 1, updatedCustomer);
			}
		},
		remove(state, id) {
			state.data = state.data.filter(customer => customer.id !== id);
		}
	},
	actions: {
		async get({ commit, rootState }) {
			if (rootState.demo) {
				const testData = [
					{
						id: 1,
						tlg_user_id: 1001,
						tlg_first_name: "John",
						tlg_last_name: "Doe",
						tlg_username: "johndoe",
						tlg_language_code: "en",
						phone: "1234567890",
						email: "john.doe@example.com",
						tlg_chat_id: 2001,
						registration_date: "2023-06-01 12:00:00",
						last_activity: "2023-06-15 12:00:00",
						delivery_address: "123 Main St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Credit Card",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 30,
						gender: "male",
						social_media_links: "https://facebook.com/johndoe",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
					},
					{
						id: 2,
						tlg_user_id: 1002,
						tlg_first_name: "Jane",
						tlg_last_name: "Smith",
						tlg_username: "janesmith",
						tlg_language_code: "en",
						phone: "2345678901",
						email: "jane.smith@example.com",
						tlg_chat_id: 2002,
						registration_date: "2023-06-02 12:00:00",
						last_activity: "2023-06-16 12:00:00",
						delivery_address: "456 Elm St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "PayPal",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 28,
						gender: "female",
						social_media_links: "https://instagram.com/janesmith",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg"
					},
					{
						id: 3,
						tlg_user_id: 1003,
						tlg_first_name: "Alice",
						tlg_last_name: "Johnson",
						tlg_username: "alicej",
						tlg_language_code: "en",
						phone: "3456789012",
						email: "alice.johnson@example.com",
						tlg_chat_id: 2003,
						registration_date: "2023-06-03 12:00:00",
						last_activity: "2023-06-17 12:00:00",
						delivery_address: "789 Oak St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Bank Transfer",
						preferred_delivery_method: "Self-pickup",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 35,
						gender: "female",
						social_media_links: "https://linkedin.com/in/alicej",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-3.jpg"
					},
					{
						id: 4,
						tlg_user_id: 1004,
						tlg_first_name: "Bob",
						tlg_last_name: "Brown",
						tlg_username: "bobb",
						tlg_language_code: "en",
						phone: "4567890123",
						email: "bob.brown@example.com",
						tlg_chat_id: 2004,
						registration_date: "2023-06-04 12:00:00",
						last_activity: "2023-06-18 12:00:00",
						delivery_address: "101 Pine St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Credit Card",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 40,
						gender: "male",
						social_media_links: "https://twitter.com/bobb",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-4.jpg"
					},
					{
						id: 5,
						tlg_user_id: 1005,
						tlg_first_name: "Charlie",
						tlg_last_name: "Davis",
						tlg_username: "charlied",
						tlg_language_code: "en",
						phone: "5678901234",
						email: "charlie.davis@example.com",
						tlg_chat_id: 2005,
						registration_date: "2023-06-05 12:00:00",
						last_activity: "2023-06-19 12:00:00",
						delivery_address: "102 Maple St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "PayPal",
						preferred_delivery_method: "Self-pickup",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 32,
						gender: "male",
						social_media_links: "https://facebook.com/charlied",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-5.jpg"
					},
					{
						id: 6,
						tlg_user_id: 1006,
						tlg_first_name: "David",
						tlg_last_name: "Wilson",
						tlg_username: "davidw",
						tlg_language_code: "en",
						phone: "6789012345",
						email: "david.wilson@example.com",
						tlg_chat_id: 2006,
						registration_date: "2023-06-06 12:00:00",
						last_activity: "2023-06-20 12:00:00",
						delivery_address: "103 Birch St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Bank Transfer",
					

	preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 29,
						gender: "male",
						social_media_links: "https://instagram.com/davidw",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-6.jpg"
					},
					{
						id: 7,
						tlg_user_id: 1007,
						tlg_first_name: "Eve",
						tlg_last_name: "Miller",
						tlg_username: "evem",
						tlg_language_code: "en",
						phone: "7890123456",
						email: "eve.miller@example.com",
						tlg_chat_id: 2007,
						registration_date: "2023-06-07 12:00:00",
						last_activity: "2023-06-21 12:00:00",
						delivery_address: "104 Cedar St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Credit Card",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 25,
						gender: "female",
						social_media_links: "https://linkedin.com/in/evem",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-7.jpg"
					},
					{
						id: 8,
						tlg_user_id: 1008,
						tlg_first_name: "Frank",
						tlg_last_name: "Taylor",
						tlg_username: "frankt",
						tlg_language_code: "en",
						phone: "8901234567",
						email: "frank.taylor@example.com",
						tlg_chat_id: 2008,
						registration_date: "2023-06-08 12:00:00",
						last_activity: "2023-06-22 12:00:00",
						delivery_address: "105 Spruce St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "PayPal",
						preferred_delivery_method: "Self-pickup",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 37,
						gender: "male",
						social_media_links: "https://twitter.com/frankt",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-8.jpg"
					},
					{
						id: 9,
						tlg_user_id: 1009,
						tlg_first_name: "Grace",
						tlg_last_name: "Anderson",
						tlg_username: "gracea",
						tlg_language_code: "en",
						phone: "9012345678",
						email: "grace.anderson@example.com",
						tlg_chat_id: 2009,
						registration_date: "2023-06-09 12:00:00",
						last_activity: "2023-06-23 12:00:00",
						delivery_address: "106 Willow St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Bank Transfer",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 26,
						gender: "female",
						social_media_links: "https://facebook.com/gracea",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-9.jpg"
					},
					{
						id: 10,
						tlg_user_id: 1010,
						tlg_first_name: "Hank",
						tlg_last_name: "Thomas",
						tlg_username: "hankt",
						tlg_language_code: "en",
						phone: "9123456789",
						email: "hank.thomas@example.com",
						tlg_chat_id: 2010,
						registration_date: "2023-06-10 12:00:00",
						last_activity: "2023-06-24 12:00:00",
						delivery_address: "107 Ash St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Credit Card",
						preferred_delivery_method: "Self-pickup",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 33,
						gender: "male",
						social_media_links: "https://instagram.com/hankt",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-10.jpg"
					},
					{
						id: 11,
						tlg_user_id: 1011,
						tlg_first_name: "Ivy",
						tlg_last_name: "Jackson",
						tlg_username: "ivyj",
						tlg_language_code: "en",
						phone: "9234567890",
						email: "ivy.jackson@example.com",
						tlg_chat_id: 2011,
						registration_date: "2023-06-11 12:00:00",
						last_activity: "2023-06-25 12:00:00",
						delivery_address: "108 Fir St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "PayPal",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 24,
						gender: "female",
						social_media_links: "https://linkedin.com/in/ivyj",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg"
					},
					{
						id: 12,
						tlg_user_id: 1012,
						tlg_first_name: "Jack",
						tlg_last_name: "White",
						tlg_username: "jackw",
						tlg_language_code: "en",
						phone: "9345678901",
						email: "jack.white@example.com",
						tlg_chat_id: 2012,
						registration_date: "2023-06-12 12:00:00",
						last_activity: "2023-06-26 12:00:00",
						delivery_address: "109 Alder St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Bank Transfer",
						preferred_delivery_method: "Self-pickup",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 31,
						gender: "male",
						social_media_links: "https://twitter.com/jackw",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg"
					},
					{
						id: 13,
						tlg_user_id: 1013,
						tlg_first_name: "Kathy",
						tlg_last_name: "Harris",
						tlg_username: "kathyh",
						tlg_language_code: "en",
						phone: "9456789012",
						email: "kathy.harris@example.com",
						tlg_chat_id: 2013,
						registration_date: "2023-06-13 12:00:00",
						last_activity: "2023-06-27 12:00:00",
						delivery_address: "110 Sycamore St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Credit Card",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 27,
						gender: "female",
						social_media_links: "https://facebook.com/kathyh",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg"
					},
					{
						id: 14,
						tlg_user_id: 1014,
						tlg_first_name: "Liam",
						tlg_last_name: "Martin",
						tlg_username: "liamm",
						tlg_language_code: "en",
						phone: "9567890123",
						email: "liam.martin@example.com",
						tlg_chat_id: 2014,
						registration_date: "2023-06-14 12:00:00",
						last_activity: "2023-06-28 12:00:00",
						delivery_address: "111 Redwood St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "PayPal",
						preferred_delivery_method: "Self-pickup",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 34,
						gender: "male",
						social_media_links: "https://instagram.com/liamm",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg"
					},
					{
						id: 15,
						tlg_user_id: 1015,
						tlg_first_name: "Mia",
						tlg_last_name: "Lee",
						tlg_username: "mial",
						tlg_language_code: "en",
						phone: "9678901234",
						email: "mia.lee@example.com",
						tlg_chat_id: 2015,
						registration_date: "2023-06-15 12:00:00",
						last_activity: "2023-06-29 12:00:00",
						delivery_address: "112 Walnut St, City",
						purchase_history: "[]",
						payment_history: "[]",
						status: "active",
						notes: "",
						preferred_payment_method: "Bank Transfer",
						preferred_delivery_method: "Courier",
						discounts_bonuses: "[]",
						geolocation: "City, Country",
						age: 22,
						gender: "female",
						social_media_links: "https://linkedin.com/in/mial",
						avatar_url: "https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg"
					}
				];
				commit("set", testData);
			} else {
				try {
					const response = await fetch("http://a1.local/api/customers");
					const customers = await response.json();
					commit("set", customers);
				} catch (error) {
					console.error("Ошибка при получении данных:", error);
				}
			}
		},
		async post({ commit, rootState }, customer) {
			if (rootState.demo) {
				commit("add", customer);
			} else {
				try {
					const response = await fetch("http://a1.local/api/customers", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(customer)
					});
					const newCustomer = await response.json();
					commit("add", newCustomer);
				} catch (error) {
					console.error("Ошибка при добавлении данных:", error);
				}
			}
		},
		async patch({ commit, rootState }, customer) {
			if (rootState.demo) {
				commit("update", customer);
			} else {
				try {
					const response = await fetch(`http://a1.local/api/customers/${customer.id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(customer)
					});
					const updatedCustomer = await response.json();
					commit("update", updatedCustomer);
				} catch (error) {
					console.error("Ошибка при обновлении данных:", error);
				}
			}
		},
		async delete({ commit, rootState }, id) {
			if (rootState.demo) {
				commit("remove", id);
			} else {
				try {
					await fetch(`http://a1.local/api/customers/${id}`, {
						method: "DELETE"
					});
					commit("remove", id);
				} catch (error) {
					console.error("Ошибка при удалении данных:", error);
				}
			}
		}
	}
};
