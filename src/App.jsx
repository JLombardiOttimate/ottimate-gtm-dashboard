import PasswordGate from './PasswordGate'
import Dashboard from './Dashboard'
import { CompareProvider } from './hooks/useCompareMode'

export default function App() {
  return (
    <PasswordGate>
      <CompareProvider>
        <Dashboard />
      </CompareProvider>
    </PasswordGate>
  )
}
