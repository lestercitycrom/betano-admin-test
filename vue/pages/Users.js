
"use strict";

const Users = {
    mixins: [componentsMixin],
    data() {
        return {
            users: [],
            dataTableDef: {
                columnDefs: [
                    {
                        targets: 0,
                        title: "Пользователь",
                        data: null,
                        render: function (data, type, row) {
                            const avatarUrl = row.avatar || 'https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg';
                            return `
                                <div class="d-flex align-items-center">
                                    <img src="${avatarUrl}" class="rounded-circle avatar-xs me-2" alt="avatar">
                                    <div>
                                        <h6 class="mb-0">${row.name}</h6>
                                        <span class="text-muted">${row.username}</span>
                                    </div>
                                </div>`;
                        }
                    },
                    {
                        targets: 1,
                        title: "Email",
                        data: "email"
                    },
                    {
                        targets: 2,
                        title: "Роль",
                        data: "role",
                        render: function (data, type, row) {
                            const role = this.$store.getters['users/enum']('roles', data);
                            return `<span class="badge bg-${role.color_scheme}"><i class="${role.icon}"></i> ${role.name}</span>`;
                        }.bind(this)
                    },
                    {
                        targets: 3,
                        title: "Статус",
                        data: "status",
                        render: function (data, type, row) {
                            const status = this.$store.getters['users/enum']('status', data);
                            return `<span class="badge bg-${status.color_scheme}"><i class="${status.icon}"></i> ${status.name}</span>`;
                        }.bind(this)
                    },
                    {
                        targets: 4,
                        title: "Дата создания",
                        data: "created_at",
                        render: function (data, type, row) {
                            const date = new Date(data);
                            const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                            const formattedTime = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
                            return `${formattedDate} <small class="text-muted">${formattedTime}</small>`;
                        }
                    },
                    {
                        targets: 5,
                        title: "Действия",
                        data: null,
                        render: function (data, type, row) {
                            return `
                                <a href="#editModal" data-bs-toggle="modal" class="text-primary d-inline-block edit-item-btn" data-id="${row.id}"><i class="ri-pencil-fill fs-16"></i></a>
                                <a href="javascript:void(0);" class="text-danger d-inline-block remove-item-btn" data-id="${row.id}"><i class="ri-delete-bin-fill fs-16"></i></a>
                            `;
                        }
                    }
                ],
                destroy: true,
                responsive: true,
                drawCallback: function () {
                    const vm = this;
                    const editButtons = document.querySelectorAll('.edit-item-btn');
                    const deleteButtons = document.querySelectorAll('.remove-item-btn');

                    editButtons.forEach(button => {
                        button.addEventListener('click', function(event) {
                            const userId = +event.currentTarget.getAttribute('data-id');
                            vm.editUser(userId);
                        });
                    });

                    deleteButtons.forEach(button => {
                        button.addEventListener('click', function(event) {
                            const userId = +event.currentTarget.getAttribute('data-id');
                            vm.deleteUser(userId);
                        });
                    });
                }.bind(this)
            }
        };
    },
    computed: {
        usersData() {
            return this.$store.getters['users/data']();
        },
        totalUsers() {
            return this.users.length;
        },
        activeUsers() {
            return this.users.filter(user => user.status === 'active').length;
        },
        bannedUsers() {
            return this.users.filter(user => user.status === 'banned').length;
        }
    },
    methods: {
        async fetchUsers() {
            await this.$store.dispatch('users/get');
            this.users = this.usersData;
        },
        addUser() {
            // Логика для добавления пользователя
        },
        editUser(userId) {
            // Логика для редактирования пользователя
            alert(`Edit user with ID: ${userId}`);
        },
        deleteUser(userId) {
            this.$store.dispatch('users/delete', userId);
        }
    },
    mounted() {
        this.fetchUsers();
    },
    template: `
        <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Пользователи</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/">Главная</router-link></li>
                                    <li class="breadcrumb-item active">Список пользователей</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-4 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="avatar-sm me-3">
                                        <span class="avatar-title bg-soft-primary rounded-circle fs-2">
                                            <i class="mdi mdi-account-multiple-outline text-primary"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1">Общее количество пользователей</p>
                                        <h4 class="mb-0 text-primary">{{ totalUsers }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="avatar-sm me-3">
                                        <span class="avatar-title bg-soft-success rounded-circle fs-2">
                                            <i class="mdi mdi-account-check-outline text-success"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1">Активные пользователи</p>
                                        <h4 class="mb-0 text-success">{{ activeUsers }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="avatar-sm me-3">
                                        <span class="avatar-title bg-soft-danger rounded-circle fs-2">
                                            <i class="mdi mdi-account-cancel-outline text-danger"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1">Забаненные пользователи</p>
                                        <h4 class="mb-0 text-danger">{{ bannedUsers }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between">
                                <h4 class="card-title">Пользователи</h4>
                                <button class="btn btn-primary" @click="addUser"><i class="ri-add-circle-line align-bottom me-1"></i> Добавить пользователя</button>
                            </div>
                            <div class="card-body">
                                <data-table :value="users" :def="dataTableDef"></data-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};
