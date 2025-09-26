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
      },
      {
        TableName: process.env.DB_TABLE_AUDIT_LOGS,
        KeySchema: [
          { AttributeName: "PK", KeyType: "HASH" },
          { AttributeName: "SK", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
          { AttributeName: "PK", AttributeType: "S" },
          { AttributeName: "SK", AttributeType: "S" },
          { AttributeName: `GSI1_PK`, AttributeType: "S" },
          { AttributeName: `GSI1_SK`, AttributeType: "N" },
          { AttributeName: `GSI2_PK`, AttributeType: "S" },
          { AttributeName: `GSI2_SK`, AttributeType: "N" },
          { AttributeName: `GSI3_PK`, AttributeType: "S" },
          { AttributeName: `GSI3_SK`, AttributeType: "N" },
          { AttributeName: `GSI4_PK`, AttributeType: "S" },
          { AttributeName: `GSI4_SK`, AttributeType: "N" },
          { AttributeName: `GSI5_PK`, AttributeType: "S" },
          { AttributeName: `GSI5_SK`, AttributeType: "N" },
          { AttributeName: `GSI6_PK`, AttributeType: "S" },
          { AttributeName: `GSI6_SK`, AttributeType: "N" },
          { AttributeName: `GSI7_PK`, AttributeType: "S" },
          { AttributeName: `GSI7_SK`, AttributeType: "N" },
          { AttributeName: `GSI8_PK`, AttributeType: "S" },
          { AttributeName: `GSI8_SK`, AttributeType: "N" },
          { AttributeName: `GSI9_PK`, AttributeType: "S" },
          { AttributeName: `GSI9_SK`, AttributeType: "N" },
          { AttributeName: `GSI10_PK`, AttributeType: "S" },
          { AttributeName: `GSI10_SK`, AttributeType: "N" }
        ],
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        GlobalSecondaryIndexes: createGlobalSecondaryIndexes({
          amount: 10,
          projectionType: "KEYS_ONLY"
        }),
        data: options.data || [],
        ttl: {
          attributeName: "expiresAt",
          enabled: true
        }
      }
    ],
    basePort: 8000
  };
};

module.exports = { createDynaliteTables };
