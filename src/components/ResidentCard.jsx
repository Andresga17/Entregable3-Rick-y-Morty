import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './styles/residentCard.css'

const ResidentCard = ({url}) => {

    const [resident, setResident] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res => setResident(res.data))
            .catch(err => console.log(err))
    }, [])



  return (
    <article className='card'>
        <header className='card__header'>
            <img className='card__avatar' src={resident?.image} alt="" />
            <div className='card__circle-container'>
                <div className={`card__circle ${resident?.status}`}></div>
                <span className='card__circle-label'>{resident?.status}</span>
            </div>
        </header>

        <section className='card__body'>
            <h3 className='card__name'>{resident?.name}</h3>
            <ul className='card__list'>
                <li className='card__itme'><span className='card__label'>Species</span><span className='card__item-label'>{resident?.species}</span></li>
                <li className='card__itme'><span className='card__label'>Origin</span><span className='card__item-label'>{resident?.origin.name}</span></li>
                <li className='card__itme'><span className='card__label'>Episodes where appear</span><span className='card__item-label'>{resident?.episode.length}</span></li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentCard