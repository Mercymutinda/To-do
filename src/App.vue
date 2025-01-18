<template>
  <div id="app">
    <h1 class="text-center fs-1 mb-3">To-Do App</h1>
    <div class="mb-3 d-flex " >
      <!-- Add Task -->
      <input
        class="bg-light fs-5"
        type="text"
        v-model="newTask"
        placeholder="Add a new task"
        @keyup.enter="addTask"
      />
      <!-- Search Bar -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tasks"
        class="bg-light fs-5"
      />
    </div>

    <!-- Add Task Button -->
    <button class="btn btn-success fs-5 mb-3" @click="addTask">
      Add Task
    </button>

    <!-- Task List -->
    <ul class="list-unstyled mb-5">
      <li
        v-for="(task, index) in filteredTasks"
        :key="index"
        :class="{ completed: task.completed }"
        class="fs-4 position-relative"
      >
        <div v-if="!task.isEditing">
          <span @click="toggleTask(index)">{{ task.text }}</span>
          <div class="position-absolute top-0 end-0 m-3 ">
            <button class="btn btn-primary fs-6 " @click="editTask(index)">Edit</button>
            <button class="btn btn-danger ms-2 fs-6 " @click="deleteTask(index)">Delete</button>
          </div>
        </div>
        <div v-else>
          <input
            type="text"
            v-model="task.text"
            @keyup.enter="saveTask(index)"
            class="mb-2"
          />
          <button class="btn btn-success fs-6" @click="saveTask(index)">Save</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      searchQuery: "",
      tasks: []
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task =>
        task.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
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
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index) {
      this.tasks[index].isEditing = true;
    },
    saveTask(index) {
      if (this.tasks[index].text.trim() === "") {
        this.deleteTask(index);
      } else {
        this.tasks[index].isEditing = false;
      }
    }
  }
};
</script>

<style scoped>


input[type="text"] {
  width: 300px;
}
</style>
