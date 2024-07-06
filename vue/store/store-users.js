
const store_users = {
    namespaced: true,
    state: {
        data: [],
        enums: {
            roles: [
                { value: 'admin', name: 'Администратор', icon: 'mdi mdi-shield-account', color_scheme: 'primary', default: true },
                { value: 'manager', name: 'Менеджер', icon: 'mdi mdi-account-tie', color_scheme: 'secondary', default: false },
                { value: 'operator', name: 'Оператор', icon: 'mdi mdi-headset', color_scheme: 'info', default: false }
            ],
            status: [
                { value: 'active', name: 'Активен', icon: 'mdi mdi-check-circle', color_scheme: 'success', default: true },
                { value: 'banned', name: 'Забанен', icon: 'mdi mdi-block-helper', color_scheme: 'danger', default: false },
                { value: 'deleted', name: 'Удален', icon: 'mdi mdi-delete', color_scheme: 'warning', default: false }
            ]
        }
    },
    getters: {
        data: state => id => {
            if (id) return state.data.find(user => +user.id === +id);
            else return state.data;
        },
        enum: state => (enumName, value) => {
            const enumList = state.enums[enumName];
            if (enumList) {
                const enumItem = enumList.find(item => item.value === value);
                if (enumItem) { return enumItem; } 
                else { console.error(`Значение "${value}" для enum "${enumName}" не найдено.`); return null; }
            } else { console.error(`Enum "${enumName}" не найден.`); return null; }
        }
    },
    mutations: {
        set(state, users) {
            state.data = users;
        },
        add(state, user) {
            state.data.push(user);
        },
        update(state, updatedUser) {
            const index = state.data.findIndex(user => +user.id === +updatedUser.id);
            if (index !== -1) {
                Vue.set(state.data, index, updatedUser);
            }
        },
        remove(state, userId) {
            const index = state.data.findIndex(user => +user.id === +userId);
            if (index !== -1) {
                Vue.delete(state.data, index);
            }
        }
    },
    actions: {
        async get({ commit, rootState }) {
            if (rootState.demo) {
                const demoUsers = [
                    { id: 1, name: 'Админ', username: 'admin', email: 'admin@example.com', role: 'admin', status: 'active', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg' },
                    { id: 2, name: 'Менеджер 1', username: 'manager1', email: 'manager1@example.com', role: 'manager', status: 'active', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg' },
                    { id: 3, name: 'Менеджер 2', username: 'manager2', email: 'manager2@example.com', role: 'manager', status: 'banned', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-3.jpg' },
                    { id: 4, name: 'Менеджер 3', username: 'manager3', email: 'manager3@example.com', role: 'manager', status: 'deleted', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-4.jpg' },
                    { id: 5, name: 'Оператор 1', username: 'operator1', email: 'operator1@example.com', role: 'operator', status: 'active', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-5.jpg' },
                    { id: 6, name: 'Оператор 2', username: 'operator2', email: 'operator2@example.com', role: 'operator', status: 'banned', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-6.jpg' },
                    { id: 7, name: 'Оператор 3', username: 'operator3', email: 'operator3@example.com', role: 'operator', status: 'deleted', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-7.jpg' },
                    { id: 8, name: 'Менеджер 4', username: 'manager4', email: 'manager4@example.com', role: 'manager', status: 'active', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-8.jpg' },
                    { id: 9, name: 'Оператор 4', username: 'operator4', email: 'operator4@example.com', role: 'operator', status: 'active', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-9.jpg' },
                    { id: 10, name: 'Оператор 5', username: 'operator5', email: 'operator5@example.com', role: 'operator', status: 'active', created_at: '2022-01-01T00:00:00Z', avatar: 'https://themesbrand.com/velzon/html/master/assets/images/users/avatar-10.jpg' }
                ];
                commit('set', demoUsers);
            } else {
                const response = await fetch('/api/users');
                const users = await response.json();
                commit('set', users);
            }
        },
        async post({ commit, rootState }, user) {
            if (rootState.demo) {
                commit('add', user);
            } else {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                const newUser = await response.json();
                commit('add', newUser);
            }
        },
        async patch({ commit, rootState }, user) {
            if (rootState.demo) {
                commit('update', user);
            } else {
                const response = await fetch(`/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                const updatedUser = await response.json();
                commit('update', updatedUser);
            }
        },
        async delete({ commit, rootState }, userId) {
            if (rootState.demo) {
                commit('remove', userId);
            } else {
                await fetch(`/api/users/${userId}`, {
                    method: 'DELETE'
                });
                commit('remove', userId);
            }
        }
    }
};
