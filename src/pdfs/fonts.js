import { Font } from '@react-pdf/renderer'

export const registerFonts = () => {
  Font.register({
    family: 'NotoDeva',
    fonts: [
      { src: '/fonts/NotoSansDevanagari-Regular.ttf', fontWeight: 400 },
      { src: '/fonts/NotoSansDevanagari-Bold.ttf', fontWeight: 700 },
    ],
  })
}
