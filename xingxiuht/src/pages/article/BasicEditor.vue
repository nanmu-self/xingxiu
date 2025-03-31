<template>
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        mode="default"
        v-model="modelValue"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
      />
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  watch,
  defineModel,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { upimg } from "@/api/article.js";

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

const modelValue = defineModel();

// 模拟 ajax 异步获取内容
onMounted(() => {
  //   setTimeout(() => {
  //     valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  //   }, 1500);
});

const toolbarConfig = {};
const editorConfig = { MENU_CONF: {} };

editorConfig.MENU_CONF["uploadImage"] = {
  // 自定义上传

  async customUpload(file, insertFn) {
    console.log(file);
    try {
      // 图片转base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });

      let res = await upimg({
        file: base64,
        name: Date.now() + file.name,
      });
      console.log(res);
      // TODO: 在这里处理你的上传逻辑
      // const url = '上传后的图片URL';
      // const alt = '图片说明';
      // const href = '点击跳转链接';
      // insertFn(url, alt, href);
    } catch (error) {
      console.error("文件转换失败：", error);
      throw error;
    }
  },
};

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
// const emit = defineEmits(["update:valueHtml"]);
const handleChange = (editor) => {
  // emit("update:valueHtml", editor.getHtml());
};
const handleDestroyed = (editor) => {
  console.log("destroyed", editor);
};
const handleFocus = (editor) => {
  console.log("focus", editor);
};
const handleBlur = (editor) => {
  console.log("blur", editor);
};
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`);
};
// const customPaste = (editor, event, callback) => {
//   console.log("ClipboardEvent 粘贴事件对象", event);

//   // 自定义插入内容
//   editor.insertText("xxx");

//   // 返回值（注意，vue 事件的返回值，不能用 return）
//   callback(false); // 返回 false ，阻止默认粘贴行为
//   // callback(true) // 返回 true ，继续默认的粘贴行为
// };

//打印内容
const printHtml = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  console.log(editor.getHtml());
};
</script>
