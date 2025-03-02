import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import axios from "axios";

const Account = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tradingAccount');
            setAccounts(response.data);
        } catch (error) {
            console.error("Error fetching trading accounts:", error);
        }
    };

    const handleAccountCreated = (newAccount) => {
        setAccounts([...accounts, newAccount]);
    };

    return (
        <>
            <Header />
            <div className="container-medium">
                <div className="login-wrapper hybrid-login-wrapper">
                    <CreateTradingAccountForm onAccountCreated={handleAccountCreated} />
                    <TradingAccountsTable accounts={accounts} />
                </div>
            </div>
        </>
    );
};

export default Account;
