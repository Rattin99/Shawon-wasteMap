"use client";


import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  InfoWindow
} from "@vis.gl/react-google-maps"

import { data } from "@/components/data";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const notify = () => toast("House id does not exist in database.\nplease enter a number between 1 and 62");
  const [markers,setMarkers] = useState(data);
  const [open,setOpen] = useState(false);
  const [selected, setSelected] = useState(data[0]);

  const position = {lat:markers[0].latitude, lng: markers[0].longitude};

  const handleSearch = (e) => {
    e.preventDefault()
    const search = e.target.id.value
    const searchNumber = parseInt(search)
    const result = markers.filter((marker) => {
      return marker.id === searchNumber
    })

    if(result.length > 0 && searchNumber < 62){
      setSelected(result[0])
      setOpen(true)
    }

    if(searchNumber > 62) {
      console.log(searchNumber)
      notify()
    }
  }
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        <Map defaultZoom={10} defaultCenter={position} center={{lat:selected.latitude, lng: selected.longitude}} >
           {
             markers.map((marker) => (
               <Marker key={marker.id} position={{lat:marker.latitude, lng: marker.longitude}} onClick={() => {setOpen(true); setSelected(marker)}} />
             ))
           }

           {
            open && <InfoWindow position={{lat:selected.latitude, lng: selected.longitude}} onCloseClick={() => setOpen(false)}><div>
              <p className="text-black">Id: {selected.id}</p>
              <p className="text-black">Name: {selected.name}</p>
              <p className="text-black">Last cleaning date: {selected.last_cleaning_date}</p>
              <p className="text-black">Next cleaning date: {selected.next_cleaning_date}</p>

              </div></InfoWindow>
           }
        </Map>
        <div className="absolute top-5 left-1/3 w-full ">
          <form onSubmit={handleSearch}>
            <input type="text" name="id" className="w-1/4 h-8 rounded-sm text-black  rounded-r-none border" placeholder="enter house id" />
            <button className="bg-white border h-8 rounded-sm rounded-l-none text-black" type="submit">Search</button>
          </form>
        </div>
      <ToastContainer />

      </div>

    </APIProvider>
  );
}
