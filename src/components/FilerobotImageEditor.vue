<template>
  <div ref="fileRobotImageRef" class="editor-container"></div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
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
const filerobotImageEditorInstance = ref(null)

const initializeEditor = () => {
  try {
    if (!fileRobotImageRef.value) {
      throw new Error('fileRobotImageRef is not available')
    }

    const instance = new FilerobotImageEditor(fileRobotImageRef.value, {
      ...props.config,
      translations: getTranslations(),
    })

    filerobotImageEditorInstance.value = instance
    instance.render()
  } catch (error) {
    console.error('Failed to initialize FilerobotImageEditor:', error)
  }
}

onMounted(() => {
  initializeEditor()
})

defineExpose({
  filerobotImageEditorInstance: computed(() => filerobotImageEditorInstance.value),
})
</script>
<style scoped>
.editor-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
