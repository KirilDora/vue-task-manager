<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useTaskStore } from "../store/taskStore";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
import ModalForm from "./ModalForm.vue";
import Resizable from "vue-resizable";
import type { Task, TaskStatus } from "../models/Task";

const taskStore = useTaskStore();
const route = useRoute();
const projectName = String(route.params.name);

const assigneeFilter = ref("");
const statusFilter = ref<TaskStatus | "">("");
const sortKey = ref<"deadline" | "status">("deadline");
const sortAsc = ref(true);
const showModal = ref(false);

// Статуси
const statuses: TaskStatus[] = ["todo", "in_progress", "done"];
const statusLabels: Record<TaskStatus, string> = {
  todo: "До виконання",
  in_progress: "В процесі",
  done: "Завершено",
};

// Фільтрація та сортування
const getFilteredTasks = computed(() => {
  let list = taskStore.getByProject(projectName);

  if (assigneeFilter.value) {
    list = list.filter((task) =>
      task.assignee?.toLowerCase().includes(assigneeFilter.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    list = list.filter((task) => task.status === statusFilter.value);
  }

  return [...list].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc.value
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    const aNum = typeof aVal === "string" ? Date.parse(aVal) : aVal;
    const bNum = typeof bVal === "string" ? Date.parse(bVal) : bVal;

    return sortAsc.value ? aNum - bNum : bNum - aNum;
  });
});

// Групування за статусом
const groupedTasks = computed(() => {
  const groups: Record<TaskStatus, Task[]> = {
    todo: [],
    in_progress: [],
    done: [],
  };

  getFilteredTasks.value.forEach((task) => {
    if (statuses.includes(task.status as TaskStatus)) {
      groups[task.status as TaskStatus].push(task);
    } else {
      console.warn("⚠️ Unknown status in task:", task);
    }
  });

  return groups;
});

const onDragEnd = () => {
  const updated: Task[] = [];

  statuses.forEach((status) => {
    groupedTasks.value[status]?.forEach((task) => {
      if (task.status !== status) {
        updated.push({ ...task, status });
      }
    });
  });

  if (updated.length) {
    taskStore.updateTasks([
      ...taskStore.tasks.map((task) => {
        const found = updated.find((t) => t.id === task.id);
        return found ? found : task;
      }),
    ]);
  }
};

onMounted(() => {
  taskStore.loadTasks();
});

watch(
  () => taskStore.tasks,
  () => {
    // реактивне оновлення через computed
  },
  { deep: true }
);
</script>

<template>
  <div class="task-table-wrapper">
    <div class="controls">
      <input v-model="assigneeFilter" placeholder="Фільтр за виконавцем" />
      <select v-model="statusFilter">
        <option value="">Усі статуси</option>
        <option value="todo">До виконання</option>
        <option value="in_progress">В процесі</option>
        <option value="done">Завершено</option>
      </select>
      <select v-model="sortKey">
        <option value="deadline">Сортувати за терміном</option>
        <option value="status">Сортувати за статусом</option>
      </select>
      <button @click="sortAsc = !sortAsc">{{ sortAsc ? "🔼" : "🔽" }}</button>
      <ModalForm
        v-if="showModal"
        type="task"
        :repoName="projectName"
        @close="showModal = false"
      />
    </div>

    <div class="tables">
      <div v-for="status in statuses" :key="status" class="table-block">
        <h3>{{ statusLabels[status] }}</h3>
        <table class="task-table">
          <thead>
            <tr>
              <th>
                <Resizable class="vue-resizable"><div>Назва</div></Resizable>
              </th>
              <th>
                <Resizable class="vue-resizable"
                  ><div>Виконавець</div></Resizable
                >
              </th>
              <th>
                <Resizable class="vue-resizable"><div>Дедлайн</div></Resizable>
              </th>
            </tr>
          </thead>
          <draggable
            tag="tbody"
            :list="groupedTasks[status]"
            group="tasks"
            item-key="id"
            @end="onDragEnd"
          >
            <template #item="{ element }">
              <tr>
                <td>{{ element.title }}</td>
                <td>{{ element.assignee }}</td>
                <td>{{ element.deadline }}</td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-table-wrapper {
  padding: 1rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tables {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.table-block {
  flex: 1 1 30%;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.5rem;
  }

  th {
    background: #f0f0f0;
    user-select: none;
  }

  .vue-resizable {
    display: inline-block;
    width: 100%;
  }

  .vue-resizable > div {
    cursor: pointer;
    white-space: nowrap;
    padding: 6px;
  }
}
</style>
