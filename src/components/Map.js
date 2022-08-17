// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   HStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text,
// } from '@chakra-ui/react'

import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {Skeleton, Button, Space, Row, Typography} from "antd"

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api'

import { useRef, useState, useEffect } from 'react'
import {GOOG_API_KEY2} from "../constants";
const { Text } = Typography;
const center = { lat: 34.098907, lng: -118.327759 }

// const origin = 'Manhattan Beach Pier';
// const destination = 'Los Angeles County Museum of Art' ;

// const waypoints = [
//   {
//     location: '100 Universal City Plaza, Universal City',
//     stopover: true
//   },
//   {
//     location: 'Griffith Observatory',
//     stopover: true
//   },
//   {
//     location: 'Venice Canals',
//     stopover: true
//   }
// ];

function Map({data,keys}) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyAcjpLjt1AYE2fWbwbrto8ToyvLIU33teI",
  //   libraries: ['places'],
  // })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOG_API_KEY2,
  })
  
  
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [origin, setOrigin] = useState(center);
  const [destination, setDestination] = useState(center);
  const [waypoints, setWaypoints] = useState([]);

    /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  useEffect(() => {
    let newWaypoints = [];
    console.log(data);
    console.log("keys");
    console.log(keys);
    for (let i=0;i<keys.length;i++) {
      const item = data.filter( entry => {
        return entry.key === keys[i];
      });
      newWaypoints[i]={
        // location: {lat: item[0].latitude, lng: item[0].longitude},
        location: {lat: item[0].detail.latitude, lng: item[0].detail.longitude},
        stopover: true,
      };
    }
    setWaypoints(newWaypoints);
    console.log("waypoints");
    console.log(waypoints);
  }, [keys])

  if (!isLoaded) {
    // return <SkeletonText />
    return <Skeleton.Image active={!isLoaded} />
  }

  async function calculateRoute() {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return
    // }
    if (origin === '' || destination === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      // origin: originRef.current.value,
      // destination: destiantionRef.current.value,
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      // driving mode 
      waypoints: waypoints,
      optimizeWaypoints: true,
    })

    setDirectionsResponse(results)
    // routes[0] return the first route
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    // <Flex
    //   position='relative'
    //   flexDirection='column'
    //   alignItems='center'
    //   h='76vh'
    //   w='38vw'
    // >
    //   <Box position='absolute' left={0} top={0} h='70%' w='100%'>
    //   <GoogleMap
    //     center={center}
    //     zoom={15}
    //     mapContainerStyle={{ width: '100%', height: '100%' }}
    //     options={{
    //       zoomControl: true,
    //       streetViewControl: true,
    //       mapTypeControl: true,
    //       fullscreenControl: true,
    //     }}
    //     onLoad={map => setMap(map)}
    //   >
    //     <Marker position={center} />
    //     {directionsResponse && (
    //       <DirectionsRenderer directions={directionsResponse} />
    //     )}
    //   </GoogleMap>  
    //   </Box>
    //   <Box
    //     p={1}
    //     borderRadius='md'
    //     m={1}
    //     bgColor='white'
    //     shadow='base'
    //     zIndex='1'
    //     position='absolute'
    //     top={0}
    //     right={0}
    //   >
    //     <HStack spacing={2} justifyContent='space-between'>
    //       <Box flexGrow={1}>
    //         <Autocomplete>
    //           <Input 
    //           type='text' 
    //           placeholder='Origin' 
    //           ref={originRef}
    //           />
    //         </Autocomplete>
    //       </Box>
    //       <Box flexGrow={1}>
    //         <Autocomplete>
    //           <Input
    //             type='text'
    //             placeholder='Destination'
    //             ref={destiantionRef}
    //           />
    //         </Autocomplete>
    //       </Box>

    //       <ButtonGroup>
    //         <Button colorScheme='red' type='submit' onClick={calculateRoute}>
    //           Calculate Route
    //         </Button>
    //         <IconButton
    //           aria-label='center back'
    //           icon={<FaTimes />}
    //           onClick={clearRoute}
    //         />
    //       </ButtonGroup>

    //     </HStack>
    //     <HStack spacing={1} mt={1} justifyContent='space-between'>
    //       <Text>Distance: {distance} </Text>
    //     </HStack>
    //     <HStack spacing={1} mt={1} justifyContent='space-between'>
    //       <Text>Duration: {duration} </Text>
    //       <IconButton
    //       aria-label='center back'
    //       icon={<FaLocationArrow />}
    //       isRound
    //       onClick={() => {
    //         // auto center when click
    //         map.panTo(center)
    //         map.setZoom(15)
    //       }}
    //       />
    //     </HStack>
    //   </Box>
    // </Flex>
    <>
    <GoogleMap
    center={center}
    zoom={15}
    mapContainerStyle={{ width: '100%', height: '100%' }}
    options={{
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      fullscreenControl: true,
    }}
    onLoad={map => setMap(map)}
  >
    <Marker position={center} />
    {directionsResponse && (
      <DirectionsRenderer directions={directionsResponse} />
    )}
  </GoogleMap>  
  <table className="maptxt">
    <tr className="line">
      <td>
      <Button htmlType='submit' type='primary' danger onClick={calculateRoute}>
        Calculate Route
      </Button>
      </td>
      <td>
      <Button
          icon={<FaTimes />}
          onClick={clearRoute}
          shape='round'
      />
      </td>
    </tr>
    <tr className="line2">
    <Typography.Title
        level={4}
        style={{
          margin: 0,
        }}
    >
    Distance: {distance} 
    </Typography.Title>
    </tr>
    <tr className="line">
    <Typography.Title
      level={4}
      style={{
        margin: 0,
      }}
    >
    Duration: {duration}
    </Typography.Title>
      <Button
      icon={<FaLocationArrow />}
      shape='round'
      onClick={() => {
        map.panTo(center)
        map.setZoom(15)
      }}
      />
      </tr>
    </table>
  </>
  )
}

export default Map