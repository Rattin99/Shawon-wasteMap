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

export default function Home() {

  const [markers,setMarkers] = useState(data);
  const [open,setOpen] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const [search,setSearh] = useState(null);

  const position = {lat:markers[0].latitude, lng: markers[0].longitude};

  const handleSearch = () => {
    const result = markers.filter((marker) => {
      return marker.id === parseInt(search)
    })

    if(result.length > 0){
      setSelected(result[0])
      setOpen(true)
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
              <p>Id: {selected.id}</p>
              <p>Name: {selected.name}</p>
              <p>Last cleaning date: {selected.last_cleanign_date}</p>
              <p>Next cleaning date: {selected.next_cleaning_date}</p>

              </div></InfoWindow>
           }
        </Map>
        <div className="absolute top-5 left-1/3 w-full ">
          <input type="text" className="w-1/4 h-8 rounded-sm rounded-r-none border" placeholder="enter house id" onChange={(e) => setSearh(e.target.value)}/>
          <button className="bg-white border h-8 rounded-sm rounded-l-none" onClick={handleSearch} >Search</button>
        </div>
      </div>
      
    </APIProvider>
  );
}
