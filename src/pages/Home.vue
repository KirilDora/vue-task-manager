<script setup lang="ts">
import { useProjectStore } from "../store/projectStore";
import ProjectTable from "../components/ProjectTable.vue";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const projectStore = useProjectStore();
const route = useRoute();
const username = route.params.username as string;

const isLoading = ref(false);

const projects = computed(() => projectStore.projects);

const loadFromGitHub = async () => {
  isLoading.value = true;
  await projectStore.loadFromGitHub(username);
  isLoading.value = false;
};

watch(
  () => route.params.username,
  async (newUsername) => {
    if (newUsername) {
      await loadFromGitHub();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="home">
    <h1>Проєкти для {{ username }}</h1>
    <button @click="loadFromGitHub" :disabled="isLoading">
      {{ isLoading ? "Завантаження..." : "Завантажити з GitHub" }}
    </button>
    <ProjectTable v-if="projects.length" :projects="projects" :username />
  </div>
</template>
