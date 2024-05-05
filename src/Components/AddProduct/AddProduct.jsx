import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product=productDetails;
  
    let formData = new FormData();
    formData.append('product',image);
  
    await fetch ('http://localhost:4000/upload',{
      method:'Post',
      headers:{
        Accept:'application/json',
      },
      body:formData,
  
    }).then((resp)=>resp.json()).then((data)=>(responseData=data))
  
    console.log(responseData); // Log the response data

  if(responseData.success){
    product.image = responseData.image_url;
    console.log(product); // Log the product object

    await fetch('http://localhost:4000/addproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-type':'application/json',
      },
      body:JSON.stringify(product),
    }).then((resp)=>resp.json()).then((data)=>{
      console.log(data); // Log the response from the server
      data.success?alert("Product Added"):alert("Failed")
    })
  }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Tittle</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type Here"
            />
          </div>
        </div>
      </div>
      <div className="addproduct-temfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="Women">Women</option>
          <option value="men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={() => { Add_Product() }} className="addproduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;