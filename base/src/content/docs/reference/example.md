---
title: Example Reference
description: A reference page in my new Starlight docs site.
---

Reference pages are ideal for outlining how things work in terse and clear terms.
Less concerned with telling a story or addressing a specific use case, they should give a comprehensive outline of what you're documenting.

## Heading 2

- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework

### Heading 3

```javascript
// Included in price
const percentage = 16;
const subtotal = 200;
const discount = 20; // 10% => 20
const total = subtotal - discount
const taxValue = total - (total / (1 + (percentage / 100)));

console.log(taxValue)
```

- [x] test checkbox
- [ ] Second test
- [ ] Last
- [ ] hacer otra cosa

#### Heading 4

<Steps>

1. Agrega un archivo CSS a tu directorio `src/`.
   Por ejemplo, podrías establecer un ancho de columna predeterminado más ancho y un tamaño de texto más grande para los títulos de las páginas:

   ```css
   /* src/styles/custom.css */
   :root {
   	--sl-content-width: 50rem;
   	--sl-text-5xl: 3.5rem;
   }
   ```

2. Agrega la ruta de tu archivo CSS al array `customCss` de Starlight en `astro.config.mjs`:

   ```diff lang="js"
   // astro.config.mjs
   import { defineConfig } from 'astro/config';
   import starlight from '@astrojs/starlight';

   export default defineConfig({
   	integrations: [
   		starlight({
   			title: 'Docs With Custom CSS',
   			customCss: [
   +                // Ruta relativa a tu archivo CSS personalizado
   +				'./src/styles/custom.css',
   			],
   		}),
   	],
   });
   ```

</Steps>