<template>
  <h1>List</h1>
  <ul v-for="(data, index) in dataList" :key="data.id">
    <li>{{ data.name }} {{ data.gender }} {{ data.status }}</li>
    <button @click="handleEdit(data.id || 0)">Edit</button>
    <button @click="handleDelete(data.id || 0)">Delete</button>
  </ul>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref, type Ref } from "vue";
import type { FormInput } from "./FormView.vue";
import { useRouter } from "vue-router";

export interface IdataList {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const dataList = reactive<IdataList[]>([]);

console.log("dataList", dataList);

const fetchData = async () => {
  try {
    const response = await fetch("https://gorest.co.in/public/v2/users", {
      method: "GET", // specify the HTTP method (POST for creating data)
      headers: {
        "Content-Type": "application/json", // specify the content type of the request body
        Authorization:
          "Bearer caae78cf87de548147f33f97c2becc4a8b3c56d1550ca4407cd2e689b9689942",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dataList.splice(0, dataList.length, ...data); // Ensures reactivity by updating the array
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const removeData = async (id: number) => {
  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "DELETE", // specify the HTTP method (POST for creating data)
      headers: {
        "Content-Type": "application/json", // specify the content type of the request body
        Authorization:
          "Bearer caae78cf87de548147f33f97c2becc4a8b3c56d1550ca4407cd2e689b9689942",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dataList.splice(0, dataList.length, ...data); // Ensures reactivity by updating the array
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

onMounted(fetchData);

const removeId = ref(0);
// const formInput = inject<FormInput[]>("formInput");
const editId = inject<Ref<number>>("editId");
// const formList = formInput?.filter((data) => data.id !== removeId.value);
const router = useRouter();
// const filteredList = computed(() => {
//   return formInput?.filter((data) => data.id !== removeId.value) || [];
// });

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
  // removeId.value = id;
  removeData(id);
  // console.log("filteredList", filteredList);
}
</script>
