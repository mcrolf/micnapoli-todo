import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Card, CardTitle, CardContent} from './components/ui/card'
import TodoCards from './components/todo/todo-cards'


export default function App() {
  
  const [count, setCount] = useState(0)
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    // Check and set the current theme on page load
    if (localStorage.getItem('theme') === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Update localStorage and class on the <html> element
    if (isDark) {
      document.documentElement.classList.remove('dark')
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <>
      <div className='header-grid'>
        <div className='flex items-center justify-center'>
          <Button className='w-full flex justify-center p-4'
            onClick={toggleTheme}>{theme}</Button>
        </div>
        
        <div className="bg-background text-foreground flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl flex items-center">
            <CardTitle className="card-icons">
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </CardTitle>
            <CardContent className="space-y-4">
              <h1>Vite + React + Shadcn</h1>
              <Button className="w-full"
                onClick={() => setCount((count) => count + 1)}>Count {count}</Button>
              <Button className='w-full'
                onClick={() => setCount(0)}>Zero</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <TodoCards/>
      </div>
    </>
  )
}
