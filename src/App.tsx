import { AttendeeList } from "./components/AttendeeList"
import { Header } from "./components/Header"

export function App() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-[1216px] mx-auto px-8 py-5">
      <Header />
      <AttendeeList />
    </div>
  )
}
