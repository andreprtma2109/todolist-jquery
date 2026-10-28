$(document).ready(function () {

    let todos = [];
    let currentFilter = 'all';

    // ===== RENDER LIST =====
    function renderList() {
        const $list = $('#todoList');
        $list.empty();

        const filtered = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.done;
            if (currentFilter === 'done') return todo.done;
            return true;
        });

        if (filtered.length === 0) {
            $list.append(`
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <p>Belum ada tugas di sini</p>
                </div>
            `);
        } else {
            filtered.forEach(todo => {
                const $item = $(`
                    <li class="todo-item ${todo.done ? 'done' : ''}" data-id="${todo.id}">
                        <input type="checkbox" ${todo.done ? 'checked' : ''} />
                        <span class="todo-text">${todo.text}</span>
                        <button class="delete-btn" title="Hapus">🗑️</button>
                    </li>
                `);
                $list.append($item);
            });
        }

        updateCount();
    }

    // ===== UPDATE COUNT =====
    function updateCount() {
        const remaining = todos.filter(t => !t.done).length;
        $('#itemCount').text(`${remaining} tugas tersisa`);
    }

    // ===== TAMBAH TUGAS =====
    function addTodo() {
        const text = $('#todoInput').val().trim();
        if (!text) {
            $('#todoInput').focus().css('border-color', '#e74c3c');
            setTimeout(() => $('#todoInput').css('border-color', ''), 1000);
            return;
        }

        todos.push({
            id: Date.now(),
            text: text,
            done: false
        });

        $('#todoInput').val('');
        renderList();
    }

    // ===== EVENT: TAMBAH =====
    $('#addBtn').on('click', function () {
        addTodo();
    });

    // ===== EVENT: ENTER =====
    $('#todoInput').on('keypress', function (e) {
        if (e.key === 'Enter') addTodo();
    });

    // ===== EVENT: CHECKBOX =====
    $('#todoList').on('change', 'input[type="checkbox"]', function () {
        const id = $(this).closest('.todo-item').data('id');
        const todo = todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
        renderList();
    });

    // ===== EVENT: HAPUS =====
    $('#todoList').on('click', '.delete-btn', function () {
        const id = $(this).closest('.todo-item').data('id');
        todos = todos.filter(t => t.id !== id);
        renderList();
    });

    // ===== EVENT: FILTER =====
    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        renderList();
    });

    // ===== EVENT: HAPUS SELESAI =====
    $('#clearDone').on('click', function () {
        todos = todos.filter(t => !t.done);
        renderList();
    });

    // ===== INIT =====
    renderList();
});
