import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Stack, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import Header from "../common/Header";
import TradesSummary from "./TradesSummary";
import TradesTable from "./TradesTable";

const AccountTrades = () => {
  const { id } = useParams();
  const [trades, setTrades] = useState([]);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradesData = async () => {
      try {
        setLoading(true);
        
        // Fetch account details
        const accountResponse = await axios.get(`http://localhost:3001/api/tradingAccount/${id}`);
        setAccount(accountResponse.data);
        
        // Fetch trades for this account
        const tradesResponse = await axios.get(`http://localhost:3001/api/tradingAccount/${id}/trades`);
        setTrades(tradesResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trades data:", err);
        setError("Failed to load trades. Please try again later.");
        setLoading(false);
      }
    };

    fetchTradesData();
  }, [id]);

  return (
    <>
      <Header />
      <Stack horizontalAlign="center" styles={{ root: { margin: '0 auto', maxWidth: '1200px', padding: '20px' } }}>
        {loading ? (
          <Spinner size={SpinnerSize.large} label="Loading trades data..." />
        ) : error ? (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {error}
          </MessageBar>
        ) : (
          <Stack tokens={{ childrenGap: 20 }}>
            <Stack.Item>
              <TradesSummary trades={trades} account={account} />
            </Stack.Item>
            <Stack.Item>
              <TradesTable trades={trades} />
            </Stack.Item>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default AccountTrades;