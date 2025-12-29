import {
  Deck,
  Slide,
  Heading,
  Text,
  FlexBox,
  Box,
  CodePane,
  Appear,
} from 'spectacle';
import { motion } from 'framer-motion';
import { colors, fonts, borderRadius, spectacleTheme } from '../theme';
import { InteractiveQueryRunner, POOL_QUERY_CONFIG, REGISTRY_QUERY_CONFIG } from '../components/InteractiveQueryRunner';

// Sui Logo Component
function SuiLogo({ size = 48 }: { size?: number }) {
  return (
    <img
      src="/SUI.png"
      alt="Sui Logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
}

// Comparison Card Component
function CompareCard({ title, items, color, icon }: {
  title: string;
  items: string[];
  color: string;
  icon?: string;
}) {
  return (
    <Box style={{
      flex: 1,
      maxWidth: '550px',
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: borderRadius.lg,
      padding: '32px',
    }}>
      <FlexBox alignItems="center" style={{ gap: '12px', marginBottom: '24px' }}>
        {icon && <span style={{ fontSize: '28px' }}>{icon}</span>}
        <Text style={{ color, fontWeight: 600, fontSize: '24px', margin: 0 }}>{title}</Text>
      </FlexBox>
      {items.map((item, i) => (
        <FlexBox key={i} alignItems="flex-start" style={{ gap: '12px', marginBottom: '14px' }}>
          <Box style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, marginTop: '8px', flexShrink: 0 }} />
          <Text style={{ fontSize: '18px', color: colors.textSecondary, lineHeight: 1.6 }}>{item}</Text>
        </FlexBox>
      ))}
    </Box>
  );
}

// Feature Box Component
function FeatureBox({ title, description, color, icon }: {
  title: string;
  description: string;
  color: string;
  icon: string;
}) {
  return (
    <Box style={{
      flex: 1,
      minWidth: '280px',
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: borderRadius.lg,
      padding: '24px',
    }}>
      <FlexBox alignItems="center" style={{ gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <Text style={{ fontSize: '20px', fontWeight: 600, color, margin: 0 }}>{title}</Text>
      </FlexBox>
      <Text style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: 1.5 }}>{description}</Text>
    </Box>
  );
}

// Module Card Component
function ModuleCard({ name, desc, color }: { name: string; desc: string; color: string }) {
  return (
    <Box style={{
      background: `${color}15`,
      border: `2px solid ${color}50`,
      borderRadius: borderRadius.lg,
      padding: '20px 28px',
      minWidth: '280px',
    }}>
      <Text style={{ fontFamily: fonts.code, fontSize: '20px', color, fontWeight: 600, marginBottom: '8px' }}>{name}</Text>
      <Text style={{ fontSize: '16px', color: colors.textSecondary }}>{desc}</Text>
    </Box>
  );
}

// Fullscreen wrapper
function FullscreenDeck({ children }: { children: React.ReactNode }) {
  return (
    <div className="fullscreen-presentation">
      {children}
    </div>
  );
}

export function SuiSDKIntegrationPresentation() {
  return (
    <FullscreenDeck>
      <Deck
        theme={spectacleTheme}
        template={() => <></>}
      >
        {/* ==================== SLIDE 1: Title ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <SuiLogo size={64} />
              <Heading fontSize="64px" style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginTop: '24px',
                marginBottom: '16px',
                fontWeight: 700,
              }}>
                Sui SDK Integration
              </Heading>
              <Text fontSize="28px" color="secondary" style={{ marginBottom: '12px', fontWeight: 500 }}>
                Building DApps with TypeScript SDK & Dapp Kit
              </Text>
              <Text fontSize="20px" style={{ color: colors.textMuted, marginBottom: '40px' }}>
                From Smart Contract to Frontend Integration
              </Text>
              <Box style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.2)',
                borderRadius: borderRadius.md,
                padding: '8px 16px',
                display: 'inline-block',
              }}>
                <Text style={{ fontSize: '18px', color: colors.primary, fontWeight: 500 }}>
                  Workshop 2 - Oliver - Sui Developer Workshop
                </Text>
              </Box>
            </motion.div>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 2: Recap & Agenda ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '48px', fontWeight: 700 }}>Workshop Overview</Heading>
            <FlexBox style={{ gap: '32px', maxWidth: '1200px', width: '100%', justifyContent: 'center' }}>
              <CompareCard
                title="Previous: DEX Fundamentals"
                color={colors.textMuted}
                icon="✅"
                items={[
                  'AMM & x * y = k formula',
                  'Liquidity Pools & LP tokens',
                  'Swap, Fees, Slippage',
                  'Move smart contracts',
                  'Pool & Registry structs',
                ]}
              />
              <CompareCard
                title="Today: SDK Integration"
                color={colors.success}
                icon="🚀"
                items={[
                  'Project structure & setup',
                  '@mysten/sui SDK & Dapp Kit',
                  'Querying blockchain state',
                  'Building transactions',
                  'React hooks patterns',
                ]}
              />
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 3: Tech Stack ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>Tech Stack</Heading>
            <FlexBox style={{ gap: '24px', maxWidth: '1100px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <FeatureBox
                icon="📦"
                title="@mysten/sui"
                description="Core SDK for Sui blockchain: client, transactions, cryptography"
                color={colors.primary}
              />
              <FeatureBox
                icon="🔌"
                title="@mysten/dapp-kit"
                description="React hooks & components for wallet connection and transactions"
                color={colors.success}
              />
              <FeatureBox
                icon="⚡"
                title="@tanstack/react-query"
                description="Data fetching, caching, and state management for async operations"
                color={colors.warning}
              />
              <FeatureBox
                icon="⚛️"
                title="React + TypeScript"
                description="Modern frontend with type safety and component architecture"
                color={colors.chartPurple}
              />
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 4: Project Structure ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Project Structure</Heading>
            <FlexBox style={{ gap: '32px', width: '100%', maxWidth: '1100px' }}>
              <Box style={{ flex: 1, fontSize: '14px' }}>
                <CodePane language="bash" showLineNumbers={false}>
                  {`dex-interface/
├── src/
│   ├── main.tsx          # App entry + providers
│   ├── App.tsx           # Routes
│   ├── constants/        # Config & addresses
│   │   ├── config.ts     # Package ID, Registry
│   │   └── tokens.ts     # Token definitions
│   ├── types/            # TypeScript interfaces
│   ├── hooks/            # React Query hooks
│   │   ├── usePoolsFromRegistry.ts
│   │   ├── useCoins.ts
│   │   └── useTokenBalance.ts
│   ├── services/         # Transaction builders
│   │   └── contract.ts
│   ├── components/       # UI components
│   └── pages/            # Page components
└── contracts/dex/        # Move smart contracts`}
                </CodePane>
              </Box>
              <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { folder: 'constants/', desc: 'Contract addresses & configuration', color: colors.primary },
                  { folder: 'types/', desc: 'Token, Pool, SwapParams interfaces', color: colors.success },
                  { folder: 'hooks/', desc: 'React Query hooks for data fetching', color: colors.warning },
                  { folder: 'services/', desc: 'Transaction building logic', color: colors.chartPurple },
                ].map((item, i) => (
                  <Box key={i} style={{
                    background: `${item.color}10`,
                    border: `1px solid ${item.color}30`,
                    borderRadius: borderRadius.md,
                    padding: '16px',
                  }}>
                    <Text style={{ fontFamily: fonts.code, fontSize: '18px', color: item.color, fontWeight: 600 }}>{item.folder}</Text>
                    <Text style={{ fontSize: '15px', color: colors.textSecondary, marginTop: '4px' }}>{item.desc}</Text>
                  </Box>
                ))}
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 5: Provider Setup ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Provider Setup</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="tsx" showLineNumbers>
                {`// main.tsx - App entry point with all providers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

const queryClient = new QueryClient();

const networks = {
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networks} defaultNetwork="testnet">
      <WalletProvider autoConnect>
        <App />
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);`}
              </CodePane>
            </Box>
            <FlexBox style={{ gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { name: 'QueryClientProvider', desc: 'Caching & state' },
                { name: 'SuiClientProvider', desc: 'RPC connection' },
                { name: 'WalletProvider', desc: 'Wallet access' },
              ].map((item, i) => (
                <Box key={i} style={{
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  borderRadius: borderRadius.md,
                  padding: '12px 20px',
                }}>
                  <Text style={{ fontSize: '16px', color: colors.primary, fontWeight: 600 }}>{item.name}</Text>
                  <Text style={{ fontSize: '14px', color: colors.textSecondary }}>{item.desc}</Text>
                </Box>
              ))}
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 6: Dapp Kit Hooks ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>Dapp Kit Hooks</Heading>
            <FlexBox style={{ gap: '20px', maxWidth: '1100px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { hook: 'useSuiClient()', desc: 'Get SuiClient instance for RPC calls', color: colors.primary },
                { hook: 'useCurrentAccount()', desc: 'Get connected wallet address', color: colors.success },
                { hook: 'useSignAndExecuteTransaction()', desc: 'Sign & submit transactions', color: colors.warning },
                { hook: 'useCurrentWallet()', desc: 'Get wallet info & status', color: colors.chartPurple },
                { hook: 'useConnectWallet()', desc: 'Trigger wallet connection', color: colors.chartPink },
                { hook: 'useDisconnectWallet()', desc: 'Disconnect current wallet', color: colors.error },
              ].map((item, i) => (
                <Box key={i} style={{
                  background: `${item.color}15`,
                  border: `2px solid ${item.color}50`,
                  borderRadius: borderRadius.lg,
                  padding: '20px 28px',
                  minWidth: '320px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '20px', color: item.color, fontWeight: 600, marginBottom: '8px' }}>{item.hook}</Text>
                  <Text style={{ fontSize: '16px', color: colors.textSecondary }}>{item.desc}</Text>
                </Box>
              ))}
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 7: SuiClient Query Methods ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>SuiClient Query Methods</Heading>
            <Box style={{ maxWidth: '900px', width: '100%' }}>
              {[
                { method: 'getObject()', desc: 'Fetch any object by ID', example: 'Pool, Registry, Coin objects', color: colors.primary },
                { method: 'getCoins()', desc: 'Get coins owned by address', example: 'List user tokens for swap', color: colors.success },
                { method: 'getBalance()', desc: 'Get total balance for coin type', example: 'Display wallet balance', color: colors.warning },
                { method: 'getDynamicFields()', desc: 'List dynamic fields on object', example: 'Iterate Registry pools', color: colors.chartPurple },
                { method: 'getDynamicFieldObject()', desc: 'Get specific dynamic field', example: 'Fetch PoolInfo by key', color: colors.chartPink },
              ].map((item, i) => (
                <Box key={i} style={{
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: borderRadius.md,
                  padding: '16px 24px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '18px', fontWeight: 600, color: item.color, minWidth: '220px' }}>{item.method}</Text>
                  <Box style={{ flex: 1 }}>
                    <Text style={{ fontSize: '16px', color: colors.text }}>{item.desc}</Text>
                    <Text style={{ fontSize: '14px', color: colors.textMuted }}>{item.example}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 8: Pool - Move / TypeScript / Query ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="flex-start" alignItems="center" style={{ paddingTop: '16px' }}>
            <Heading fontSize="32px" style={{ marginBottom: '10px', fontWeight: 700 }}>Pool: Move → TypeScript → Query</Heading>

            {/* Three columns: Move, TypeScript, Query Code */}
            <FlexBox style={{ gap: '8px', width: '100%', maxWidth: '1200px', marginBottom: '10px' }}>
              {/* Move Struct */}
              <Box style={{ flex: 1, fontSize: '9px', minWidth: 0, overflow: 'hidden' }}>
                <Box style={{
                  background: 'rgba(77, 162, 255, 0.15)',
                  padding: '4px 8px',
                  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                  borderBottom: '2px solid rgba(77, 162, 255, 0.4)',
                }}>
                  <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.primary }}>Move Struct</Text>
                </Box>
                <CodePane language="rust" showLineNumbers={false}>
                  {`struct Pool<phantom X, phantom Y> {
  id: UID,
  balance_x: Balance<X>,
  balance_y: Balance<Y>,
  lp_supply: Supply<LP<X,Y>>,
  fee_bps: u64,
}`}
                </CodePane>
              </Box>
              {/* TypeScript Interface */}
              <Box style={{ flex: 1, fontSize: '9px', minWidth: 0, overflow: 'hidden' }}>
                <Box style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '4px 8px',
                  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                  borderBottom: '2px solid rgba(16, 185, 129, 0.4)',
                }}>
                  <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.success }}>TypeScript Interface</Text>
                </Box>
                <CodePane language="typescript" showLineNumbers={false}>
                  {`interface PoolData {
  id: string;
  typeX: string;
  typeY: string;
  reserveX: string;
  reserveY: string;
  feeBps: number;
}`}
                </CodePane>
              </Box>
              {/* How to Query */}
              <Box style={{ flex: 1.3, fontSize: '9px', minWidth: 0, overflow: 'hidden' }}>
                <Box style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '4px 8px',
                  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                  borderBottom: '2px solid rgba(245, 158, 11, 0.4)',
                }}>
                  <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.warning }}>How to Query</Text>
                </Box>
                <CodePane language="typescript" showLineNumbers={false}>
                  {`const pool = await client.getObject({
  id: poolId,
  options: { showContent: true, showType: true }
});
const fields = pool.data.content.fields;
// Extract types from "Pool<X, Y>"
const types = pool.data.type.match(/<(.+),(.+)>/);`}
                </CodePane>
              </Box>
            </FlexBox>

            {/* Interactive Try It Section */}
            <Box style={{ width: '100%', maxWidth: '1200px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <Box style={{
                background: 'rgba(139, 92, 246, 0.15)',
                padding: '4px 10px',
                borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                borderBottom: '2px solid rgba(139, 92, 246, 0.4)',
              }}>
                <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.chartPurple }}>Try It Live - Query Any Pool</Text>
              </Box>
              <Box style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
                padding: '8px',
                flex: 1,
                minHeight: 0,
              }}>
                <InteractiveQueryRunner config={POOL_QUERY_CONFIG} height="100%" />
              </Box>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 9: Registry - Move / TypeScript / Query ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="flex-start" alignItems="center" style={{ paddingTop: '16px' }}>
            <Heading fontSize="32px" style={{ marginBottom: '10px', fontWeight: 700 }}>Registry: Move → TypeScript → Query</Heading>

            {/* Three columns: Move, TypeScript, Query Code */}
            <FlexBox style={{ gap: '8px', width: '100%', maxWidth: '1200px', marginBottom: '10px' }}>
              {/* Move Struct */}
              <Box style={{ flex: 1, fontSize: '9px', minWidth: 0, overflow: 'hidden' }}>
                <Box style={{
                  background: 'rgba(77, 162, 255, 0.15)',
                  padding: '4px 8px',
                  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                  borderBottom: '2px solid rgba(77, 162, 255, 0.4)',
                }}>
                  <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.primary }}>Move Structs</Text>
                </Box>
                <CodePane language="rust" showLineNumbers={false}>
                  {`struct Registry has key {
  id: UID,
  pools: Table<PoolKey, PoolInfo>,
  pool_count: u64,
}
struct PoolKey { type_x, type_y: TypeName }
struct PoolInfo { pool_id: ID, is_active }`}
                </CodePane>
              </Box>
              {/* TypeScript Interface */}
              <Box style={{ flex: 1, fontSize: '9px', minWidth: 0, overflow: 'hidden' }}>
                <Box style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '4px 8px',
                  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                  borderBottom: '2px solid rgba(16, 185, 129, 0.4)',
                }}>
                  <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.success }}>TypeScript Interface</Text>
                </Box>
                <CodePane language="typescript" showLineNumbers={false}>
                  {`interface RegistryData {
  poolCount: number;
  tableId: string;
}
interface PoolInfoData {
  poolId: string;
  typeX: string; typeY: string;
  isActive: boolean;
}`}
                </CodePane>
              </Box>
              {/* How to Query */}
              <Box style={{ flex: 1.3, fontSize: '9px', minWidth: 0, overflow: 'hidden' }}>
                <Box style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '4px 8px',
                  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                  borderBottom: '2px solid rgba(245, 158, 11, 0.4)',
                }}>
                  <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.warning }}>How to Query</Text>
                </Box>
                <CodePane language="typescript" showLineNumbers={false}>
                  {`// 1. Get Registry object
const reg = await client.getObject({id});
const tableId = reg.data.content.fields.pools.fields.id.id;
// 2. Get Table entries (dynamic fields)
const entries = await client.getDynamicFields({parentId: tableId});
// 3. Get each PoolInfo
const info = await client.getDynamicFieldObject({parentId, name});`}
                </CodePane>
              </Box>
            </FlexBox>

            {/* Interactive Try It Section */}
            <Box style={{ width: '100%', maxWidth: '1200px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <Box style={{
                background: 'rgba(139, 92, 246, 0.15)',
                padding: '4px 10px',
                borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                borderBottom: '2px solid rgba(139, 92, 246, 0.4)',
              }}>
                <Text style={{ fontSize: '12px', fontWeight: 600, color: colors.chartPurple }}>Try It Live - Query Registry (Table = Dynamic Fields)</Text>
              </Box>
              <Box style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
                padding: '8px',
                flex: 1,
                minHeight: 0,
              }}>
                <InteractiveQueryRunner config={REGISTRY_QUERY_CONFIG} height="100%" />
              </Box>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 10: Coin Queries ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Coin Queries</Heading>
            <FlexBox style={{ gap: '24px', width: '100%', maxWidth: '1100px' }}>
              <Box style={{ flex: 1, fontSize: '14px' }}>
                <Text style={{ fontSize: '20px', fontWeight: 600, color: colors.primary, marginBottom: '16px' }}>getBalance()</Text>
                <CodePane language="typescript" showLineNumbers>
                  {`// Get total balance for a coin type
const balance = await client.getBalance({
  owner: account.address,
  coinType: '0x2::sui::SUI',  // Optional
});

// Returns: { totalBalance: "1000000000" }
const formatted = parseInt(balance.totalBalance)
  / Math.pow(10, 9);  // 9 decimals`}
                </CodePane>
              </Box>
              <Box style={{ flex: 1, fontSize: '14px' }}>
                <Text style={{ fontSize: '20px', fontWeight: 600, color: colors.success, marginBottom: '16px' }}>getCoins()</Text>
                <CodePane language="typescript" showLineNumbers>
                  {`// Get individual coin objects
const coins = await client.getCoins({
  owner: account.address,
  coinType: token.address,
});

// Returns array of coin objects:
coins.data.map(coin => ({
  objectId: coin.coinObjectId,
  balance: coin.balance,
}))`}
                </CodePane>
              </Box>
            </FlexBox>
            <Box style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: borderRadius.lg,
              padding: '16px 24px',
              marginTop: '24px',
            }}>
              <Text style={{ fontSize: '16px', color: colors.success }}>
                getBalance() for display, getCoins() when you need coin objects for transactions
              </Text>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 11: Transaction Building ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Transaction Building</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`import { Transaction } from '@mysten/sui/transactions';

// Create a new transaction
const tx = new Transaction();

// Call a Move function
tx.moveCall({
  target: \`\${PACKAGE_ID}::swap::swap_x_to_y\`,
  typeArguments: [
    '0x2::sui::SUI',           // Type X
    '0xpkg::usdc::USDC',       // Type Y
  ],
  arguments: [
    tx.object(poolId),         // &mut Pool<X, Y>
    tx.object(coinObjectId),   // Coin<X>
    tx.pure.u64(minOutput),    // u64 minimum output
  ],
});

// The result is returned as TransactionResult
// Use destructuring to get output objects
const [outputCoin] = tx.moveCall({ ... });`}
              </CodePane>
            </Box>
            <FlexBox style={{ gap: '16px', marginTop: '20px' }}>
              <Box style={{ background: 'rgba(77, 162, 255, 0.1)', padding: '12px 20px', borderRadius: borderRadius.md }}>
                <Text style={{ fontSize: '16px', color: colors.primary }}>tx.object() - Object references</Text>
              </Box>
              <Box style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px 20px', borderRadius: borderRadius.md }}>
                <Text style={{ fontSize: '16px', color: colors.success }}>tx.pure.u64() - Pure values</Text>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 12: Coin Operations ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Coin Operations</Heading>
            <Box style={{ fontSize: '14px', width: '100%', maxWidth: '1000px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`const tx = new Transaction();

// Split from gas (for SUI token)
const [suiCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);

// Split from existing coin
const [splitCoin] = tx.splitCoins(
  tx.object(coinObjectId),
  [tx.pure.u64(amount)]
);

// Merge multiple coins into one
if (coins.length > 1) {
  const primaryCoin = tx.object(coins[0].coinObjectId);
  const coinsToMerge = coins.slice(1).map(c => tx.object(c.coinObjectId));
  tx.mergeCoins(primaryCoin, coinsToMerge);
  // Now primaryCoin has all the balance
}

// Transfer objects to recipient
tx.transferObjects([outputCoin], account.address);`}
              </CodePane>
            </Box>
            <FlexBox style={{ gap: '16px', marginTop: '20px' }}>
              {[
                { op: 'splitCoins', desc: 'Split exact amount from coin' },
                { op: 'mergeCoins', desc: 'Combine multiple coins' },
                { op: 'transferObjects', desc: 'Send to address' },
              ].map((item, i) => (
                <Box key={i} style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: borderRadius.md,
                  padding: '10px 16px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '15px', color: colors.warning }}>{item.op}</Text>
                  <Text style={{ fontSize: '13px', color: colors.textMuted }}>{item.desc}</Text>
                </Box>
              ))}
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 13: Sign and Execute ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Sign and Execute Transaction</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';

function SwapButton() {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const handleSwap = async () => {
    try {
      const tx = new Transaction();
      // ... build transaction ...

      const result = await signAndExecute({
        transaction: tx,
      });

      console.log('Transaction digest:', result.digest);
      // Transaction was successful!

    } catch (error) {
      if (error.message.includes('E_SLIPPAGE_EXCEEDED')) {
        showError('Slippage exceeded, try increasing tolerance');
      } else {
        showError('Transaction failed: ' + error.message);
      }
    }
  };

  return <button onClick={handleSwap}>Swap</button>;
}`}
              </CodePane>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 14: Custom Hooks Pattern ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Custom Hooks Pattern</Heading>
            <Box style={{ fontSize: '13px', width: '100%', maxWidth: '1000px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`// hooks/useTokenBalance.ts
import { useQuery } from '@tanstack/react-query';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';

export function useTokenBalance(token?: Token) {
  const account = useCurrentAccount();
  const client = useSuiClient();

  return useQuery({
    queryKey: ['tokenBalance', account?.address, token?.address],
    queryFn: async () => {
      if (!account || !token) return null;

      // For SUI token, don't pass coinType
      const coinType = token.address === '0x2::sui::SUI' ? undefined : token.address;
      const balance = await client.getBalance({
        owner: account.address,
        coinType,
      });

      return {
        raw: balance.totalBalance,
        formatted: formatTokenAmount(balance.totalBalance, token.decimals),
      };
    },
    enabled: !!account && !!token,  // Only run when data available
    refetchInterval: 10000,         // Auto-refresh every 10s
  });
}`}
              </CodePane>
            </Box>
            <FlexBox style={{ gap: '16px', marginTop: '20px' }}>
              <Box style={{ background: 'rgba(77, 162, 255, 0.1)', padding: '10px 16px', borderRadius: borderRadius.md }}>
                <Text style={{ fontSize: '14px', color: colors.primary }}>queryKey - Unique cache key</Text>
              </Box>
              <Box style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px 16px', borderRadius: borderRadius.md }}>
                <Text style={{ fontSize: '14px', color: colors.success }}>enabled - Conditional execution</Text>
              </Box>
              <Box style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px 16px', borderRadius: borderRadius.md }}>
                <Text style={{ fontSize: '14px', color: colors.warning }}>refetchInterval - Auto-refresh</Text>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 15: Full Swap Flow ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '32px', fontWeight: 700 }}>Full Swap Flow</Heading>
            <Box style={{ fontSize: '13px', width: '100%', maxWidth: '1000px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`const handleSwap = async () => {
  const tx = new Transaction();

  // 1. Prepare input coin
  let coinToSwap;
  if (inputToken.address === '0x2::sui::SUI') {
    [coinToSwap] = tx.splitCoins(tx.gas, [tx.pure.u64(inputAmountRaw)]);
  } else {
    const coins = await client.getCoins({ owner: account.address, coinType: inputToken.address });
    if (coins.data.length > 1) {
      const primary = tx.object(coins.data[0].coinObjectId);
      tx.mergeCoins(primary, coins.data.slice(1).map(c => tx.object(c.coinObjectId)));
      [coinToSwap] = tx.splitCoins(primary, [tx.pure.u64(inputAmountRaw)]);
    } else {
      [coinToSwap] = tx.splitCoins(tx.object(coins.data[0].coinObjectId), [tx.pure.u64(inputAmountRaw)]);
    }
  }

  // 2. Execute swap
  const [outputCoin] = tx.moveCall({
    target: \`\${DEX_PACKAGE_ID}::swap::swap_x_to_y\`,
    typeArguments: [pool.tokenA.address, pool.tokenB.address],
    arguments: [tx.object(pool.id), coinToSwap, tx.pure.u64(minOutputRaw)],
  });

  // 3. Transfer output
  tx.transferObjects([outputCoin], account.address);

  // 4. Sign and execute
  const result = await signAndExecute({ transaction: tx });
};`}
              </CodePane>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 18: Add Liquidity Transaction ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Add Liquidity Transaction</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`export const buildAddLiquidityTransaction = (
  params: AddLiquidityParams,
  coinXObjectId: string,
  coinYObjectId: string
): Transaction => {
  const tx = new Transaction();

  tx.moveCall({
    target: \`\${DEX_PACKAGE_ID}::liquidity::add_liquidity\`,
    typeArguments: [
      params.pool.tokenA.address,
      params.pool.tokenB.address
    ],
    arguments: [
      tx.object(params.pool.id),   // &mut Pool<X, Y>
      tx.object(coinXObjectId),    // Coin<X>
      tx.object(coinYObjectId),    // Coin<Y>
    ],
  });

  // Returns Coin<LP<X, Y>> - LP tokens
  return tx;
};`}
              </CodePane>
            </Box>
            <Box style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: borderRadius.lg,
              padding: '16px 24px',
              marginTop: '20px',
            }}>
              <Text style={{ fontSize: '16px', color: colors.success }}>
                LP tokens are returned automatically - transfer them to the user!
              </Text>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 20: Configuration Constants ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Configuration Constants</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`// constants/config.ts
export const NETWORK = 'testnet';
export const RPC_URL = 'https://fullnode.testnet.sui.io:443';

// Deployed contract addresses (update after publish)
export const DEX_PACKAGE_ID = '0xd0b67f8093b...';
export const REGISTRY_ID = '0xb20bfcef858...';

// System objects
export const CLOCK_ID = '0x6';

// Fee constants (must match contract)
export const DEFAULT_FEE_BPS = 30;      // 0.3%
export const FEE_DENOMINATOR = 10000;

// UI settings
export const DEFAULT_SLIPPAGE = 0.5;    // 0.5%
export const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0];
export const REFRESH_INTERVAL = 10000;  // 10 seconds`}
              </CodePane>
            </Box>
            <Box style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              borderRadius: borderRadius.lg,
              padding: '16px 24px',
              marginTop: '20px',
            }}>
              <Text style={{ fontSize: '16px', color: colors.error }}>
                Always update PACKAGE_ID and REGISTRY_ID after deploying contracts!
              </Text>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 21: Error Handling ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Error Handling</Heading>
            <Box style={{ fontSize: '14px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`try {
  const result = await signAndExecute({ transaction: tx });
  showSuccess('Transaction successful!', result.digest);

} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';

  // Handle specific Move abort codes
  if (message.includes('E_SLIPPAGE_EXCEEDED') || message.includes('abort 2')) {
    showError('Slippage exceeded. Try increasing tolerance.');

  } else if (message.includes('E_INSUFFICIENT_BALANCE') || message.includes('abort 1')) {
    showError('Insufficient balance for this swap.');

  } else if (message.includes('E_ZERO_AMOUNT')) {
    showError('Amount must be greater than zero.');

  } else if (message.includes('UserRejected')) {
    // User cancelled in wallet - don't show error

  } else {
    showError(\`Transaction failed: \${message}\`);
  }
}`}
              </CodePane>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 22: usePoolsFromRegistry ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '32px', fontWeight: 700 }}>usePoolsFromRegistry Hook</Heading>
            <Box style={{ fontSize: '12px', width: '100%', maxWidth: '1000px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`export function usePoolsFromRegistry() {
  const client = useSuiClient();

  return useQuery({
    queryKey: ['poolsFromRegistry', REGISTRY_ID],
    queryFn: async (): Promise<PoolData[]> => {
      // 1. Get registry
      const registryObj = await client.getObject({ id: REGISTRY_ID, options: { showContent: true }});
      const tableId = registryObj.data.content.fields.pools.fields.id.id;

      // 2. Get all dynamic fields (pool entries)
      const dynamicFields = await client.getDynamicFields({ parentId: tableId });

      const pools: PoolData[] = [];
      for (const field of dynamicFields.data) {
        // 3. Get PoolInfo from dynamic field
        const fieldObj = await client.getDynamicFieldObject({ parentId: tableId, name: field.name });
        const poolId = fieldObj.data.content.fields.value.fields.pool_id;

        // 4. Get actual Pool object with reserves
        const poolObj = await client.getObject({ id: poolId, options: { showContent: true, showType: true }});
        // ... parse and add to pools array
      }
      return pools;
    },
    refetchInterval: 15000,
  });
}`}
              </CodePane>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 23: Key Takeaways ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '32px', fontWeight: 700 }}>Key Takeaways</Heading>
            <Box style={{ maxWidth: '700px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🔌', text: 'Dapp Kit provides React hooks for wallet & transactions' },
                { icon: '📦', text: 'SuiClient methods: getObject, getCoins, getDynamicFields' },
                { icon: '⚡', text: 'Transaction class builds PTBs with moveCall, splitCoins, etc.' },
                { icon: '🎣', text: 'React Query + custom hooks for data fetching & caching' },
                { icon: '🗂️', text: 'Dynamic fields enable Table<K, V> iteration from TS' },
                { icon: '🔒', text: 'Type safety: Match TypeScript interfaces to Move structs' },
              ].map((item, i) => (
                <Appear key={i}>
                  <FlexBox alignItems="center" style={{
                    gap: '14px',
                    padding: '12px 16px',
                    background: 'rgba(77, 162, 255, 0.1)',
                    border: '1px solid rgba(77, 162, 255, 0.2)',
                    borderRadius: borderRadius.md,
                  }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <Text fontSize="17px" color="secondary">{item.text}</Text>
                  </FlexBox>
                </Appear>
              ))}
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 24: Common Patterns Summary ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>Common Patterns</Heading>
            <FlexBox style={{ gap: '20px', maxWidth: '1100px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <ModuleCard name="Query Pattern" desc="useQuery + useSuiClient for data fetching" color={colors.primary} />
              <ModuleCard name="Transaction Pattern" desc="new Transaction() + moveCall + signAndExecute" color={colors.success} />
              <ModuleCard name="Coin Handling" desc="getCoins -> merge -> split -> transfer" color={colors.warning} />
              <ModuleCard name="Type Args" desc="[TypeX, TypeY] for generic Move functions" color={colors.chartPurple} />
              <ModuleCard name="Error Handling" desc="Parse abort codes for user-friendly messages" color={colors.error} />
              <ModuleCard name="Caching" desc="React Query queryKey for automatic cache invalidation" color={colors.chartCyan} />
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 25: Q&A ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <SuiLogo size={100} />
            <Heading fontSize="56px" style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '28px',
              marginBottom: '16px',
            }}>
              Let's Build on Sui!
            </Heading>
            <Text fontSize="28px" color="secondary" style={{ marginBottom: '32px' }}>
              Questions?
            </Text>
            <FlexBox style={{ gap: '24px', marginBottom: '32px' }}>
              <Box style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.2)',
                borderRadius: borderRadius.lg,
                padding: '16px 24px',
                textAlign: 'center',
              }}>
                <Text style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '8px' }}>
                  Sui SDK Docs:
                </Text>
                <Text style={{ fontSize: '18px', color: colors.primary, fontFamily: fonts.code }}>
                  sdk.mystenlabs.com/typescript
                </Text>
              </Box>
              <Box style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: borderRadius.lg,
                padding: '16px 24px',
                textAlign: 'center',
              }}>
                <Text style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '8px' }}>
                  Workshop Repository:
                </Text>
                <Text style={{ fontSize: '18px', color: colors.success, fontFamily: fonts.code }}>
                  github.com/hoangquocvietuet
                </Text>
              </Box>
            </FlexBox>
            <Text style={{ fontSize: '20px', color: colors.textMuted }}>
              Oliver - Sui Developer Workshop
            </Text>
          </FlexBox>
        </Slide>
      </Deck>
    </FullscreenDeck>
  );
}
