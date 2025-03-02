import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import axios from "axios";

// Component for displaying trading accounts in a table
const TradingAccountsTable = ({ accounts }) => {
    if (!accounts || accounts.length === 0) {
        return (
            <div className="mt-4">
                <h2>Trading Accounts</h2>
                <p>No trading accounts found.</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h2>Trading Accounts</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Strategies</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account._id.$oid || account._id}>
                            <td>{account.Name}</td>
                            <td>
                                {account.Strategies && account.Strategies.map((strategy, index) => {
                                    // Handle different strategy data formats
                                    const strategyName = strategy.Name || 
                                        (typeof strategy === 'object' && strategy.$oid ? strategy.$oid : strategy);
                                    return (
                                        <span key={index}>
                                            {strategyName}
                                            {index < account.Strategies.length - 1 ? ', ' : ''}
                                        </span>
                                    );
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradingAccountsTable;
