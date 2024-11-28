# filerobot-image-editor-vue3

This is a Vue 3 wrapper component for the Filerobot Image Editor, a powerful and user-friendly image editor library. It provides an easy way to integrate advanced image editing features into your Vue 3 applications, enabling users to edit, crop, resize, annotate, and enhance images directly in the browser.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Usage

Once installed, you can use the image editor component in your Vue application by passing a `config` object with various configuration options.

### Importing the Component

```typescript
<script lang="ts">
import { FilerobotImageEditorVue3 } from 'filerobot-image-editor-vue3';
import type { IFilerobotImageEditorConfig, TOOLS, TABS } from 'filerobot-image-editor-vue3';

export default {
  components: {
    FilerobotImageEditorVue3,
  },
  setup() {
    const editorConfig: IFilerobotImageEditorConfig = {
      tools: [TOOLS.CROP, TOOLS.RESIZE],
      tabs: [TABS.ADJUST, TABS.FILTERS],
      source: 'https://example.com/image.jpg',
      language: 'en',
    };

    return { editorConfig };
  },
};
</script>

<template>
  <div>
    <FilerobotImageEditorVue3 :config="editorConfig" />
  </div>
</template>
```

### Props

| Prop     | Type                          | Description                              |
| -------- | ----------------------------- | ---------------------------------------- |
| `config` | `IFilerobotImageEditorConfig` | Configuration object for tools and tabs. |

### Types

You can use the exported types for configuration:

```typescript
import type { IFilerobotImageEditorConfig, TOOLS, TABS } from 'filerobot-image-editor-vue3'

const editorConfig: IFilerobotImageEditorConfig = {
  tools: [TOOLS.CROP, TOOLS.RESIZE],
  tabs: [TABS.ADJUST, TABS.FILTERS],
}
```

## Configuration Options

The `config` prop is an object that follows the `IFilerobotImageEditorConfig` interface. Below is a breakdown of the available configuration options:

### General Configuration

- **`theme`**: (optional) The theme of the editor (`'light'` or `'dark'`).
- **`source`**: The source of the image to be edited. Can be a URL string or an `HTMLImageElement`.
- **`language`**: (optional) Language for the editor interface. Supported languages include: `'en'`, `'fr'` or a custom language string.
- **`translations`**: (optional) A custom translation object to localize the editor text.

### Tool Configurations

- **Text Annotation (`Text`)**:

  - `fonts`: (optional) An array of font options available for text annotations.
  - `onFontChange`: (optional) Callback triggered when the font is changed.

- **Crop Tool (`Crop`)**:

  - `minWidth`, `minHeight`: Minimum width and height for the crop tool.
  - `ratio`: Defines the aspect ratio for cropping (`'original'`, `'custom'`, `'ellipse'`, or a numeric value).
  - `presetsItems`: (optional) Predefined crop ratio options (e.g., `'16:9'`).

- **Watermark Tool (`Watermark`)**:
  - `gallery`: (optional) List of available watermarks.
  - `onUploadWatermarkImgClick`: (optional) Function to handle watermark image uploads.

### Event Handlers

- **`onBeforeSave`**: (optional) Callback function to run before saving the image.
- **`onSave`**: (optional) Callback function to run when saving the image.
- **`onClose`**: (optional) Callback function when closing the editor, with parameters for the reason and unsaved changes.

## Conclusion

The `config` prop allows you to fully customize the behavior and appearance of the image editor. You can control the available tools, event handlers, and even integrate with cloud services such as Cloudimage. This package provides a simple and flexible solution for adding image editing features to your Vue 3 applications.

---

## License

MIT License - see [LICENSE](LICENSE) for details.
