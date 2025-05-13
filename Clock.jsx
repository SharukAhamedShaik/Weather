import { useEffect,useState } from "react"
const Clock = () => {
  const [currentTime, setcurrenTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrenTime(new Date())
    },1000)
    return() => clearInterval(timer)
  })
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl md:text-7xl font-bold">{new Date().toLocaleTimeString()}</h1>
      <p className="text-5m md:text-md font-medium">{new Date().toLocaleDateString()}</p>
    </div>
  )
}

export default Clock