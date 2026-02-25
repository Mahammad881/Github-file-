import React,{useState} from "react"; 
 
function App(){ 
  const[product,setProduct]=useState({ 
    name:"", 
    price:"", 
    category:"", 
    description:"" 
}); 
const[store,setStore]=useState([]); 
  
const handleChange=(e)=>{ 
  const {name,value}=e.target; 
  setProduct({...product,[name]:value}); 
   
} 
 
const handleSubmit=(e)=>{ 
  e.preventDefault(); 
 
  if(product.name===""|| 
    product.price===""|| 
    product.category===""|| 
    product.description===""){ 
      alert("fill form correctly"); 
      return; 
    } 
 
    setStore([...store,{...product}]); 
    setProduct({ 
       name:"", 
    price:"", 
    category:"", 
    description:"" 
}); 
} 
return( 
  <div style={{ 
     alignItems: "center", 
     justifyContent:"center", 
     textAlign:"center", 
     
      
      border:"5px inset black", 
      margin:"center", 
      borderWidth:"300px" 
 
      
  }}> 
    <h1>Product form</h1> 
    <label><b>Name:</b></label> 
    <input  
    name="name" 
    value={product.name} 
    onChange={handleChange} 
    /><br></br><br></br> 
 
 
    <label><b>Price:</b></label> 
    <input  
    name="price" 
    value={product.price} 
    onChange={handleChange} 
    /><br></br><br></br> 
 
    <label><b>Category:</b></label> 
    <input  
    name="category" 
    value={product.category} 
    onChange={handleChange} 
    /><br></br><br></br> 
 
    <label><b>Description:</b></label> 
    <input  
    name="description" 
    value={product.description} 
    onChange={handleChange} 
    /><br></br><br></br> 
 
    <button onClick={handleSubmit} 
    style={{margin:"5px",backgroundColor:"lightBlue"}}>Save</button> 
 
    {store.length>0 &&( 
      <div style={{ 
        border:"3px inset green", 
        margin:"50px" 
      }}> 
 
        <h2><b><u>Products List</u></b></h2> 
      {store.map((all,index)=>( 
        <div key={index} 
        style={{border:"2px inset black",margin:"30px"}}> 
          <p><strong>Name:</strong>{all.name}</p> 
          <p><strong>Price:</strong>{all.price}</p> 
          <p><strong>Category:</strong>{all.category}</p> 
          <p><strong>Description:</strong>{all.description}</p> 
          </div> 
          ))} 
      </div>)} 
  </div> 
   
); } export default App;