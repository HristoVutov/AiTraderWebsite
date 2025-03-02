import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import "../../assets/style/login.css";
import axios from "axios";

const Account = () => {
    const nameRef = useRef();
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    console.log("Start")
    // Function to handle text input changes
    function hasText(e) {
        if (e.target.value !== "")
            e.target.classList.add('hasText')
        else
            e.target.classList.remove('hasText')
    }

    // Function to handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // Validate input
        if (!nameRef.current.value.trim()) {
            setError("Account name cannot be empty");
            return;
        }

        // Make API call to create new trading account
        axios.post('http://localhost:3001/api/tradingAccount', {
            name: nameRef.current.value
        })
        .then(function (response) {
            if (response.status === 201) {
                setSuccessMessage("Trading account created successfully!");
                
                // Add the new account to the list
                const newAccount = response.data;
                setAccounts(prevAccounts => [...prevAccounts, newAccount]);
                
                // Clear the form
                nameRef.current.value = "";
                nameRef.current.classList.remove('hasText');
            }
        })
        .catch(function (error) {
            setError("Failed to create trading account: " + (error.response?.data?.message || error.message));
            console.error("Error creating trading account:", error);
        });
    }

    // Fetch existing trading accounts on component mount
    useEffect(() => {
        let isSubscribed = true;

        async function fetchAccountsData() {
            try {
                const response = await axios.get('http://localhost:3001/api/tradingAccount');
                const accountsData = await response.data;
                
                if (isSubscribed) {
                    setAccounts(accountsData);
                }
            } catch (error) {
                console.error("Error fetching trading accounts:", error);
                if (isSubscribed) {
                    setError("Failed to load trading accounts");
                }
            }
        }

        fetchAccountsData();

        return () => { isSubscribed = false; };
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="login-wrapper hybrid-login-wrapper">
                            <div className="login-content login-form hybrid-login-form hybrid-login-form-signup" data-uia="login-page-container">
                                <div className="hybrid-login-form-main">
                                    <h1 data-uia="login-page-title">Create Trading Account</h1>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                    <form method="post" className="login-form" onSubmit={handleSubmit}>
                                        <div className="nfInput nfPasswordInput login-input login-input-password">
                                            <div className="nfInputPlacement">
                                                <div className="nfPasswordControls">
                                                    <label className="input_id" placeholder="">
                                                        <input type="text" className="nfTextField" onChange={hasText} ref={nameRef} />
                                                        <label className="placeLabel">Account Name</label>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn login-button btn-submit btn-small" type="submit">Create Account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Trading Accounts</h2>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Strategies</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accounts.length > 0 ? (
                                            accounts.map((account) => (
                                                <tr key={account._id}>
                                                    <td>{account.Name}</td>
                                                    <td>
                                                        {account.Strategies && account.Strategies.length > 0 ? (
                                                            account.Strategies.map((strategy, index) => (
                                                                <span key={index}>
                                                                    {strategy.Name || strategy}
                                                                    {index < account.Strategies.length - 1 ? ', ' : ''}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span>No strategies assigned</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center">No trading accounts found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;