import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import Locationinfo from './components/Locationinfo'
import ResidentCard from './components/ResidentCard'

function App() {

const [location, setLocation] = useState()
const [locationInput, setLocationInput] = useState(randomIdLocation())
const [hasError, setHasError] = useState(false)
const [listLocation, setListLocation] = useState()
const [hiddeList, setHiddeList] = useState(false)

function randomIdLocation (){
  return Math.floor(Math.random() * 126) + 1
}

useEffect(() => {
  let URL = `https://rickandmortyapi.com/api/location/${locationInput}` 
  axios.get(URL)
    .then(res => {
      setLocation(res.data)
      setHasError(false)
    })
    .catch(err => {
      console.log(err)
      setHasError(true) 
    })
}, [locationInput])

const handleSubmit = (e) => {
  e.preventDefault()
  if (e.target.inputSearch.value.trim().length === 0) {
    setLocationInput(randomIdLocation())
  }else{
    setLocationInput(e.target.inputSearch.value.trim())
  }
  e.target.inputSearch.value = e.target.inputSearch.value.trim() 
}

const handleChange = e => {
  const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
  axios.get(url)
    .then(res => {
      setListLocation(res.data.results)
    })
    
    .catch(err => {
      console.log(err)
    })
    setHiddeList(!hiddeList)
}

// const handleClick = () => {
//   setHiddeList(!hiddeList)
//   console.log(hiddeList)
// }

  return (
    <div className="App">
      <h1 className='main-title'>Rick and Morty</h1>
      <form className='main-form' onSubmit={handleSubmit}>
          <input 
          className='main-form__input'
          placeholder='type a location'
          id='inputSearch'
          type="text" 
          onChange={handleChange}
          />
          <button className='main-form__button'>Search</button>
      </form>
          {/* <button onClick={handleClick}>fd</button> */}
      { hiddeList &&
      <div className='results'>  
        <ul>
          {
            listLocation?.map(loc => (
              <li className='results__item' onClick={() => setLocationInput(loc.id)} key={loc.id}>{loc.name}</li>
            )) 
          }
        </ul>        
      </div> 
      }
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
