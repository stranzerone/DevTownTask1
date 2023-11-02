import axios from "axios"

export const FetchProductDetails= async()=>{
try{
const product = await axios.get("https://dummyjson.com/products");

console.log(product)
if(product){
  
 
    return product.data.products;
}else{
    console.log('no products found')
}
}catch(error){
    console.error(error)
}



}