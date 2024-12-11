import { useState /* , useEffect */ } from 'preact/hooks'
import { redText } from '@/styles/App.module.css'
import Image from '@/assets/avatar.png'

export default function App() {
  const [num, setNum] = useState(0)

  return (
    <>
      <h1 class={redText}>Learning Preact is not hard :)</h1>
      <img src={Image} />

      <p>{num}</p>
    </>
  )
}
