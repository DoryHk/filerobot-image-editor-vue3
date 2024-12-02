<template>
  <div ref="fileRobotImageRef" class="editor-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// @ts-ignore
import FilerobotImageEditor from '@/assets/lib/ImageEditor/filerobot-image-editor.min.js'
import type { IFilerobotImageEditorConfig } from '@/types/config'
import fr from '@/utils/lang/fr'
import en from '@/utils/lang/en'

const fileRobotImageRef = ref(null)
interface IProps {
  config: IFilerobotImageEditorConfig
}
const props = defineProps<IProps>()

/**
 * Helper: Determines translations based on language or passed configuration.
 * @returns Translation strings object.
 */
const getTranslations = () => {
  if (props.config?.translations) {
    return props.config.translations
  }
  if (!props.config?.translations && props.config?.language === 'fr') {
    return fr
  }
  return en
}
/**
 * Lifecycle: Mounts the editor instance on the container.
 */
onMounted(() => {
  try {
    new FilerobotImageEditor(fileRobotImageRef.value, {
      ...props.config,
      translations: getTranslations(),
    }).render()
  } catch (error) {
    console.error(error)
  }
})
</script>
<style scoped>
.editor-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
