<template>
    <section class="checkout-seciton cart-group">
        <h3>{{orderInfo.shopInfo.name}}</h3>
        <ul>
            <li v-for="(food,index) in orderInfo.selectFoods" :key="index">
                <img :src="food.image_path" alt="">
                <div class="cart-group-info">
                    <span>{{food.name}}</span>
                    <span>x{{food.count}}</span>
                    <span>{{food.activity.fixed_price}}</span>
                </div>
            </li>
            <li class="cart-group-total">
                <div>配送费</div>
                <div>￥{{orderInfo.shopInfo.float_delivery_fee}}</div>
            </li>
            <li class="cart-group-total">
                <div class="discounts"></div>
                <div class="subtotal">
                    <span>小计</span>
                    <span class="price">{{totalPrice}}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name:"cartgroup",
    props: {
        orderInfo:Object,
        totalPrice:Number
    }
}
</script>

<style scoped>
.cart-group{
    background-color: #fff;
    padding: 0 3vw 0 0;
}
.cart-group h3{
    font-size: 1.1rem;
    font-weight: bold;
    padding:1rem 0 0 1rem;
    float: left;
    padding-bottom:2rem;

}
.cart-group >ul>li>img{
    width: 12vw;
    height: 12vw;
}
.cart-group >ul>li{
    display: flex;
    clear: both;
    border-bottom: #eee;
    margin: 1rem 0 1rem 1rem;
    align-items: center;
}
.cart-group-info{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    align-items: center;
    margin-left: 2.133333vw;
    /* margin-right: 4vw; */
    flex: 9;
}
.cart-group-total {
  justify-content: space-between;
  padding: 4vw 0 4.8vw 2vw!important;
}
.discounts {
  color: #bbb;
}
.subtotal .price {
  font-size: 1.5rem;
  font-weight: 500;
}

</style>