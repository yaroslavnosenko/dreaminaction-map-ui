import { Geologica } from 'next/font/google'

export const font = Geologica({ subsets: ['latin', 'cyrillic-ext'] })

export const fontFamily = font.style.fontFamily + ', sans-serif'
