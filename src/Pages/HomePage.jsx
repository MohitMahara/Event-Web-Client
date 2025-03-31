import React from "react";
import { Layout } from "../Components/Layout/Layout";
const HomePage = () =>{
    return<>
        <Layout>
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-3xl">Events</h1>
                <p>Explore variety of events happening in msi.</p> 
            </div>
            
        </Layout>
    </>
}

export default HomePage;