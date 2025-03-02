import React from "react";
import { 
  DetailsList, 
  SelectionMode, 
  DetailsListLayoutMode,
  Text,
  Stack,
  mergeStyleSets
} from '@fluentui/react';

// Styles for the component
const styles = mergeStyleSets({
  container: {
    margin: '20px 0',
  },
  header: {
    margin: '0 0 20px 0',
  }
});

// Component for displaying trading accounts in a table
const TradingAccountsTable = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return (
      <Stack className={styles.container}>
        <Text variant="xLarge" className={styles.header}>Trading Accounts</Text>
        <Text>No trading accounts found.</Text>
      </Stack>
    );
  }

  // Define columns for DetailsList
  const columns = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'Name',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'strategies',
      name: 'Strategies',
      fieldName: 'Strategies',
      minWidth: 200,
      maxWidth: 500,
      isResizable: true,
      onRender: (item) => {
        if (!item.Strategies || item.Strategies.length === 0) {
          return <span>No strategies</span>;
        }
        
        return (
          <span>
            {item.Strategies.map((strategy, index) => {
              // Handle different strategy data formats
              const strategyName = strategy.Name || 
                (typeof strategy === 'object' && strategy.$oid ? strategy.$oid : strategy);
              return (
                <span key={index}>
                  {strategyName}
                  {index < item.Strategies.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </span>
        );
      }
    }
  ];

  return (
    <Stack className={styles.container}>
      <Text variant="xLarge" className={styles.header}>Trading Accounts</Text>
      <DetailsList
        items={accounts}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
      />
    </Stack>
  );
};

export default TradingAccountsTable;