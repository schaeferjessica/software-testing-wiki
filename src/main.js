import { createApp } from 'vue'
import App from './App.vue'
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

const app = createApp(App);
app.component('RichTextRenderer', RichTextRenderer);
app.mount('#app')
