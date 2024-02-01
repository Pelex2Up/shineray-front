import { FC, useEffect } from 'react'
import styles from './mainLayout.module.scss'
import { HeaderBar } from 'components/headerBar'
import { Outlet } from 'react-router-dom'
import { Footer } from 'components/footerBar'
import { useBoolean } from 'customHooks/useBoolean'

export const MainLayout: FC = () => {
  const [headerColoured, { open: colorBg, close: uncolorBg }] = useBoolean()
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const blockHeight = document.getElementById('header-slider')?.offsetHeight ?? 0

      if (scrollPosition > blockHeight - 50) {
        colorBg()
      } else {
        uncolorBg()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <HeaderBar color={headerColoured} />
      <Outlet />
      <Footer />
    </div>
  )
}
