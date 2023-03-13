import { memo } from 'react'
import { Layout, LayoutProps } from 'react-admin'
import { AppBar } from '../components/AppBar'

const WithThemeChange = (props: LayoutProps) => <Layout {...props} appBar={AppBar} />

export default memo(WithThemeChange)
