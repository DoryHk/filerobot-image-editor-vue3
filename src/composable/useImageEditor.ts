import confidential from '@/assets/confidential.png'
import topSecret from '@/assets/top-secret.png'
import { TOOLS, TABS, type IFilerobotImageEditorConfig } from '@/types/config'
/**
 * Download file
 * @param blob
 */
function uriDownload(base64Data: string, fileName: string) {
  // Create a link element
  const link = document.createElement('a')

  link.href = base64Data
  link.download = fileName

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
const config: IFilerobotImageEditorConfig = {
  source:
    'https://api.filerobot.com/scaleflex-tests-v5a/v3/get/d8880a7c-94fc-5524-b1de-a61de6650000?version=1638547407275',
  [TOOLS.WATERMARK]: {
    gallery: [confidential, topSecret],
    textScalingRatio: 0.33,
    imageScalingRatio: 0.33,
  },
  [TOOLS.TEXT]: {
    text: 'Text...',
  },
  language: 'en',
  avoidChangesNotSavedAlertOnLeave: false,
  // tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.FINETUNE, TABS.WATERMARK],
  previewPixelRatio: window.devicePixelRatio * 4,
  defaultTabId: TABS.ANNOTATE,
  onSave: (savedImageData) => {
    try {
      uriDownload(savedImageData.imageBase64!, savedImageData.fullName!)
    } catch (error) {
      console.log(error)
    }
  },
  showSaveButton: true,
  disableSaveIfNoChanges: true,
  resetOnImageSourceChange: true,
}

export default config
