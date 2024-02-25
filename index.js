import ProductModal from "./ProductModal.js"

const {createApp, ref, onMounted} = Vue

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate
const { required, email, min, max } = VeeValidateRules
const { localize, loadLocaleFromURL } = VeeValidateI18n

const URL = 'https://ec-course-api.hexschool.io/v2'
const PATH = 'ryann'

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


/*
{
  "category": "電動車",
  "id": "-NrUev4BtEWWs1xTTetU",
  "imageUrl": ,
  "is_enabled": 1,
  "num": 1,
  "origin_price": 29999999999,
  "price": 199,
  "title": "Model X",
  "unit": "輛"
},
*/
const app = createApp({
  setup() {
    const products = ref([])
    const cart = ref([])
    const tempProduct = ref({})
    const productModal = ref(null)

    async function getProducts() {
      try {
        const res = await axios.get(`${URL}/api/${PATH}/products`)
        console.log(res.data)
        products.value = res.data.products
      } catch(err) {

      }
    }

    function openModal(product) {
      tempProduct.value = product
      productModal.value.openModal()
    }

    onMounted(() => {
      getProducts()
    })

    return {
      cart,
      products,
      tempProduct,
      productModal,
      getProducts,
      openModal,
    }
  }
})

app.component('product-modal', ProductModal)
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app')