import React from 'react'
import { useJsApiLoader,Autocomplete } from '@react-google-maps/api';


export default function Map() {

  const {isLoaded}=useJsApiLoader({
    googleMapsApiKey:"AIzaSyB4btr2-qapJbexdgT2sIajOY9adryN6Ns",
    libraries:['places'],
  })
  
  
  
  return (
    <>
    {isLoaded&&<Autocomplete>
    <input type="text" />
    </Autocomplete>
    }
    </>
  )
}
