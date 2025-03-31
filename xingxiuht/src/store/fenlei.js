import { defineStore } from "pinia";
import { ref } from "vue";
import { addClass, updateClass, getClass, delClass } from "@/api/labelClass";

export const useClassStore = defineStore("fenlei", () => {
  const classArr = ref([]);

  // const getFenlei=

  return { classArr };
});
