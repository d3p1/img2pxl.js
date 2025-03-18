/**
 * @description Page
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
'use client'

import {useEffect} from 'react'
import Img2Pxl from '@d3p1/img2pxl'

export default function Home() {
  useEffect(() => {
    const app = new Img2Pxl(
      '/img2pxl/media/images/logo.png',
      280,
      280,
      64,
      64,
      3,
    )

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        app.dispose()
      }
    })

    app.render()
  }, [])

  return null
}
