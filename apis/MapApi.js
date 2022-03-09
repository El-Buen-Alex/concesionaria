import axios from 'axios'

const directionsApi=axios.create({
    baseURL:'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives:false,
        geometries:'geojson',
        overview:'simplified',
        steps:false,
        access_token:'pk.eyJ1IjoiZWwtYnVlbi1hbGV4IiwiYSI6ImNsMGhheTFoZjA2djUzaHFkdmc2OTB3a2wifQ.Yk_oRaEbkvuakyd6RH4YyQ'
    }
})
export default directionsApi