import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import axios from "axios";

// Component for creating a new strategy
const CreateStrategyForm = ({ onStrategyCreated }) => {
    const nameRef = useRef();
    const urlRef = useRef();
    const parametersRef = useRef();
    const [skipChecksTakeTrade, setSkipChecksTakeTrade] = useState(false);
    const [error, setError] = useState("");

    function hasText(e) {
        if (e.target.value !== "")
            e.target.classList.add('hasText')
        else
            e.target.classList.remove('hasText')
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        axios.post('http://localhost:3001/api/strategy', {
            name: nameRef.current.value,
            url: urlRef.current.value,
            parameters: parametersRef.current.value,
            skipChecksTakeTrade: skipChecksTakeTrade
        })
        .then(function (response) {
            if (response.status === 201) {
                onStrategyCreated(response.data);
                nameRef.current.value = "";
                urlRef.current.value = "";
                parametersRef.current.value = "";
                setSkipChecksTakeTrade(false);
                nameRef.current.classList.remove('hasText');
                urlRef.current.classList.remove('hasText');
                parametersRef.current.classList.remove('hasText');
            }
        })
        .catch(function (error) {
            setError("Error creating strategy");
            console.log(error);
        });
    }

    return (
        <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
            <div className="hybrid-login-form-main">
                <h1>Create Strategy</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form method="post" className="login-form" onSubmit={handleSubmit}>
                    <div className="nfInput nfPasswordInput login-input login-input-password">
                        <div className="nfInputPlacement">
                            <div className="nfPasswordControls">
                                <label className="input_id" placeholder="">
                                    <input type="text" className="nfTextField" onChange={hasText} ref={nameRef} tabIndex="0" />
                                    <label className="placeLabel">Name</label>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="nfInput nfPasswordInput login-input login-input-password">
                        <div className="nfInputPlacement">
                            <div className="nfPasswordControls">
                                <label className="input_id" placeholder="">
                                    <input type="text" className="nfTextField" onChange={hasText} ref={urlRef} tabIndex="1" />
                                    <label className="placeLabel">URL</label>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="nfInput nfPasswordInput login-input login-input-password">
                        <div className="nfInputPlacement">
                            <div className="nfPasswordControls">
                                <label className="input_id" placeholder="">
                                    <input type="text" className="nfTextField" onChange={hasText} ref={parametersRef} tabIndex="2" />
                                    <label className="placeLabel">Parameters</label>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-check mb-3">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="skipChecksTakeTrade"
                            checked={skipChecksTakeTrade}
                            onChange={(e) => setSkipChecksTakeTrade(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="skipChecksTakeTrade">Skip Checks Take Trade</label>
                    </div>
                    
                    <button className="btn login-button btn-submit btn-small" type="submit" autoComplete="off" tabIndex="3">Create Strategy</button>
                </form>
            </div>
        </div>
    );
};


export default CreateStrategyForm;
