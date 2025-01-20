<template>
  <div id="app" class="d-block container py-4">
    <!-- Header -->
    <h1 class="text-center fs-1 mb-4">To-Do App</h1>

    <!-- Task Input and Search Bar -->
    <div class="mb-3">
      <!-- Add Task -->
      <input
        type="text"
        v-model="newTask"
        placeholder="Add a new task"
        class="bg-light fs-6 p-1 me-2"
        @keyup.enter="addTask"
      />
      <!-- Search Bar -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tasks"
        class="bg-light fs-6 p-1"
      />
    </div>

    <!-- Add Task Button -->
    <button class="btn btn-success fs-6 mb-3" @click="addTask">Add Task</button>

    <!-- Task List -->
    <ul class="list-unstyled mb-5">
      <li
        v-for="(task, index) in filteredTasks"
        :key="index"
        :class="{ completed: task.completed }"
        class="fs-4 d-flex justify-content-between align-items-center"
      >
        <span class="text-truncate" @click="toggleTask(index)">
          <span v-if="!task.isEditing">{{ task.text }}</span>
          <input
            v-else
            type="text"
            v-model="task.text"
            class="bg-light p-1"
            @blur="saveTask(index)"
            @keyup.enter="saveTask(index)"
          />
        </span>
        <div>
          <button class="btn btn-primary fs-6 me-3" @click="confirmEdit(index)">
            Edit
          </button>
          <button class="btn btn-danger fs-6" @click="confirmDelete(index)">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Edit Confirmation Modal -->
    <div v-if="showEditModal" class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Task</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body" style="color: black;">
            Are you sure you want to edit this task?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmEditAction"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Task</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body" style="color: black;">
            Are you sure you want to delete this task?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDeleteAction"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      searchQuery: "",
      tasks: [],
      taskToEdit: null,
      taskToDelete: null,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) =>
        task.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push({ text: this.newTask, completed: false, isEditing: false });
        this.newTask = "";
      }
    },
    toggleTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    confirmDelete(index) {
      this.taskToDelete = index;
      this.showDeleteModal = true;
    },
    confirmDeleteAction() {
      if (this.taskToDelete !== null) {
        this.tasks.splice(this.taskToDelete, 1);
      }
      this.showDeleteModal = false;
      this.taskToDelete = null;
    },
    closeModal() {
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.taskToEdit = null;
      this.taskToDelete = null;
    },
    confirmEdit(index) {
      this.taskToEdit = index;
      this.showEditModal = true;
    },
    confirmEditAction() {
      if (this.taskToEdit !== null) {
        this.tasks[this.taskToEdit].isEditing = true;
      }
      this.showEditModal = false;
      this.taskToEdit = null;
    },
    saveTask(index) {
      if (this.tasks[index].text.trim() === "") {
        this.deleteTask(index);
      } else {
        this.tasks[index].isEditing = false;
      }
    },
  },
};
</script>

<style scoped>
/* Prevent overlapping */
.text-truncate {
  max-width: calc(100% - 160px); /* Adjust based on button sizes */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Modal styles */
.modal-content {
  background-color: white;
  border-radius: 10px;
}

.modal-footer .btn-success {
  background-color: green;
  border-color: green;
}

.modal-footer .btn-danger {
  background-color: red;
  border-color: red;
}
</style>
