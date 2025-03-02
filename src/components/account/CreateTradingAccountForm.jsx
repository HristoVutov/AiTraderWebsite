import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import axios from "axios";

// Component for creating a new trading account
const CreateTradingAccountForm = ({ onAccountCreated }) => {
    const nameRef = useRef();
    const [error, setError] = useState("");

    function hasText(e) {
        if (e.target.value !== "")
            e.target.classList.add('hasText')
        else
            e.target.classList.remove('hasText')
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        axios.post('http://localhost:3001/api/tradingAccount', {
            name: nameRef.current.value
        })
        .then(function (response) {
            if (response.status === 201) {
                onAccountCreated(response.data);
                nameRef.current.value = "";
                nameRef.current.classList.remove('hasText');
            }
        })
        .catch(function (error) {
            setError("Error creating trading account");
            console.log(error);
        });
    }

    return (
        <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
            <div className="hybrid-login-form-main">
                <h1>Create Trading Account</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form method="post" className="login-form" onSubmit={handleSubmit}>
                    <div className="nfInput nfPasswordInput login-input login-input-password">
                        <div className="nfInputPlacement">
                            <div className="nfPasswordControls">
                                <label className="input_id" placeholder="">
                                    <input type="text" className="nfTextField" onChange={hasText} ref={nameRef} tabIndex="0" />
                                    <label className="placeLabel">Account Name</label>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className="btn login-button btn-submit btn-small" type="submit" autoComplete="off" tabIndex="0">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTradingAccountForm;
