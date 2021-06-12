import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "../admin/helper/adminapicall"
import Loading from "./Loading";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    
    document.title = "Eccomt.in";

    const preload = async () => {
        setLoading(true)
        await getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
                
            }
        }).then(setLoading(false))
        
       
    }

    useEffect( () => {
        preload()
    }, [])


    return (
        <Base>
            {loading && (<Loading type="spin" color="black"/>)}
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