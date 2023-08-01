import React from 'react'
import Hourglass from './Hourglass.gif'

export default function Spinner() {

    return (
      <div className='my-5 text-center'>
        <img src={Hourglass} alt="HoursGlass" />
      </div>
    )
}


