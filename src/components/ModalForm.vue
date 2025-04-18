<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "../store/taskStore";
import type { Task } from "../models/Task";
import { useProjectStore } from "../store/projectStore";

const props = defineProps<{
  type: "project" | "task";
  repoName?: string;
}>();

const emit = defineEmits(["close"]);

const projectStore = useProjectStore();
const taskStore = useTaskStore();

const title = ref("");
const description = ref("");
const assignee = ref("");
const deadline = ref("");
const status = ref("todo");

const submit = () => {
  if (!title.value) return;

  if (props.type === "project") {
    projectStore.addProject({
      id: Number(Date.now()),
      name: title.value,
      taskCount: 0,
      status: "active",
      createdAt: new Date().toISOString(),
      description: description.value,
    });
  } else if (props.type === "task") {
    taskStore.addTask({
      id: Date.now(),
      title: title.value,
      assignee: assignee.value || "Unassigned",
      deadline: deadline.value || new Date().toISOString(),
      status: status.value as Task["status"],
      projectId: props.repoName,
    });
  }
  emit("close");
};
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <h3>
        {{ props.type === "project" ? "Новий проєкт" : "Додати нове завдання" }}
      </h3>

      <form @submit.prevent="submit">
        <label>Назва:</label>
        <input v-model="title" required />

        <template v-if="props.type === 'project'">
          <label>Опис:</label>
          <textarea v-model="description" />
        </template>

        <template v-else>
          <label>Виконавець:</label>
          <input v-model="assignee" />

          <label>Статус:</label>
          <select v-model="status">
            <option value="todo">До виконання</option>
            <option value="in_progress">В процесі</option>
            <option value="done">Завершено</option>
          </select>

          <label>Термін:</label>
          <input type="date" v-model="deadline" />
        </template>

        <div class="actions">
          <button type="submit">Додати</button>
          <button type="button" @click="emit('close')">Скасувати</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
  max-width: 95%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
