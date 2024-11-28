<script lang="ts" setup>
import FilerobotImageEditor from '@/components/FilerobotImageEditor.vue'
import config from '@/composable/useImageEditor'
</script>

<template>
  <div class="home-page">
    <div>
      <h1 class="page-title">Welcome to the Filerobot Image Editor</h1>
      <FilerobotImageEditor class="editor-container" :config="config" />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #d1d5db);
  padding: 20px;
}

.editor-container {
  width: 100vw;
  height: 80vh;
  display: flex;
  max-width: 1200px;
  text-align: center;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 20px;
  border-radius: 8px;
}

.page-title {
  justify-content: center;
  display: flex;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
