import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import axios from "axios";


const Strategy = () => {
    const [strategies, setStrategies] = useState([]);

    useEffect(() => {
        fetchStrategies();
    }, []);

    const fetchStrategies = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/strategy');
            setStrategies(response.data);
        } catch (error) {
            console.error("Error fetching strategies:", error);
        }
    };

    const handleStrategyCreated = (newStrategy) => {
        setStrategies([...strategies, newStrategy]);
    };

    return (
        <>
            <Header />
            <div className="container-medium">
                <div className="login-wrapper hybrid-login-wrapper">
                    <CreateStrategyForm onStrategyCreated={handleStrategyCreated} />
                    <StrategiesTable strategies={strategies} />
                </div>
            </div>
        </>
    );
};

export default Strategy;
