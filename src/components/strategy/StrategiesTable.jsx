import React, { useRef, useState, useEffect } from "react";
import Header from "../common/Header";
import axios from "axios";


// Component for displaying strategies in a table
const StrategiesTable = ({ strategies }) => {
    if (!strategies || strategies.length === 0) {
        return (
            <div className="mt-4">
                <h2>Strategies</h2>
                <p>No strategies found.</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h2>Strategies</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Parameters</th>
                        <th>Skip Checks</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {strategies.map((strategy) => {
                        const id = strategy._id.$oid || strategy._id;
                        const createdAt = strategy.createdAt && strategy.createdAt.$date
                            ? new Date(parseInt(strategy.createdAt.$date.$numberLong)).toLocaleDateString()
                            : "N/A";
                            
                        return (
                            <tr key={id}>
                                <td>{strategy.Name}</td>
                                <td>{strategy.Url}</td>
                                <td>{strategy.Parameters}</td>
                                <td>{strategy.SkipChecksTakeTrade ? "Yes" : "No"}</td>
                                <td>{createdAt}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StrategiesTable;
