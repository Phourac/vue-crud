<template>
  <div style="display: flex; justify-content: center">
    <form
      style="display: flex; flex-direction: column"
      @submit.prevent="hanldeSubmit()"
    >
      <label for="name">Input name</label>
      <input v-model="name" />
      <label for="email">Input email</label>
      <input v-model="email" />
      <label for="gender">Input gender</label>
      <input v-model="gender" />
      <label for="status">Input status</label>
      <input v-model="status" />
      <input type="submit" />
    </form>
  </div>
</template>
<script setup lang="ts">
export interface FormInput {
  id: number;
  name?: string;
  phone?: string;
}
import {
  computed,
  inject,
  onMounted,
  reactive,
  ref,
  watch,
  type Ref,
} from "vue";
import { useRouter } from "vue-router";
import type { IdataList } from "./ListView.vue";
// const formInput = inject<FormInput[]>("formInput");
const editId = inject<Ref<number>>("editId");

const dataDetailList = ref<IdataList>({
  email: "",
  gender: "",
  name: "",
  status: "",
});
console.log("dataDetailList", dataDetailList);

const createForm = async (formData: IdataList) => {
  try {
    const response = await fetch("https://gorest.co.in/public/v2/users", {
      method: "POST", // specify the HTTP method (POST for creating data)
      headers: {
        "Content-Type": "application/json", // specify the content type of the request body
        Authorization:
          "Bearer caae78cf87de548147f33f97c2becc4a8b3c56d1550ca4407cd2e689b9689942",
      },
      body: JSON.stringify(formData), // convert the JavaScript object to a JSON string
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data created:", data); // handle the response data as needed
  } catch (error) {
    console.error("Failed to create data:", error);
  }
};

const updateForm = async (formData: IdataList, id: number) => {
  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "PUT", // specify the HTTP method (POST for creating data)
      headers: {
        "Content-Type": "application/json", // specify the content type of the request body
        Authorization:
          "Bearer caae78cf87de548147f33f97c2becc4a8b3c56d1550ca4407cd2e689b9689942",
      },
      body: JSON.stringify(formData), // convert the JavaScript object to a JSON string
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data created:", data); // handle the response data as needed
  } catch (error) {
    console.error("Failed to create data:", error);
  }
};

const dataDetail = async (id: number) => {
  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
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
    // dataDetailList.splice(0, dataDetailList.length, ...data); // Ensures reactivity by updating the array
    dataDetailList.value = data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

onMounted(() => {
  if (editId?.value) {
    dataDetail(editId.value);
  }
});

watch(dataDetailList, (newData) => {
  name.value = newData.name || "";
  email.value = newData.email || "";
  gender.value = newData.gender || "";
  status.value = newData.status || "";
});

console.log("editIdForm", editId);

const router = useRouter();

const name = ref<string>("");
const gender = ref<string>("");
const email = ref<string>("");
const status = ref<string>("");

function hanldeSubmit() {
  if (editId) {
    updateForm(
      {
        email: email.value,
        gender: gender.value,
        name: name.value,
        status: status.value,
      },
      editId.value
    );
  }
  createForm({
    email: email.value,
    gender: gender.value,
    name: name.value,
    status: status.value,
  });

  router.push("/");
}
</script>
