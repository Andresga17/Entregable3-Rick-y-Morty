import React from 'react'
import './styles/locationInfo.css'

const Locationinfo = ({location}) => {

  return (
    <article className='location'>
        <h1 className='location__title'>{location?.name}</h1>
        <ul className='location__list'>
            <li className='location__list-item'><span className='location__list-info'>Type: </span>{location?.type}</li>
            <li className='location__list-item'><span className='location__list-info'>Dimension: </span>{location?.dimension}</li>
            <li className='location__list-item'><span className='location__list-info'>Population: </span>{location?.residents.length}</li>
        </ul>
    </article>
  )
}

export default Locationinfo