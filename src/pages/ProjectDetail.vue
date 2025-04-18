<script setup lang="ts">
import { useTaskStore } from "../store/taskStore";
import { useRoute } from "vue-router";
import TaskTable from "../components/TaskTable.vue";
import { computed, onMounted, ref } from "vue";
import ModalForm from "../components/ModalForm.vue";
import { fetchGitHubTasks } from "../utils/github";

const route = useRoute();
const repoName = route.params.name as string;

const taskStore = useTaskStore();
const openModal = ref(false);

onMounted(async () => {
  const data = await fetchGitHubTasks(repoName);
  taskStore.updateTasks(data);
});

const tasks = computed(() => taskStore.getByProject(repoName));
</script>

<template>
  <div class="project-detail">
    <h1>Завдання для проєкту: {{ repoName }}</h1>

    <TaskTable :tasks />
    <button @click="openModal = true">Додати Завдання</button>

    <ModalForm
      v-if="openModal"
      @close="openModal = false"
      :repoName
      type="task"
    />
  </div>
</template>

<style scoped lang="scss">
.project-detail {
  padding: 1rem;
}
</style>
