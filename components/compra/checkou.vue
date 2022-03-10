<template>
  <div class="w-full rounded-sm overflow-hidden shadow-lg">
    <div class="bg-current w-full">
      <p class="font-bold text-white text-2xl ml-3 py-2">PAGOS</p>
    </div>
    <div class="w-full  flex justify-center mt-1">
    <div class="w-5/6 px-1 mt-1 mb-5  ">
      <div >
        <div class="my-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
          Username
        </label>
          <input class="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombres">
        </div>
         <div class="my-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="correo">
          Correo Electronico:
        </label>
          <input class="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="correo" type="text" placeholder="Correo Electronico">
        </div>
        <div  class="bg-white border-current mt-2">
          <div ref="card"></div>
        </div>
        <button  @click="handleSubmit" type="button" class="text-white w-full bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700">PAY NOW</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
const style = {
  base: {
    color: "#32325d",
    lineHeight: "28px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "18px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};
import { loadStripe } from "@stripe/stripe-js/pure";
import { mapGetters } from "vuex";
import PaymentApi from '~/apis/PaymentApi'
export default {
  data() {
    return {
      stripe: undefined,
      elements: undefined,
      card: undefined,
      button:undefined
    };
  },
  mounted() {
    this.setStrip();
  },
  methods: {
    async setStrip() {
      const stripePromise = await loadStripe(
        "pk_test_51KbDh5LcrhAuEwlWTbDIctfiqwlrBMcSnCrfKwEggXa38WI1RAS621VZPXWFuse2e3pb5yIRRTZFzAucbyMeJiXJ00lUsJylT4"
      );
      this.stripe = stripePromise;

      (this.elements = this.stripe.elements()),
        (this.card = this.elements.create("card", {style:style}));
      this.card.mount(this.$refs.card);
    },
    async handleSubmit(e) {
          e.preventDefault()
          const response = await PaymentApi.post(
            `orders`,
            {
              cartDetail: this.getCart,
              cartTotal: this.getCartTotal.toFixed(2),
            }
          ).catch(c=>{
            console.log(c)
          })
          const stripePromise = loadStripe(process.env.stripe_key)
          const session = response
          const stripe = await stripePromise
          console.log(session)
           const result = await stripe.redirectToCheckout({
             sessionId: session.data.id ,
           })
    }
  },
  computed: {
    ...mapGetters(["getCart", "getCartTotal"])
  }
};
</script>
<style>
</style>