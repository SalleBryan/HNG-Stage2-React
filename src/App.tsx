import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import "./styles/index.css"
import "./styles/theme.css"

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
