import type { IFilerobotImageEditorConfig } from './types/config'

declare module '@/assets/lib/ImageEditor/filerobot-image-editor.min.js' {
  export default class ImageEditor {
    constructor(config: IFilerobotImageEditorConfig)
    render(): void
    terminate(): void
  }
}
