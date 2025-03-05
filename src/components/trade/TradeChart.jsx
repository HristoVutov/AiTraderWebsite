import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createChart, LineSeries } from 'lightweight-charts';
import axios from "axios";
import {
  Stack,
  Text,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  IconButton,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  mergeStyleSets
} from '@fluentui/react';
import Header from "../common/Header";

const TradeChart = () => {
  const { tradeId } = useParams();
  const [indicatorData, setIndicatorData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Styles for the component
  const styles = mergeStyleSets({
    container: {
      display: 'flex',
      height: 'calc(100vh - 80px)',
      padding: '0 20px 20px',
    },
    chartContainer: {
      width: '90%',
      backgroundColor: '#f8f8f8',
      border: '1px solid #ddd',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sidePanel: {
      width: '10%',
      paddingLeft: '20px',
    },
    cardContainer: {
      maxWidth: '100%',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      border: '1px solid #edebe9',
      borderRadius: '2px',
    },
    cardHeader: {
      padding: '12px',
      cursor: 'pointer',
      borderBottom: isExpanded ? '1px solid #edebe9' : 'none',
    },
    cardContent: {
      padding: '16px',
      backgroundColor: 'white',
    },
    dataItem: {
      margin: '8px 0',
    },
    strength: {
      fontWeight: 'bold',
      fontSize: '16px',
    },
    positive: {
      color: 'green',
    },
    negative: {
      color: 'red',
    },
    neutral: {
      color: '#0078d4',
    },
    resultIndicator: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '8px',
    },
    chartPlaceholder: {
      textAlign: 'center',
      padding: '20px',
    }
  });

  useEffect(() => {
    const fetchIndicatorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/indicatorData/${tradeId}`);
        // We expect the response to be an array, but we'll handle just the first item
        setIndicatorData(response.data.length > 0 ? response.data[0] : null);
        setLoading(false);

        const chart = createChart('chartTV');
        const lineSeries = chart.addSeries(LineSeries);
        lineSeries.setData([
            { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 },
        ]);
      } catch (err) {
        console.error("Error fetching indicator data:", err);
        setError("Failed to load indicator data. Please try again later.");
        setLoading(false);
      }
    };

    fetchIndicatorData();
  }, [tradeId]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to get color for result type
  const getResultColor = (result) => {
    switch (result.toLowerCase()) {
      case 'long':
        return styles.positive;
      case 'short':
        return styles.negative;
      default:
        return styles.neutral;
    }
  };

  // Column definitions for the data table
  const columns = [
    {
      key: 'time',
      name: 'Time',
      fieldName: 'time',
      minWidth: 100,
      isResizable: true,
      onRender: (item) => {
        const date = new Date(item.time * 1000); // Convert Unix timestamp to JavaScript Date
        return <span>{date.toLocaleTimeString()}</span>;
      }
    },
    {
      key: 'result',
      name: 'Result',
      fieldName: 'result',
      minWidth: 70,
      isResizable: true,
      onRender: (item) => (
        <div>
          <span 
            className={getResultColor(item.result).root} 
            style={{ 
              backgroundColor: item.result.toLowerCase() === 'long' ? 'green' : 
                item.result.toLowerCase() === 'short' ? 'red' : 'blue',
              ...styles.resultIndicator
            }} 
          />
          <span>{item.result}</span>
        </div>
      )
    },
    {
      key: 'rsi',
      name: 'RSI',
      fieldName: 'rsi',
      minWidth: 70,
      isResizable: true,
      onRender: (item) => <span>{item.rsi.toFixed(2)}</span>
    }
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        {loading ? (
          <Spinner size={SpinnerSize.large} label="Loading chart data..." />
        ) : error ? (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {error}
          </MessageBar>
        ) : (
          <>
            {/* Main Chart Container */}
            <div className={styles.chartContainer}>z
              <div id="chartTV" style={{ width: '100%', height: '100%' }}>
            
              </div>
            </div>

            {/* Side Panel */}
            <div className={styles.sidePanel}>
              {indicatorData && (
                <Stack className={styles.cardContainer}>
                  <Stack 
                    onClick={toggleExpanded}
                    styles={{ root: styles.cardHeader }}
                  >
                    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                      <Text variant="mediumPlus">Indicator Data</Text>
                      <IconButton
                        iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        onClick={toggleExpanded}
                      />
                    </Stack>
                    
                    {/* Summary data (always visible) */}
                    <Stack tokens={{ padding: 10, childrenGap: 5 }}>
                      <Text className={styles.dataItem}>
                        Strategy: {indicatorData.StrategyName}
                      </Text>
                      <Text className={styles.dataItem}>
                        Strength: <span className={styles.strength}>
                          {indicatorData.Strength.toFixed(1)}
                        </span>
                      </Text>
                      <Text className={styles.dataItem}>
                        Data Points: {indicatorData.Data.length}
                      </Text>
                      {indicatorData.Data.length > 0 && (
                        <Text className={styles.dataItem}>
                          Last Result: 
                          <span 
                            style={{ 
                              color: indicatorData.Data[indicatorData.Data.length - 1].result.toLowerCase() === 'long' ? 'green' : 
                                indicatorData.Data[indicatorData.Data.length - 1].result.toLowerCase() === 'short' ? 'red' : 'blue' 
                            }}
                          >
                            {` ${indicatorData.Data[indicatorData.Data.length - 1].result}`}
                          </span>
                        </Text>
                      )}
                    </Stack>
                  </Stack>

                  {/* Expanded content */}
                  {isExpanded && (
                    <Stack className={styles.cardContent}>
                      <Text variant="medium" style={{ marginBottom: '10px' }}>
                        Detailed Data:
                      </Text>
                      <DetailsList
                        items={indicatorData.Data}
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        isHeaderVisible={true}
                        compact={true}
                      />
                    </Stack>
                  )}
                </Stack>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TradeChart;