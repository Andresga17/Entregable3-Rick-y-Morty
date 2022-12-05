import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Locationinfo from './components/Locationinfo'
import ResidentCard from './components/ResidentCard'
import ErrorFetch from './components/ErrorFetch'

function App() {

const [location, setLocation] = useState()
const [locationInput, setLocationInput] = useState()
const [hasError, setHasError] = useState(false)

useEffect(() => {
  let URL
  if(locationInput){
    URL = `https://rickandmortyapi.com/api/location/${locationInput}`
  }else{
    const randomIdLocation = Math.floor(Math.random() * 126) + 1
    URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`
  }
 
  axios.get(URL)
    .then(res => {
      setLocation(res.data)
      setHasError(false)
    })
    .catch(err => {
      setHasError(true) 
      console.log(err)
    })
}, [locationInput])

const handleSubmit = (e) => {
  e.preventDefault()
  setLocationInput(e.target.inputSearch.value)
}

  return (
    <div className="App">
      <h1 className='main-title'>Rick and Morty</h1>
      <form className='main-form' onSubmit={handleSubmit}>
        <input className='main-form__input' placeholder='type a number (1-126)' id='inputSearch' type="text" />
        <button className='main-form__button'>Search</button>
      </form>
      {
        hasError ?
          <ErrorFetch />
        :
        <>
          <Locationinfo location={location}/>
          <div className='residents-container'>
            {
              location?.residents.map((url) => (
                <ResidentCard key={url} url={url} />
               ))
            }
          </div>
        </>  
      }
    </div>
  )
}

export default App
