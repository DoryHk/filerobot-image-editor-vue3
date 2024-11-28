import type { Theme } from '@scaleflex/ui/theme'
import type { FunctionalComponent } from 'vue'

// Define constants
export const TABS = {
  FINETUNE: 'Finetune',
  FILTERS: 'Filters',
  ADJUST: 'Adjust',
  WATERMARK: 'Watermark',
  ANNOTATE: 'Annotate',
  RESIZE: 'Resize',
} as const

export const TOOLS = {
  CROP: 'Crop',
  ROTATE: 'Rotate',
  FLIP_X: 'Flip_X',
  FLIP_Y: 'Flip_Y',
  BRIGHTNESS: 'Brightness',
  CONTRAST: 'Contrast',
  HSV: 'HueSaturationValue',
  WARMTH: 'Warmth',
  BLUR: 'Blur',
  THRESHOLD: 'Threshold',
  POSTERIZE: 'Posterize',
  PIXELATE: 'Pixelate',
  NOISE: 'Noise',
  FILTERS: 'Filters',
  RECT: 'Rect',
  ELLIPSE: 'Ellipse',
  POLYGON: 'Polygon',
  TEXT: 'Text',
  LINE: 'Line',
  IMAGE: 'Image',
  ARROW: 'Arrow',
  WATERMARK: 'Watermark',
  PEN: 'Pen',
  RESIZE: 'Resize',
} as const

// Define types
type AvailableTabs = (typeof TABS)[keyof typeof TABS]
type AvailableTools = (typeof TOOLS)[keyof typeof TOOLS]
type LineCap = 'butt' | 'round' | 'square'

type ClosingReasons = 'after-saving' | 'close-button-clicked' | 'back-button-clicked' | string

type SavedImageData = {
  name: string
  extension: string
  mimeType: string
  fullName?: string
  height?: number
  width?: number
  imageBase64?: string
  imageCanvas?: HTMLCanvasElement
  quality?: number
  cloudimageUrl?: string
}

type AnnotationsCommon = {
  fill?: string
  stroke?: string
  strokeWidth?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
  shadowColor?: string
  shadowOpacity?: number
  opacity?: number
}

// Define annotations types
type TextAnnotation = AnnotationsCommon & {
  text?: string
  fontFamily?: string
  fontSize?: number
  letterSpacing?: number
  lineHeight?: number
  align?: 'left' | 'center' | 'right'
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bold italic'
}

type ImageAnnotation = AnnotationsCommon & {
  disableUpload?: boolean
  gallery?: {
    originalUrl: string
    previewUrl: string
  }[]
}

type RectAnnotation = AnnotationsCommon & {
  cornerRadius?: number
}

type PolygonAnnotation = AnnotationsCommon & {
  sides?: number
}

type PenAnnotation = AnnotationsCommon & {
  tension?: number
  lineCap?: LineCap
  selectAnnotationAfterDrawing?: boolean
}

type LineAnnotation = AnnotationsCommon & {
  lineCap?: LineCap
}

type ArrowAnnotation = AnnotationsCommon & {
  lineCap?: LineCap
  pointerLength?: number
  pointerWidth?: number
}

type RotateAnnotation = {
  angle?: number
  componentType?: 'slider' | 'buttons'
}

// Crop Preset Types
type CropPresetItem = {
  titleKey: string
  width?: number
  height?: number
  ratio?: string | number
  descriptionKey?: string
  icon?: string | HTMLElement | FunctionalComponent
  disableManualResize?: boolean
  noEffect?: boolean
}

type CropPresetGroup = {
  titleKey: string
  items: CropPresetItem[]
}

type CropPresetFolder = {
  titleKey: string
  groups: CropPresetGroup[]
  icon?: string | HTMLElement | FunctionalComponent
}

export type onSaveFunction = (
  savedImageData: SavedImageData,
  imageDesignState: ImageDesignState,
) => void | Promise<void>

type triggerSaveModalFn = (arg0: onSaveFunction) => void
type triggerSavingFn = (arg0: onSaveFunction) => void

type SaveOption = {
  label: string
  icon: string | HTMLElement | FunctionalComponent
  onClick: (arg0: triggerSaveModalFn, arg1: triggerSavingFn) => void
}

// Image Design State
type ImageDesignState = {
  imgSrc?: string
  finetunes?: string[]
  finetunesProps?: {
    brightness?: number
    contrast?: number
    hue?: number
    saturation?: number
    value?: number
    blurRadius?: number
    warmth?: number
  }
  filter?: string
  adjustments?: {
    crop: {
      ratio: string | number
      width?: number
      height?: number
      x?: number
      y?: number
      ratioFolderKey?: string
      ratioGroupKey?: string
      ratioTitleKey?: string
    }
    isFlippedX?: boolean
    isFlippedY?: boolean
    rotation?: number
  }
  annotations?: {
    [key: string]: AnnotationsCommon &
      (
        | TextAnnotation
        | RectAnnotation
        | PolygonAnnotation
        | PenAnnotation
        | LineAnnotation
        | ArrowAnnotation
      ) & {
        id: string
        name: string
        x: number
        y: number
        scaleX?: number
        scaleY?: number
        width?: number
        height?: number
        radius?: number
        radiusX?: number
        radiusY?: number
        points?: number[]
        image?: string | HTMLElement
      }
  }
  resize?: {
    width?: number
    height?: number
    manualChangeDisabled?: boolean
  }
  shownImageDimensions?: {
    width: number
    height: number
    scaledBy: number
  }
}

export interface IFilerobotImageEditorConfig {
  theme?: Theme
  source: string | HTMLImageElement
  annotationsCommon?: AnnotationsCommon
  // [TOOLS_IDS.TEXT]
  Text?: TextAnnotation & {
    fonts?: (string | { label: string; value: string })[]
    onFontChange?: (newFontFamily: string, reRenderCanvasFn: () => void) => void
  }
  // [TOOLS_IDS.IMAGE]
  Image?: ImageAnnotation
  // [TOOLS_IDS.ELLIPSE]
  Ellipse?: AnnotationsCommon
  // [TOOLS_IDS.RECT]
  Rect?: RectAnnotation
  // [TOOLS_IDS.POLYGON]
  Polygon?: PolygonAnnotation
  // [TOOLS_IDS.PEN]
  Pen?: PenAnnotation
  // [TOOLS_IDS.LINE]: {
  Line?: LineAnnotation
  // [TOOLS_IDS.ARROW]: {
  Arrow?: ArrowAnnotation
  // [TOOLS_IDS.ROTATE]:
  Rotate?: RotateAnnotation
  // [TOOLS_IDS.WATERMARK]
  Watermark?: {
    gallery?: string[] | { url: string; previewUrl: string }[] | []
    onUploadWatermarkImgClick?: (
      loadAndSetWatermarkImg: (imgUrl: string, revokeObjectUrl: boolean) => void,
    ) => Promise<{ url: string; revokeObjectUrl?: boolean }> | void
    textScalingRatio?: number
    imageScalingRatio?: number
    hideTextWatermark?: boolean
  }
  // [TOOLS_IDS.CROP]
  Crop?: {
    minWidth?: number
    minHeight?: number
    maxWidth?: null
    maxHeight?: null
    ratio?: 'original' | 'custom' | 'ellipse' | number
    noPresets?: boolean
    ratioTitleKey?: string
    presetsItems?: CropPresetItem[]
    presetsFolders?: CropPresetFolder[]
    autoResize?: boolean
    lockCropAreaAt?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'center-left'
      | 'center-center'
      | 'center-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
  }
  // TABS_IDS
  tabsIds?: AvailableTabs[] | []
  defaultTabId?: AvailableTabs
  defaultToolId?: AvailableTools
  onBeforeSave?: (savedImageData: SavedImageData) => void | boolean
  onSave?: onSaveFunction
  onClose?: (closeReason: ClosingReasons, haveNotSavedChanges: boolean) => void
  closeAfterSave?: boolean
  defaultSavedImageName?: string
  defaultSavedImageType?: 'png' | 'jpeg' | 'jpg' | 'webp'
  defaultSavedImageQuality?: number
  forceToPngInEllipticalCrop?: boolean
  useBackendTranslations?: boolean
  translations?: object
  language?: 'en' | 'fr' | 'de' | 'it' | 'pt' | 'es' | 'nl' | 'pl' | 'ro' | string
  avoidChangesNotSavedAlertOnLeave?: boolean
  loadableDesignState?: ImageDesignState
  showBackButton?: boolean
  savingPixelRatio?: number
  previewPixelRatio?: number
  moreSaveOptions?: SaveOption[]
  useCloudimage?: boolean
  cloudimage?: {
    token: string
    dontPrefixUrl?: boolean
    domain?: string
    version?: string
    secureProtocol?: boolean
    loadableQuery?: string
    imageSealing?: {
      enable?: boolean
      salt?: string
      charCount?: number
      includeParams?: string[]
    }
  }
  observePluginContainerSize?: boolean
  showCanvasOnly?: boolean
  onModify?: (currentImageDesignState: ImageDesignState) => void
  useZoomPresetsMenu?: boolean
  disableZooming?: boolean
  noCrossOrigin?: boolean
  showSaveButton?: boolean
  disableSaveIfNoChanges?: boolean
  removeSaveButton?: boolean
  resetOnImageSourceChange?: boolean
  backgroundColor?: string
  backgroundImage?: HTMLImageElement
}
