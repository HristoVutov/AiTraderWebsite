import React from "react";
import { 
  DetailsList, 
  SelectionMode, 
  DetailsListLayoutMode,
  Text,
  Stack,
  mergeStyleSets,
  DetailsRow
} from '@fluentui/react';

// Styles for the component
const styles = mergeStyleSets({
  container: {
    margin: '20px 0',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    margin: '0 0 20px 0',
  },
  positive: {
    color: 'green',
    fontWeight: 'bold',
  },
  negative: {
    color: 'red',
    fontWeight: 'bold',
  },
  pending: {
    color: 'orange',
  }
});

// Format date to a readable format
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Custom row rendering to add conditional formatting
const onRenderRow = (props) => {
  const customStyles = {};
  
  if (props.item.Status === 'completed') {
    if (props.item.Outcome === 'win' || props.item.Profitloss > 0) {
      customStyles.root = { backgroundColor: '#e6ffe6' }; // Light green for winning trades
    } else if (props.item.Outcome === 'loss' || props.item.Profitloss < 0) {
      customStyles.root = { backgroundColor: '#fff0f0' }; // Light red for losing trades
    }
  }
  
  return <DetailsRow {...props} styles={customStyles} />;
};

// Component for displaying trades in a table
const TradesTable = ({ trades }) => {
  if (!trades || trades.length === 0) {
    return (
      <Stack className={styles.container}>
        <Text variant="xLarge" className={styles.header}>Trades</Text>
        <Text>No trades found for this account.</Text>
      </Stack>
    );
  }

  // Define columns for DetailsList
  const columns = [
    {
      key: 'pair',
      name: 'Pair',
      fieldName: 'Pair',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: 'entry',
      name: 'Entry',
      fieldName: 'Entry',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <span>{Number(item.Entry).toFixed(5)}</span>
      )
    },
    {
      key: 'stopLoss',
      name: 'Stop Loss',
      fieldName: 'StopLoss',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <span>{Number(item.StopLoss).toFixed(5)}</span>
      )
    },
    {
      key: 'target',
      name: 'Target',
      fieldName: 'Target',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <span>{Number(item.Target).toFixed(5)}</span>
      )
    },
    {
      key: 'riskReward',
      name: 'Risk/Reward',
      fieldName: 'RiskReward',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <span>{Number(item.RiskReward).toFixed(2)}</span>
      )
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'Status',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <span className={item.Status === 'pending' ? styles.pending : ''}>
          {item.Status.charAt(0).toUpperCase() + item.Status.slice(1)}
        </span>
      )
    },
    {
      key: 'outcome',
      name: 'Outcome',
      fieldName: 'Outcome',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => {
        if (item.Outcome === 'win') {
          return <span className={styles.positive}>Win</span>;
        } else if (item.Outcome === 'loss') {
          return <span className={styles.negative}>Loss</span>;
        } else {
          return <span className={styles.pending}>{item.Outcome.charAt(0).toUpperCase() + item.Outcome.slice(1)}</span>;
        }
      }
    },
    {
      key: 'profitLoss',
      name: 'Profit/Loss',
      fieldName: 'Profitloss',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => {
        const value = Number(item.Profitloss);
        const formattedValue = value.toFixed(2);
        if (value > 0) {
          return <span className={styles.positive}>+{formattedValue}</span>;
        } else if (value < 0) {
          return <span className={styles.negative}>{formattedValue}</span>;
        } else {
          return <span>{formattedValue}</span>;
        }
      }
    },
    {
      key: 'entryTime',
      name: 'Entry Time',
      fieldName: 'EntryTime',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => <span>{formatDate(item.EntryTime)}</span>
    }
  ];

  return (
    <Stack className={styles.container}>
      <Text variant="xLarge" className={styles.header}>Trades</Text>
      <DetailsList
        items={trades}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
        onRenderRow={onRenderRow}
      />
    </Stack>
  );
};

export default TradesTable;