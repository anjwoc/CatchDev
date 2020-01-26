import Vue from 'vue'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import ImageResize from 'quill-image-resize-module/image-resize.min.js'

// Quill.register('modules/imageResize', ImageResize);
VueQuillEditor.Quill.register('modules/imageResize', ImageResize);
Vue.use(VueQuillEditor)