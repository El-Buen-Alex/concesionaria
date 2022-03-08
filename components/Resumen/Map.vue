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
    ...mapGetters(["concesionariosList"]),
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