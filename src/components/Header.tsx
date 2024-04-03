import logoImg from '../assets/logo.svg'
import { NavLink } from './NavLink'

export function Header() {
  return (
    <header className='flex items-center gap-5 py-2'>
      <img src={logoImg} alt="" />

      <nav className='flex items-center gap-5'>
        <NavLink href="/eventos" name="Eventos" />
        <NavLink href="/participantes" name="Participantes" />
      </nav>
    </header>
  )
}
