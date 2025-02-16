import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import InfoSection from '../Components/InfoSection'
import { db } from '@/Service/FirebaseCongif'
import Hotels from '../Components/Hotels'
import PlacesToVisit from '../Components/PlacesToVisit'
import Footer from '../Components/Footer'

function Viewtrip() {
    const {tripId} = useParams()
    const [trip , setTrip] = useState({})

    useEffect(()=>{
        tripId&&GetTripData();
        
    } , [tripId])

    const GetTripData  = async ()=>{
        const docRef = doc(db,'AITrips',tripId)
        const docSnap = await getDoc(docRef)

          if(docSnap.exists()){            
            setTrip(docSnap.data()) 
          }else{
            console.log("No such Document");
            toast("No trip found")
          }
    }

  return (
    <div className='p-10 md:px-20 lg:ps-44 xl:px-56'>

    <InfoSection trip={trip} />
    <Hotels trip={trip} />
    <PlacesToVisit trip={trip} />
    <Footer trip={trip} />
    </div>
  )
}

export default Viewtrip