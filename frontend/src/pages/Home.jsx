import React from 'react'
import Header from '../components/Header/Header'
import AllClass from '../components/allClasses/AllClass'

function Home() {
  return (
    <div>
        <Header/>
        <AllClass edit={false}/>
    </div>
  )
}

export default Home