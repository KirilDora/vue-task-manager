<script setup lang="ts">
import { useTaskStore } from "../store/taskStore";
import { useRoute } from "vue-router";
import TaskTable from "../components/TaskTable.vue";
import { computed, onMounted, ref, watch } from "vue";
import ModalForm from "../components/ModalForm.vue";
import { fetchGitHubTasks } from "../utils/github";

const route = useRoute();
const username = route.params.username as string;
const repoName = route.params.repoName as string;

const taskStore = useTaskStore();
const openModal = ref(false);

onMounted(() => taskStore.loadTasks());

const tasks = computed(() => taskStore.getByProject(repoName));

const loadTasks = async () => {
  await taskStore.loadFromGitHub(username, repoName);
};

watch(
  () => [route.params.username, route.params.repoName],
  async () => {
    await loadTasks();
  }
);
</script>

<template>
  <div class="project-detail">
    <h1>Завдання для проєкту: {{ repoName }}</h1>

    <TaskTable :tasks="tasks" />
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
