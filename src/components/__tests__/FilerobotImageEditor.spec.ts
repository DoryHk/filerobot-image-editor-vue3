import { mount } from '@vue/test-utils'
import FilerobotImageEditor from '@/components/FilerobotImageEditor.vue'
import { vi, describe, it, expect } from 'vitest'
import config from '@/composable/useImageEditor'

// Mock the FilerobotImageEditor library
vi.mock('@/assets/lib/ImageEditor/filerobot-image-editor.min.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      render: vi.fn(),
    })),
  }
})

describe('FilerobotImageEditor.vue', () => {
  it('renders the editor container and initializes FilerobotImageEditor', async () => {
    const wrapper = mount(FilerobotImageEditor, {
      props: { config },
    })

    expect(wrapper.find('.editor-container').exists()).toBe(true)

    const mockedFilerobotImageEditor = // @ts-ignore
    (await import('@/assets/lib/ImageEditor/filerobot-image-editor.min.js')).default
    expect(mockedFilerobotImageEditor).toHaveBeenCalledWith(
      wrapper.find('.editor-container').element,
      expect.objectContaining({
        source: expect.any(String),
      }),
    )
  })
})
