<template>
  <div style="display: flex; justify-content: center">
    <form
      style="display: flex; flex-direction: column"
      @submit.prevent="hanldeSubmit()"
    >
      <label for="name">Input name</label>
      <input v-model="name" />
      <label for="gender">Input Phone Nnmber</label>
      <input type="number" v-model="phone" />
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
import { computed, inject, reactive, ref, watch, type Ref } from "vue";
import { useRouter } from "vue-router";
const formInput = inject<FormInput[]>("formInput");
const editId = inject<Ref<number>>("editId");

console.log("editIdForm", editId);

const router = useRouter();

console.log("formInput", formInput);
const name = ref("");
const phone = ref("");

const defaultData = computed(() => {
  return formInput?.find((item) => item.id === editId?.value);
});

watch(
  defaultData,
  (newData) => {
    console.log("newData", newData);
    if (newData) {
      name.value = newData.name || "";
      phone.value = newData.phone || "";
    }
  },
  { immediate: true }
);

console.log("defaultData", defaultData);

function hanldeSubmit() {
  if (name.value !== "" || phone.value !== "") {
    if (editId?.value) {
      const index = formInput?.findIndex((item) => item.id === editId.value);

      if (index !== undefined && index !== -1 && formInput) {
        formInput[index] = {
          id: editId.value,
          name: name.value,
          phone: phone.value,
        };
      }
    } else {
      let id = Date.now();
      formInput?.push({ name: name.value, phone: phone.value, id: id });
    }

    router.push("/");
  }
  console.log("formInput", formInput);
}
</script>
