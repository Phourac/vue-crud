<script lang="ts">
import { reactive, ref } from "vue";

interface FormInputData {
  id: number;
  name?: string;
  phone?: string;
}

export const FormInput = reactive<FormInputData[]>([]);
export const editId = ref<number>(0);
</script>
<template></template>
