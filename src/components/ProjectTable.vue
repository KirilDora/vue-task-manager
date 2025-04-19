<script setup lang="ts">
import { useProjectStore } from "../store/projectStore";
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import Resizable from "vue-resizable";
import ModalForm from "./ModalForm.vue";
import { type Project } from "../models/Project";
import { filterAndSortProjects } from "../utils/projectUtils";
import { PROJECT_STATUSES } from "../constants/projectStatuses";

const props = defineProps<{
  projects: Project[];
  username: string;
}>();

const router = useRouter();
const projectStore = useProjectStore();

const search = ref("");
const statusFilter = ref("");
const sortKey = ref("id");
const sortAsc = ref(true);
const showModal = ref(false);

onMounted(() => {
  projectStore.loadProjects();
});

function goToProject(projectName: string) {
  router.push(`/tasks/${props.username}/${projectName}`);
}

function setSort(key: string) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
}

const filteredProjects = computed(() => {
  return filterAndSortProjects(
    props.projects,
    { search: search.value, status: statusFilter.value },
    sortKey.value,
    sortAsc.value
  );
});
</script>

<template>
  <div class="project-table">
    <div class="controls">
      <input v-model="search" placeholder="🔍 Пошук за назвою" />
      <select v-model="statusFilter">
        <option value="">Всі</option>
        <option value="active">Активні</option>
        <option value="non active">Неактивні</option>
      </select>
      <button @click="showModal = true">+ Додати проєкт</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>
            <Resizable :minWidth="80" class="vue-resizable"
              ><div @click="setSort('id')">ID</div></Resizable
            >
          </th>
          <th>
            <Resizable :minWidth="300" class="vue-resizable"
              ><div @click="setSort('name')">Назва</div></Resizable
            >
          </th>
          <th>
            <Resizable :minWidth="180" class="vue-resizable"
              ><div @click="setSort('taskCount')">
                Кількість завдань
              </div></Resizable
            >
          </th>
          <th>
            <Resizable :minWidth="100" class="vue-resizable"
              ><div @click="setSort('status')">Статус</div></Resizable
            >
          </th>
          <th>
            <Resizable :minWidth="180" class="vue-resizable"
              ><div>Дата створення</div></Resizable
            >
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in filteredProjects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>{{ project.status }}</td>
          <td>{{ project.createdAt }}</td>
          <td>
            <button @click="goToProject(project.name)">Переглянути</button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalForm v-if="showModal" type="project" @close="showModal = false" />
  </div>
</template>

<style scoped lang="scss">
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.vue-resizable {
  display: inline-block;
  width: 100%;
}

.vue-resizable > div {
  cursor: pointer;
  padding: 8px;
  white-space: nowrap;
}

table {
  width: 100%;
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
  position: relative;
  user-select: none;
}

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
}
</style>
