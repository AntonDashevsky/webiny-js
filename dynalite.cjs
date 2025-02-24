const createGlobalSecondaryIndexesAttributeDefinitions = amount => {
  const attributes = [];

  for (let current = 1; current <= amount; current++) {
    attributes.push({ AttributeName: `GSI${current}_PK`, AttributeType: "S" });
    attributes.push({ AttributeName: `GSI${current}_SK`, AttributeType: "S" });
  }
  return attributes;
};

const createGlobalSecondaryIndexes = options => {
  if (!options.amount) {
    return [];
  }
  const indexes = [];
  for (let current = 1; current <= options.amount; current++) {
    indexes.push({
      IndexName: `GSI${current}`,
      KeySchema: [
        { AttributeName: `GSI${current}_PK`, KeyType: "HASH" },
        { AttributeName: `GSI${current}_SK`, KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    });
  }

  return indexes;
};

const createDynaliteTables = (options = {}) => {
  return {
    tables: [
      {
        TableName: process.env.DB_TABLE,
        KeySchema: [
          { AttributeName: "PK", KeyType: "HASH" },
          { AttributeName: "SK", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
          { AttributeName: "PK", AttributeType: "S" },
          { AttributeName: "SK", AttributeType: "S" },
          ...createGlobalSecondaryIndexesAttributeDefinitions(2)
        ],
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        GlobalSecondaryIndexes: createGlobalSecondaryIndexes({
          amount: 2
        }),
        data: options.data || []
      },
      {
        TableName: process.env.DB_TABLE_ELASTICSEARCH,
        KeySchema: [
          { AttributeName: "PK", KeyType: "HASH" },
          { AttributeName: "SK", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
          { AttributeName: "PK", AttributeType: "S" },
          { AttributeName: "SK", AttributeType: "S" }
        ],
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
      },
      {
        TableName: process.env.DB_TABLE_LOG,
        KeySchema: [
          { AttributeName: "PK", KeyType: "HASH" },
          { AttributeName: "SK", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
          { AttributeName: "PK", AttributeType: "S" },
          { AttributeName: "SK", AttributeType: "S" },
          ...createGlobalSecondaryIndexesAttributeDefinitions(5)
        ],
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        GlobalSecondaryIndexes: createGlobalSecondaryIndexes({
          amount: 5
        }),
        data: options.data || []
      }
    ],
    basePort: 8000
  };
};

module.exports = { createDynaliteTables };
