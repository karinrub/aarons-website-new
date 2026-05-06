import AboutAaron from './components/AboutAaron/AboutAaron'
import BeachLesson from './components/BeachLesson/BeachLesson'
import BookingFlow from './components/BookingFlow/BookingFlow'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import WeeklyLessons from './components/WeeklyLessons/WeeklyLessons'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <BeachLesson />
      <WeeklyLessons />
      <BookingFlow />
      <AboutAaron />
    </>
  )
}

export default App
