import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import Loading from "./Loading";
import { API } from "../backend";
import axios from "axios"

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    
    document.title = "Eccomt.in";

    const preload = async () => {
        setLoading(true)
        const result = await axios.get(`${API}/products`)
        setProducts(result.data)
        setLoading(false)
        // getProducts().then(data => {
        //     if(data.error){
        //         setError(data.error)
        //     }else{
        //         setProducts(data)
                
        //     }
        // }).then(setLoading(false))
        
        
       
    }

    useEffect( () => {
        preload()
    }, [])


    return (
        <Base>
            {loading && (<Loading type="bubbles" color="#2874A6"/>)}
           <div className="section">
            <div className="cards">
               {products.map( (product, index) => (
                   <Card product={product} key={index}/>
               ))} 
            </div>
        </div>
        </Base>
    )
}

export default Home