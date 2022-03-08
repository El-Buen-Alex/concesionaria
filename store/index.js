export const state = () => ({
    allProducts: [],
    featuredProducts: [],
    cartItems: [],
    categories:[],
    vehiculoSelected:[],
    motorSelected:[],
    paqueteSelected:[],
    traccionSelected:[],
    transmisionSelected:[],
    canPersonalice:false,
    CanSeeResumen:false,
    CanComprar:false,
    isSetDefault:false,
    motores:[],
    transmisiones:[],
    paquetes:[],
    paqueteDetalle:[],
    motorDetalle:[],
    tracciones:[],
    traccionDetalle:[],
    mapaBox:[],
    marksers:[],
    concesionariosList:[],
})
export const getters = {
    allProducts: (state) => state.allProducts,
    featuredProducts: (state) => state.featuredProducts,
    getCart: (state) => state.cartItems,
    getCartTotal: (state) =>
      state.cartItems.length < 1
        ? '0'
        : state.cartItems
            .map((el) => el.precio )
            .reduce((a, b) => a + b),
    vehiculoSelected:(state)=>state.vehiculoSelected,  
    categories:(state)=>state.categories,
    CanPersonalice:(state)=>state.canPersonalice,
    CanSeeResumen:(state)=>state.CanSeeResumen,
    CanComprar:(state)=>state.CanComprar,
    motores:(state)=>state.motores,
    transmisiones:(state)=>state.transmisiones,
    transmisionSelected:(state)=>state.transmisionSelected,
    paquetes:(state)=>state.paquetes,
    paqueteDetalle:(state)=>state.paqueteDetalle,
    motorDetalle:(state)=>state.motorDetalle,
    tracciones:(state)=>(state.tracciones),
    traccionDetalle:(state)=>(state.traccionDetalle),
    motorSelected:(state)=>(state.motorSelected),
    paqueteSelected:(state)=>(state.paqueteSelected),
    traccionSelected:(state)=>(state.traccionSelected),
    isSetDefault:(state)=>(state.isSetDefault),
    mapaBox:(state)=>state.mapaBox,
    markers:(state)=>state.markers,
    concesionariosList:(state)=>state.concesionariosList
}
export const actions = {
    async addItemToCart({ commit }, {cartItem, campo}) {
      cartItem.idUnique=cartItem.id+campo
      await commit('setCartItem', cartItem)
    },
    async deleteCartItem({ commit }, id) {
      await commit('removeCartItem', id)
    },
    
}

export const mutations = {
    setProducts: (state, products) => (state.allProducts = products),
    setFeaturedProducts: (state, products) => (state.featuredProducts = products),
    setCart:(state, cartItem)=>(state.cartItems=cartItem),
    setCartItem: (state, item) => {
      const carro=state.cartItems
      carro.push(item)
      if(process.client){
        localStorage.setItem("cartItem", JSON.stringify(carro))
      }
    },
    removeCartItem: (state, id) =>
      state.cartItems.splice(
        state.cartItems.findIndex((el) => el.idUnique == id),
        1
      ),
    setCategories:(state, categories)=>(state.categories=categories),
    setVehiculoSelected:(state, vehiculo)=>(state.vehiculoSelected=vehiculo),
    setCanPersonalice:(state, canPersonalice)=>(state.canPersonalice=canPersonalice),
    setCanSeeResumen:(state, CanSeeResumen)=>(state.CanSeeResumen=CanSeeResumen),
    SetCanComprar:(state, CanComprar)=>(state.CanComprar=CanComprar),
    setMotores:(state, motores)=>(state.motores=motores),
    setTransmisiones:(state, transmisiones)=>(state.transmisiones=transmisiones),
    setPaquetes:(state, paquetes)=>(state.paquetes=paquetes),
    setPaqueteDetalle:(state, paqueteDetalle)=>(state.paqueteDetalle=paqueteDetalle),
    setMotorDetalle:(state, motorDetalle)=>(state.motorDetalle=motorDetalle),
    setTracciones:(state, traccion)=>(state.tracciones=traccion),
    setTraccionDettale:(state, traccionDetalle)=>(state.traccionDetalle=traccionDetalle),
    setMotorSelected:(state, motorSelected)=>(state.motorSelected=motorSelected),
    setPaqueteSelected:(state, paqueteSelected)=>(state.paqueteSelected=paqueteSelected),
    setTraccionSelected:(state, traccionSelected)=>(state.traccionSelected=traccionSelected),
    setTransmisionSelected:(state, transmisionSelected)=>(state.transmisionSelected=transmisionSelected),
    setIsSetDefault:(state, isSetDefault)=>(state.isSetDefault=isSetDefault),
    setMapa:(state, mapaBox)=>(state.mapaBox=mapaBox),
    setConcesionarios:(state, concesionariosList)=>(state.concesionariosList=concesionariosList)
  }
