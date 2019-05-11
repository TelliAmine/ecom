import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct, // we wcan use reference
    cart:[]
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempproducts = [];
    storeProducts.map(item => {
      const singleItem = { ...item }; // copy the value from the object
      tempproducts = [...tempproducts, singleItem];
    });
    this.setState(() => {
      return { products: tempproducts };
    });
  };
  
   getItem=(id)=>{
     const productget=this.state.products.find(item=>item.id===id);
     return productget
   }

  handleDetail = (id) => {
  const product=this.getItem(id);
  this.setState(()=>{
    return{detailProduct:product}

  })

  };
  addToCart = id => {
   let tempProducts=[...this.state.products] ;
   const index=tempProducts.indexOf(this.getItem(id)); 
   const product=tempProducts[index];
   product.inCart=true;
   product.count=1;
   const price =product.price;
   product.total=price;
   this.setState(
     ()=>{
  return{products:tempProducts,cart:[...this.state.cart,product]}
     },()=>{console.log(this.state)}
   )
  };
  // tester = () => {
  //   console.log("State products", this.state.products[0].inCart);
  //   console.log("Data products", storeProducts[0].inCart);
  //   const tempProducts = [...this.state.products];
  //   tempProducts[0].inCart = true;
  //   this.setState(
  //     () => {
  //       return { products: tempProducts };
  //     },
  //     () => {
  //       console.log("State products", this.state.products[0].inCart);
  //       console.log("Data products", storeProducts[0].inCart);
  //     }
  //   );
  // };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
