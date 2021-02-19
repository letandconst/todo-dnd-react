import './App.css'
import Page from './components/pageLayout'
function App ({ children }) {
  return (
    <Page>
      {children}
    </Page>
  )
}

export default App
