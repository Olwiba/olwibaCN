import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Nexus dev: use sibling olwibaDX source so theme fixes apply before @olwiba/dx publish.
import { generatePreviews } from '../../olwibaDX/src/generate-previews.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await generatePreviews({
  baseUrl: 'http://localhost:3000',
  outputDir: path.join(__dirname, '../public/iso-previews'),
  manifestPath: path.join(__dirname, '../src/iso-previews-manifest.json'),
  themes: ['light', 'dark'],
  padding: 16,
  components: [
    { name: 'accordion' },
    { name: 'alert' },
    { name: 'aspect-ratio' },
    { name: 'avatar' },
    { name: 'badge' },
    { name: 'breadcrumb' },
    { name: 'button' },
    { name: 'button-group' },
    { name: 'calendar' },
    { name: 'card' },
    { name: 'carousel' },
    { name: 'chart' },
    { name: 'checkbox' },
    { name: 'empty' },
    { name: 'field' },
    { name: 'hotkey' },
    { name: 'input' },
    { name: 'input-group' },
    { name: 'input-otp' },
    { name: 'item' },
    { name: 'kbd' },
    { name: 'label' },
    { name: 'pagination' },
    { name: 'progress' },
    { name: 'radio-group' },
    { name: 'select' },
    { name: 'separator' },
    { name: 'skeleton' },
    { name: 'slider' },
    { name: 'spinner' },
    { name: 'status-indicator' },
    { name: 'switch' },
    { name: 'table' },
    { name: 'tabs' },
    { name: 'textarea' },
    { name: 'toggle' },
    { name: 'toggle-group' },
  ],
});
