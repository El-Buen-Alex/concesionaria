export const state = () => ({
    allProducts: [],
    categories:[],
    featuredProducts: [],
    cartItems: [],
    vehiculoSelected:[],
    canPersonalice:false,
    CanSeeResumen:false,
    CanComprar:false,
})
export const getters = {
    allProducts: (state) => state.allProducts,
    featuredProducts: (state) => state.featuredProducts,
    getCart: (state) => state.cartItems,
    getCartTotal: (state) =>
      state.cartItems.length < 1
        ? '0'
        : state.cartItems
            .map((el) => +el.precio )
            .reduce((a, b) => a + b),
    vehiculoSelected:(state)=>state.vehiculoSelected,
    categories:(state)=>state.categories,
    CanPersonalice:(state)=>state.canPersonalice,
    CanSeeResumen:(state)=>state.CanSeeResumen,
    CanComprar:(state)=>state.CanComprar,
}
export const actions = {
    async addItemToCart({ commit }, cartItem) {
      await commit('setCartItem', cartItem)
    },
    async deleteCartItem({ commit }, id) {
      await commit('removeCartItem', id)
    },
}

export const mutations = {
    setProducts: (state, products) => (state.allProducts = products),
    setFeaturedProducts: (state, products) => (state.featuredProducts = products),
    setCartItem: (state, item) => state.cartItems.push(item),
    removeCartItem: (state, id) =>
      state.cartItems.splice(
        state.cartItems.findIndex((el) => el.id === id),
        1
      ),
      setVehiculoSelected:(state, vehiculo)=>(state.vehiculoSelected=vehiculo),
    setCategories:(state, categories)=>(state.categories=categories),
    setCanPersonalice:(state, canPersonalice)=>(state.canPersonalice=canPersonalice),
    setCanSeeResumen:(state, CanSeeResumen)=>(state.CanSeeResumen=CanSeeResumen),
    SetCanComprar:(state, CanComprar)=>(state,CanComprar=CanComprar)
  }
