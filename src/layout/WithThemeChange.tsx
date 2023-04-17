import { memo } from 'react'
import { Layout, LayoutProps } from 'react-admin'
import { AppBar } from '../components/AppBar'
import AsideMenu from '../components/AsideMenu'

const WithThemeChange = (props: LayoutProps) => <Layout {...props} appBar={AppBar} menu={AsideMenu} />

export default memo(WithThemeChange)
