<script setup lang="ts">
import { useProjectStore } from "../store/projectStore";
import ProjectTable from "../components/ProjectTable.vue";
import { ref, computed } from "vue";

const projectStore = useProjectStore();
const isLoading = ref(false);

const projects = computed(() => projectStore.projects);

const loadFromGitHub = async () => {
  isLoading.value = true;
  await projectStore.loadFromGitHub("facebook");
  isLoading.value = false;
};
</script>

<template>
  <div class="home">
    <h1>Проєкти</h1>
    <button @click="loadFromGitHub" :disabled="isLoading">
      {{ isLoading ? "Завантаження..." : "Завантажити з GitHub" }}
    </button>
    <ProjectTable v-if="projects.length" :projects="projects" />
  </div>
</template>
