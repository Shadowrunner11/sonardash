import { Admin, ListGuesser, Resource } from 'react-admin'
import { dataProvider } from './lib/data/sonarQube'

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name='issues' list={ListGuesser} />
    </Admin>
  )
}

export default App
