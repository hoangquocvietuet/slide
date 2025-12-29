import { useState, useCallback } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { colors, fonts, borderRadius } from '../theme';

// Initialize Sui client
const client = new SuiClient({ url: getFullnodeUrl('testnet') });

interface QueryConfig {
  type: 'pool' | 'registry' | 'custom';
  defaultObjectId?: string;
  registryId?: string;
}

interface InteractiveQueryRunnerProps {
  config: QueryConfig;
  height?: string;
}

export function InteractiveQueryRunner({ config, height = '320px' }: InteractiveQueryRunnerProps) {
  const [objectId, setObjectId] = useState(config.defaultObjectId || '');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle percentage or fixed height
  const containerStyle = height === '100%'
    ? { display: 'flex', flexDirection: 'column' as const, gap: '8px', width: '100%', height: '100%', minHeight: 0 }
    : { display: 'flex', flexDirection: 'column' as const, gap: '12px', width: '100%', height };

  const runPoolQuery = useCallback(async (id: string) => {
    const poolObj = await client.getObject({
      id,
      options: { showContent: true, showType: true },
    });

    if (!poolObj.data?.content || poolObj.data.content.dataType !== 'moveObject') {
      throw new Error('Object not found or not a Move object');
    }

    const fields = poolObj.data.content.fields as Record<string, unknown>;
    const poolType = poolObj.data.type || '';

    // Extract type arguments from Pool<X, Y>
    const typeMatch = poolType.match(/<(.+),\s*(.+)>/);
    const typeX = typeMatch?.[1] || 'unknown';
    const typeY = typeMatch?.[2] || 'unknown';

    return {
      id: poolObj.data.objectId,
      type: poolType,
      typeX,
      typeY,
      fields: {
        balance_x: fields.balance_x,
        balance_y: fields.balance_y,
        lp_supply: fields.lp_supply,
        fee_bps: fields.fee_bps,
      },
    };
  }, []);

  const runRegistryQuery = useCallback(async (id: string) => {
    // Step 1: Get Registry
    const registryObj = await client.getObject({
      id,
      options: { showContent: true },
    });

    if (!registryObj.data?.content || registryObj.data.content.dataType !== 'moveObject') {
      throw new Error('Registry not found');
    }

    const registryFields = registryObj.data.content.fields as {
      pool_count: string;
      pools: { fields: { id: { id: string } } };
    };

    const tableId = registryFields.pools.fields.id.id;
    const poolCount = parseInt(registryFields.pool_count);

    // Step 2: Get dynamic fields
    const dynamicFields = await client.getDynamicFields({
      parentId: tableId,
    });

    // Step 3: Get first pool info (limit to avoid too much data)
    const poolInfos = [];
    for (const field of dynamicFields.data.slice(0, 3)) {
      const fieldObj = await client.getDynamicFieldObject({
        parentId: tableId,
        name: field.name,
      });

      if (fieldObj.data?.content && fieldObj.data.content.dataType === 'moveObject') {
        const poolInfoFields = fieldObj.data.content.fields as {
          name: { fields: { type_x: { fields: { name: string } }; type_y: { fields: { name: string } } } };
          value: { fields: { pool_id: string; created_at: string; is_active: boolean } };
        };

        poolInfos.push({
          pool_id: poolInfoFields.value.fields.pool_id,
          type_x: poolInfoFields.name.fields.type_x.fields.name,
          type_y: poolInfoFields.name.fields.type_y.fields.name,
          is_active: poolInfoFields.value.fields.is_active,
        });
      }
    }

    return {
      registry_id: id,
      pool_count: poolCount,
      table_id: tableId,
      pools: poolInfos,
    };
  }, []);

  const runQuery = useCallback(async () => {
    if (!objectId.trim()) {
      setError('Please enter an object ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      let data;
      if (config.type === 'pool') {
        data = await runPoolQuery(objectId.trim());
      } else if (config.type === 'registry') {
        data = await runRegistryQuery(objectId.trim());
      } else {
        // Custom query - just getObject
        const obj = await client.getObject({
          id: objectId.trim(),
          options: { showContent: true, showType: true },
        });
        data = obj.data;
      }

      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed');
    } finally {
      setIsLoading(false);
    }
  }, [objectId, config.type, runPoolQuery, runRegistryQuery]);

  return (
    <div style={containerStyle}>
      {/* Input Area */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={objectId}
          onChange={(e) => setObjectId(e.target.value)}
          placeholder={config.type === 'registry' ? 'Registry Object ID (0x...)' : 'Pool Object ID (0x...)'}
          style={{
            flex: 1,
            padding: '10px 14px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: borderRadius.md,
            color: colors.text,
            fontFamily: fonts.code,
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          onClick={runQuery}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            background: isLoading ? 'rgba(77, 162, 255, 0.3)' : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            border: 'none',
            borderRadius: borderRadius.md,
            color: '#fff',
            fontWeight: 600,
            fontSize: '14px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {isLoading ? 'Running...' : 'Run Query'}
        </button>
      </div>

      {/* Result Area */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        border: error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: borderRadius.md,
        padding: '10px',
        overflow: 'auto',
        fontFamily: fonts.code,
        fontSize: '11px',
        lineHeight: 1.4,
      }}>
        {error ? (
          <span style={{ color: colors.error }}>{error}</span>
        ) : result ? (
          <pre style={{ margin: 0, color: colors.success, whiteSpace: 'pre-wrap' }}>{result}</pre>
        ) : (
          <span style={{ color: colors.textMuted }}>
            {config.type === 'pool'
              ? 'Enter a Pool object ID and click "Run Query" to fetch pool data from Sui testnet'
              : config.type === 'registry'
              ? 'Enter the Registry object ID to fetch all registered pools'
              : 'Enter any object ID to fetch its data'}
          </span>
        )}
      </div>

      {/* Helper text */}
      <div style={{
        fontSize: '11px',
        color: colors.textMuted,
        display: 'flex',
        gap: '16px',
      }}>
        <span>Network: Testnet</span>
        {config.defaultObjectId && (
          <span>
            Default: <code style={{ color: colors.primary }}>{config.defaultObjectId.slice(0, 10)}...</code>
          </span>
        )}
      </div>
    </div>
  );
}

// Preset configurations
export const POOL_QUERY_CONFIG: QueryConfig = {
  type: 'pool',
  defaultObjectId: '', // Will be set from constants
};

export const REGISTRY_QUERY_CONFIG: QueryConfig = {
  type: 'registry',
  defaultObjectId: '0xb20bfcef85826aaba678e6c4da8903a64a901f0484b9432822046a113187dde9',
};
