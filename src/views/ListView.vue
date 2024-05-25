<template>
  <h1>List</h1>
  <ul v-for="(data, index) in filteredList" :key="data.id">
    <li>{{ data.name }} {{ data.phone }}</li>
    <button @click="handleEdit(data.id)">Edit</button>
    <button @click="handleDelete(data.id)">Delete</button>
  </ul>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import type { FormInput } from "./FormView.vue";
import { useRouter } from "vue-router";

const removeId = ref(0);
const formInput = inject<FormInput[]>("formInput");
const editId = inject<Ref<number>>("editId");
// const formList = formInput?.filter((data) => data.id !== removeId.value);
const router = useRouter();
const filteredList = computed(() => {
  return formInput?.filter((data) => data.id !== removeId.value) || [];
});

function handleEdit(id: number) {
  console.log("id", id);
  if (editId) {
    editId.value = id;
  }
  router.push("/form");

  console.log("editId", editId);
}
function handleDelete(id: number) {
  console.log("id", id);
  removeId.value = id;
  console.log("filteredList", filteredList);
}
</script>
