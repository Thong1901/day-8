import { defineConfig, presetIcons, presetUno } from 'unocss'
import lucide from '@iconify-json/lucide/icons.json'
export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            collections: {
                lucide: () => lucide as any,
            },
        }),
    ],
    theme: {
        breakpoints: {
            sm: '500px',
            md: '870px',
            lg: '1170px',
            xl: '1280px',
        },
    },
})
