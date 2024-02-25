const {ref, onMounted} = Vue
// import { ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export default {
  props: ['product'],
  template: `
    <div ref="productModalRef" class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div v-if="product.imageUrl" class="col-sm-6">
                <img class="img-fluid" :src="product.imageUrl" alt="">
              </div>
              <div v-else class="col-sm-6">
                <img class="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVYS7KEXYFAwqdRCW81e4DSR_nSLYSFStx1Q&usqp=CAU" alt="">
              </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{  }}</span>
                <p>商品描述：{{ product.content }}</p>
                <p>商品內容：{{ product.description
                }}</p>
                <div v-if="product.origin_price === product.price" class="h5">{{ product.price }} 元</div>
                  <div v-else>
                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ product.price }} 元</div>
                  </div>
                <div>
                  <div class="input-group">
                    <input type="number" class="form-control"
                            min="1">
                    <button type="button" class="btn btn-primary">
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
              <!-- col-sm-6 end -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup(props) {
    const productModalRef = ref(null)
    let productModal

    function openModal() {
      productModal.show()
    }

    function closeModal() {
      productModal.hide()
    }

    onMounted(() => {
      productModal = new bootstrap.Modal(productModalRef.value)
    })

    return {
      productModalRef,
      openModal,
      closeModal
    }
  }
}