import { h, render } from 'preact'
import App from './App'

const cont = document.getElementById('root1')

if (cont) {
  render(<App />, cont)
} else {
  console.error(
    `%c
███████  █████  ████████  █████   ██
██      ██   ██    ██    ██   ██  ██       ██
█████   ███████    ██    ███████  ██
██      ██   ██    ██    ██   ██  ██       ██
██      ██   ██    ██    ██   ██  ███████
%c
Root element not found!`,
    'color: #FF4C4C',
    null,
  )
}

// Webpack HMR
module.hot && module.hot.accept()
