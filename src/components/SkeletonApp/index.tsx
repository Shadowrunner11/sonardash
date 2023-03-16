import ResponsiveLoadingScreen from '../../layout/ResponsiveLoadingScreen'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

const SkeletonApp = () => <ResponsiveLoadingScreen mobileview={<Mobile />} desktopview={<Desktop />} />

export default SkeletonApp
