<template>
  <div id="map" class="w-full h-96 overflow-hidden position:static"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      access_token:
        "pk.eyJ1IjoiZWwtYnVlbi1hbGV4IiwiYSI6ImNsMGhheTFoZjA2djUzaHFkdmc2OTB3a2wifQ.Yk_oRaEbkvuakyd6RH4YyQ",
      mapa: undefined,
      center: {},
      longitud: 0,
      latitud: 0,
      marker: {},
      isMapSet: false,
      markers: [],
    };
  },
  created() {},

  mounted() {
    this.prntLocations();
  },
  methods: {
    moveMapTo(longitud, latitud){
      this.mapa.flyTo({
        center:[longitud, latitud],
        zoom:14
      })
    },
    drawRoute(destino, fullRoutePoints){
      const start=fullRoutePoints[0]
      const end= fullRoutePoints[fullRoutePoints.length - 1]
      const bounds = new mapboxgl.LngLatBounds([start[0], start[1]], [start[0], start[1]])
      //agregamos punto a cada bound-borde
      fullRoutePoints.forEach(coordenada=>{
        const newCoord=[coordenada[0], coordenada[1]]
        bounds.extend(newCoord)
      })
      //mostrando en el map
      this.mapa.fitBounds(bounds,{
        padding:300
      })
      //Polyline 
      const sourceData={
         type:'geojson',
         data:{
           type:'FeatureCollection',
           features:[
             {
               type:'Feature',
               properties:{},
               geometry:{
                 type:'LineString',
                 coordinates:fullRoutePoints
               }
             }
           ]
         }
      };
      if(this.mapa.getLayer('RouteString')){
        this.mapa.removeLayer('RouteString')
        this.mapa.removeSource('RouteString')
      }
      this.mapa.addSource('RouteString', sourceData)
      this.mapa.addLayer({
        id:'RouteString',
        type:'line',
        source:'RouteString',
        layout:{
          'line-cap':'round',
          'line-join':'round'
        },
        paint:{
          'line-color':'#3bb2d0',
          'line-width':3
        }
      });

      console.log("que raro")
    },
    async prntLocations() {
      await this.setCenter().then(() => {
         this.createMap().then(() => {
           this.createMarkersofConcesionarios()
        });
      });
    },
    async setCenter() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.longitud = position.coords.longitude;
          this.latitud = position.coords.latitude;
          const ubication=[]
          ubication.push(this.longitud)
          ubication.push(this.latitud)
          this.$store.commit("setUbicacionUser", ubication)
          return resolve(true);
        });
      });
    },
    createMarkersofConcesionarios() {
      this.concesionariosList.forEach((concesionario) => {
        this.createMarkerAgencyElement(concesionario)
      });
    },
    createMarkerAgencyElement(concesionario){
      const el = document.createElement('div');
      const width = 45;
      const height = 45;
      el.className = 'bg-gray-50 rounded-full';
      el.style.backgroundImage = "url('../../carro.png')";
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';
      const divPadre=document.createElement("div")
      divPadre.className="  w-12 h-12 "
      divPadre.appendChild(el)

      this.markers.push(
          new mapboxgl.Marker(divPadre).setLngLat([
            concesionario.longitud,
            concesionario.latitud,
          ]).addTo(this.mapa)
        );
    },
    async createMap() {
      return new Promise((resolve, reject) => {
        mapboxgl.accessToken = this.access_token;
        this.mapa = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/dark-v10",
          zoom: 9,
          center: [this.longitud, this.latitud],
        });
        this.mapa.addControl(new mapboxgl.NavigationControl());
        this.mapa.addControl(new mapboxgl.FullscreenControl());
        this.mapa.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          })
        );
        this.marker = new mapboxgl.Marker()
          .setLngLat([this.longitud, this.latitud])
          .addTo(this.mapa);
         resolve(true);
      });
    },
  },
  computed: {
    ...mapGetters(["concesionariosList", "ubicacionUser"]),
  },
};
</script>

<style scoped>
.marker {
display: block;
border: none;
border-radius: 50%;
cursor: pointer;
padding: 0;
}
</style>