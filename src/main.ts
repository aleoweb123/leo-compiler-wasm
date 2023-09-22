import './style.css'
import { setupCounter } from './counter'

const child = document.querySelector<HTMLDivElement>('#app')!.innerHTML

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>
      put leo source code below
    </p>
    ${child}
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
