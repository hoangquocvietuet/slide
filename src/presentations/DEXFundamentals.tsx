import { useState, useMemo } from 'react';
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

// Sui Logo SVG Component
function SuiLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.5 19.5c-1.5 2.5-4.5 4-7.5 4s-6-1.5-7.5-4c-1-1.5-1.5-3.5-1.5-5.5 0-4 2.5-7.5 6-9 .5-.5 1.5-.5 2 0 1 1 1.5 2.5 1.5 4 0 1-.5 2-1 2.5-.5.5-.5 1.5 0 2s1.5.5 2 0c1.5-1.5 2.5-3.5 2.5-6 0-1-.5-2.5-1-3.5 3.5 1.5 6 5 6 9 0 2-.5 4-1.5 5.5z"
        fill="url(#suiGradient)"
      />
      <defs>
        <linearGradient id="suiGradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4DA2FF" />
          <stop offset="1" stopColor="#6FBCF0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Interactive AMM Curve Component
function InteractiveAMMChart() {
  const [reserveX, setReserveX] = useState(100);
  const k = 20000000; // constant product

  const chartWidth = 500;
  const chartHeight = 350;
  const padding = 60;
  const chartAreaWidth = chartWidth - padding * 2;
  const chartAreaHeight = chartHeight - padding * 2;
  const minX = 20;
  const maxX = 200; // Match slider max value
  const maxY = k / (minX * 1000);
  const minY = k / (maxX * 1000);

  const { curvePoints, reserveY, price, currentScaledX, currentScaledY } = useMemo(() => {
    const points: string[] = [];
    const step = 2;

    for (let x = minX; x <= maxX; x += step) {
      const y = k / (x * 1000);
      const scaledX = padding + ((x - minX) / (maxX - minX)) * chartAreaWidth;
      const scaledY = padding + chartAreaHeight - ((y - minY) / (maxY - minY)) * chartAreaHeight;
      if (scaledY > padding && scaledY < padding + chartAreaHeight) {
        points.push(`${scaledX},${scaledY}`);
      }
    }

    const currentY = k / (reserveX * 1000);
    const currentPrice = currentY / reserveX;
    const scaledX = padding + ((reserveX - minX) / (maxX - minX)) * chartAreaWidth;
    const scaledY = padding + chartAreaHeight - ((currentY - minY) / (maxY - minY)) * chartAreaHeight;

    return {
      curvePoints: points.join(' '),
      reserveY: currentY,
      price: currentPrice,
      currentScaledX: scaledX,
      currentScaledY: scaledY,
    };
  }, [reserveX, k, padding, chartAreaWidth, chartAreaHeight, minX, maxX, minY, maxY]);

  return (
    <FlexBox style={{ gap: '40px', width: '100%', maxWidth: '1400px', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* Chart */}
      <Box style={{ flex: 1, minWidth: '500px', maxWidth: '600px' }}>
        <svg viewBox="0 0 500 350" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ammGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid lines */}
          <line x1="60" y1="300" x2="440" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="60" y1="40" x2="60" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          {/* Grid helper lines */}
          <line x1="60" y1="250" x2="440" y2="250" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />
          <line x1="60" y1="200" x2="440" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />
          <line x1="60" y1="150" x2="440" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />
          <line x1="60" y1="100" x2="440" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />
          <line x1="150" y1="40" x2="150" y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />
          <line x1="250" y1="40" x2="250" y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />
          <line x1="350" y1="40" x2="350" y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4" />

          {/* Axis labels */}
          <text x="250" y="330" fill={colors.text} fontSize="16" textAnchor="middle" fontWeight="600">Reserve X</text>
          <text x="25" y="170" fill={colors.text} fontSize="16" textAnchor="middle" fontWeight="600" transform="rotate(-90, 25, 170)">Reserve Y</text>

          {/* Curve */}
          <polyline
            points={curvePoints}
            fill="none"
            stroke="url(#ammGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Current point marker */}
          <circle cx={currentScaledX} cy={currentScaledY} r="12" fill={colors.success} stroke="#fff" strokeWidth="3" filter="url(#glow)" />
          <circle cx={currentScaledX} cy={currentScaledY} r="6" fill="#fff" />

          {/* Guide lines */}
          <line x1={currentScaledX} y1={currentScaledY} x2={currentScaledX} y2="300" stroke={colors.success} strokeWidth="2" strokeDasharray="6" opacity="0.7" />
          <line x1="60" y1={currentScaledY} x2={currentScaledX} y2={currentScaledY} stroke={colors.success} strokeWidth="2" strokeDasharray="6" opacity="0.7" />

          {/* Value labels on axes */}
          <text x={currentScaledX} y="320" fill={colors.success} fontSize="14" textAnchor="middle" fontWeight="600">{reserveX}</text>
          <text x="40" y={currentScaledY + 5} fill={colors.success} fontSize="14" textAnchor="middle" fontWeight="600">{reserveY.toFixed(0)}</text>

          {/* X-axis tick marks */}
          <line x1="60" y1="300" x2="60" y2="305" stroke={colors.textSecondary} strokeWidth="2" />
          <line x1="440" y1="300" x2="440" y2="305" stroke={colors.textSecondary} strokeWidth="2" />
          <text x="60" y="315" fill={colors.textMuted} fontSize="12" textAnchor="middle">20</text>
          <text x="440" y="315" fill={colors.textMuted} fontSize="12" textAnchor="middle">200</text>
        </svg>
      </Box>

      {/* Controls */}
      <Box style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Formula */}
        <Box style={{
          background: 'rgba(77, 162, 255, 0.2)',
          border: `3px solid ${colors.primary}`,
          borderRadius: borderRadius.lg,
          padding: '24px',
          textAlign: 'center',
        }}>
          <Text style={{ fontFamily: fonts.code, fontSize: '42px', color: colors.primary, margin: 0, fontWeight: 700 }}>
            x × y = k
          </Text>
        </Box>

        {/* Slider */}
        <Box>
          <Text style={{ fontSize: '20px', color: colors.text, marginBottom: '16px', fontWeight: 600 }}>
            Adjust Reserve X:
          </Text>
          <input
            type="range"
            min="20"
            max="200"
            value={reserveX}
            onChange={(e) => setReserveX(Number(e.target.value))}
            style={{
              width: '100%',
              height: '10px',
              cursor: 'pointer',
            }}
          />
          <FlexBox justifyContent="space-between" style={{ marginTop: '8px' }}>
            <Text style={{ fontSize: '14px', color: colors.textMuted }}>20</Text>
            <Text style={{ fontSize: '14px', color: colors.textMuted }}>200</Text>
          </FlexBox>
        </Box>

        {/* Values */}
        <Box style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          borderRadius: borderRadius.lg,
          padding: '24px',
        }}>
          <ValueRow label="Reserve X" value={reserveX.toFixed(0)} color={colors.success} />
          <ValueRow label="Reserve Y" value={reserveY.toFixed(2)} color={colors.primary} />
          <ValueRow label="Price (Y/X)" value={price.toFixed(4)} color={colors.warning} />
          <Box style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <ValueRow label="k constant" value="20,000,000 ✓" color={colors.textMuted} />
          </Box>
        </Box>

        <Box style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: borderRadius.md,
          padding: '16px',
          textAlign: 'center',
        }}>
          <Text style={{ fontSize: '16px', color: colors.text, fontWeight: 600, lineHeight: 1.6 }}>
            When x ↑ → y ↓ → k unchanged → Price changes
          </Text>
        </Box>
      </Box>
    </FlexBox>
  );
}

function ValueRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <FlexBox justifyContent="space-between" style={{ marginBottom: '12px', alignItems: 'center' }}>
      <Text style={{ fontSize: '18px', color: colors.textSecondary, fontWeight: 500 }}>{label}:</Text>
      <Text style={{ fontSize: '20px', color, fontFamily: fonts.code, fontWeight: 700 }}>{value}</Text>
    </FlexBox>
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

// Feature Card Component
function FeatureCard({ number, title, description, color = colors.primary }: {
  number: number;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.1 }}
      style={{
        flex: 1,
        maxWidth: '300px',
        background: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: borderRadius.lg,
        padding: '28px',
        textAlign: 'center',
      }}
    >
      <Box style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontWeight: 700,
        fontSize: '20px',
        color: '#000',
      }}>
        {number}
      </Box>
      <Text style={{ fontWeight: 600, fontSize: '20px', color: colors.text, marginBottom: '12px' }}>{title}</Text>
      <Text style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: 1.5 }}>{description}</Text>
    </motion.div>
  );
}

// Step Box Component
function StepBox({ number, content, color = colors.primary }: {
  number: number;
  content: string;
  color?: string;
}) {
  return (
    <FlexBox alignItems="center" style={{
      gap: '12px',
      padding: '10px 14px',
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: borderRadius.md,
    }}>
      <Box style={{
        minWidth: '24px',
        height: '24px',
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '12px',
        color: '#000',
      }}>
        {number}
      </Box>
      <Text style={{ fontSize: '16px', color: colors.text, fontFamily: fonts.code }}>{content}</Text>
    </FlexBox>
  );
}


// Fullscreen wrapper - applies CSS for viewport-filling slides
function FullscreenDeck({ children }: { children: React.ReactNode }) {
  return (
    <div className="fullscreen-presentation">
      {children}
    </div>
  );
}

export function DEXFundamentalsPresentation() {
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
                DEX Fundamentals
              </Heading>
              <Text fontSize="28px" color="secondary" style={{ marginBottom: '12px', fontWeight: 500 }}>
                Understanding Decentralized Exchanges
              </Text>
              <Text fontSize="20px" style={{ color: colors.textMuted, marginBottom: '40px' }}>
                From AMM to Sui Move Implementation
              </Text>
              <Box style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.2)',
                borderRadius: borderRadius.md,
                padding: '8px 16px',
                display: 'inline-block',
              }}>
                <Text style={{ fontSize: '18px', color: colors.primary, fontWeight: 500 }}>
                  Oliver - Sui Developer Workshop • Hanoi
                </Text>
              </Box>
            </motion.div>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 2: Agenda ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '48px', fontWeight: 700 }}>Agenda</Heading>
            <FlexBox style={{ gap: '32px', maxWidth: '1200px', width: '100%', justifyContent: 'center' }}>
              <CompareCard
                title="Part 1: DEX Fundamentals"
                color={colors.primary}
                icon="📚"
                items={[
                  'DEX vs CEX comparison',
                  'AMM & x × y = k formula',
                  'Liquidity Pools explained',
                  'Add & Remove Liquidity',
                  'Swap mechanism & Fees',
                  'Slippage & Impermanent Loss',
                ]}
              />
              <CompareCard
                title="Part 2: Sui Move Implementation"
                color={colors.success}
                icon="⚙️"
                items={[
                  'Move Language Basics',
                  'Object Design Patterns',
                  'Core Structs & Types',
                  'Liquidity & Swap Code',
                  'PTB Composability',
                  'Security & Testing',
                ]}
              />
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 3: DEX vs CEX ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '40px', fontWeight: 700 }}>DEX vs CEX</Heading>
            <FlexBox style={{ gap: '32px', maxWidth: '1200px', width: '100%', justifyContent: 'center' }}>
              <CompareCard
                title="CEX (Centralized)"
                color={colors.error}
                icon="🏦"
                items={[
                  'Custodial - they hold your funds',
                  'Order book matching model',
                  'KYC/AML required',
                  'Single point of failure',
                  'Examples: Binance, Coinbase',
                ]}
              />
              <CompareCard
                title="DEX (Decentralized)"
                color={colors.success}
                icon="🌐"
                items={[
                  'Non-custodial - you control funds',
                  'AMM algorithmic model',
                  'Permissionless access',
                  'Censorship resistant',
                  'Examples: Uniswap, Cetus, Turbos',
                ]}
              />
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 4: What is AMM? ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '32px', fontWeight: 700 }}>What is an AMM?</Heading>
            <Text fontSize="22px" color="secondary" style={{ marginBottom: '40px', textAlign: 'center', maxWidth: '800px' }}>
              Automated Market Maker - A protocol that provides liquidity algorithmically
            </Text>
            <FlexBox style={{ gap: '32px', maxWidth: '1100px', width: '100%', justifyContent: 'center' }}>
              <FeatureCard
                number={1}
                title="No Order Book"
                description="Trade against liquidity pools instead of matching buyers/sellers"
                color={colors.primary}
              />
              <FeatureCard
                number={2}
                title="Algorithmic Pricing"
                description="Mathematical formulas determine prices automatically"
                color={colors.success}
              />
              <FeatureCard
                number={3}
                title="Always Available"
                description="24/7 instant execution with guaranteed liquidity"
                color={colors.warning}
              />
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 5: Constant Product Formula (INTERACTIVE) ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <FlexBox justifyContent="space-between" alignItems="center" style={{ marginBottom: '32px', width: '100%', maxWidth: '1400px' }}>
              <Heading fontSize="44px" style={{ fontWeight: 700 }}>The Constant Product Formula</Heading>
              <Box style={{
                background: 'rgba(245, 158, 11, 0.25)',
                border: '2px solid rgba(245, 158, 11, 0.6)',
                borderRadius: borderRadius.lg,
                padding: '10px 20px',
              }}>
                <Text style={{ fontSize: '18px', color: colors.warning, fontWeight: 700 }}>⭐ INTERACTIVE</Text>
              </Box>
            </FlexBox>

            <FlexBox style={{ gap: '20px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Box style={{ background: `${colors.success}25`, padding: '12px 24px', borderRadius: borderRadius.lg, border: `1px solid ${colors.success}40` }}>
                <Text style={{ fontSize: '18px', color: colors.success, fontWeight: 600 }}>x = Reserve A</Text>
              </Box>
              <Box style={{ background: `${colors.primary}25`, padding: '12px 24px', borderRadius: borderRadius.lg, border: `1px solid ${colors.primary}40` }}>
                <Text style={{ fontSize: '18px', color: colors.primary, fontWeight: 600 }}>y = Reserve B</Text>
              </Box>
              <Box style={{ background: `${colors.warning}25`, padding: '12px 24px', borderRadius: borderRadius.lg, border: `1px solid ${colors.warning}40` }}>
                <Text style={{ fontSize: '18px', color: colors.warning, fontWeight: 600 }}>k = constant (product never changes)</Text>
              </Box>
            </FlexBox>

            <InteractiveAMMChart />
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 6: Liquidity Pools ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="44px" style={{ marginBottom: '40px', fontWeight: 700 }}>Liquidity Pools</Heading>
            <FlexBox style={{ gap: '40px', maxWidth: '1200px', width: '100%' }} alignItems="center" justifyContent="center">
              <Box style={{ flex: 1 }}>
                {/* Pool Diagram */}
                <svg viewBox="0 0 300 200" style={{ width: '100%', maxWidth: '300px' }}>
                  {/* Token boxes */}
                  <rect x="20" y="40" width="80" height="50" rx="8" fill={colors.primary} opacity="0.8" />
                  <text x="60" y="70" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="600">ETH 100</text>

                  <rect x="200" y="40" width="80" height="50" rx="8" fill={colors.success} opacity="0.8" />
                  <text x="240" y="70" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="600">USDC 200K</text>

                  {/* Arrows */}
                  <path d="M100 65 L130 100" stroke={colors.textSecondary} strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <path d="M200 65 L170 100" stroke={colors.textSecondary} strokeWidth="2" markerEnd="url(#arrowhead)" />

                  {/* Pool */}
                  <rect x="80" y="110" width="140" height="60" rx="12" fill="rgba(77, 162, 255, 0.2)" stroke={colors.primary} strokeWidth="2" />
                  <text x="150" y="135" fill={colors.text} fontSize="11" textAnchor="middle">ETH-USDC</text>
                  <text x="150" y="152" fill={colors.text} fontSize="11" textAnchor="middle">Liquidity Pool</text>

                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill={colors.textSecondary} />
                    </marker>
                  </defs>
                </svg>
              </Box>
              <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Box style={{
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.2)',
                  borderRadius: borderRadius.md,
                  padding: '20px',
                }}>
                  <Text style={{ fontSize: '20px', color: colors.text, marginBottom: '8px', fontWeight: 600 }}>💧 LPs deposit both tokens</Text>
                  <Text style={{ fontSize: '16px', color: colors.textSecondary }}>Provide equal value of each token pair</Text>
                </Box>
                <Box style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: borderRadius.md,
                  padding: '20px',
                }}>
                  <Text style={{ fontSize: '20px', color: colors.text, marginBottom: '8px', fontWeight: 600 }}>🎫 Receive LP tokens as shares</Text>
                  <Text style={{ fontSize: '16px', color: colors.textSecondary }}>Represent your ownership percentage</Text>
                </Box>
                <Box style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: borderRadius.md,
                  padding: '20px',
                }}>
                  <Text style={{ fontSize: '20px', color: colors.text, marginBottom: '8px', fontWeight: 600 }}>💰 Earn fees from trades</Text>
                  <Text style={{ fontSize: '16px', color: colors.textSecondary }}>0.3% of every swap distributed to LPs</Text>
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 7: Add Liquidity ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Add Liquidity</Heading>
            <FlexBox style={{ gap: '32px', maxWidth: '1200px', width: '100%', justifyContent: 'center' }}>
              {/* Initial Liquidity */}
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '14px',
                }}>
                  <Text style={{ fontSize: '17px', fontWeight: 600, color: colors.primary, marginBottom: '10px' }}>
                    Initial Liquidity (First Depositor)
                  </Text>
                  <Box style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: borderRadius.sm,
                    padding: '8px 12px',
                    marginBottom: '10px',
                  }}>
                    <Text style={{ fontFamily: fonts.code, fontSize: '18px', color: colors.success }}>LP = √(x × y)</Text>
                  </Box>
                  <Text style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '6px', fontWeight: 600 }}>
                    Why √(x×y) is fair?
                  </Text>
                  <Text style={{ fontSize: '13px', color: colors.textMuted, lineHeight: 1.5 }}>
                    • Geometric mean - treats both tokens equally<br />
                    • 100 ETH + 100 USDC = 100 USDC + 100 ETH<br />
                    • Prevents price manipulation
                  </Text>
                  <Box style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: borderRadius.sm,
                    padding: '6px 10px',
                    marginTop: '10px',
                  }}>
                    <Text style={{ fontSize: '13px', color: colors.success }}>
                      Ex: 100 ETH + 200,000 USDC = 4,472 LP tokens
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Adding to Existing */}
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '14px',
                }}>
                  <Text style={{ fontSize: '17px', fontWeight: 600, color: colors.success, marginBottom: '10px' }}>
                    Adding to Existing Pool
                  </Text>
                  <Box style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: borderRadius.sm,
                    padding: '8px 12px',
                    marginBottom: '10px',
                  }}>
                    <Text style={{ fontFamily: fonts.code, fontSize: '18px', color: colors.primary }}>LP = totalLP × (Δx / x)</Text>
                  </Box>
                  <Text style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '6px', fontWeight: 600 }}>
                    Why must add in same ratio?
                  </Text>
                  <Text style={{ fontSize: '13px', color: colors.textMuted, lineHeight: 1.5 }}>
                    • Preserves current price<br />
                    • Fair to existing LPs<br />
                    • No arbitrage opportunity
                  </Text>
                  <Box style={{
                    background: 'rgba(77, 162, 255, 0.1)',
                    borderRadius: borderRadius.sm,
                    padding: '6px 10px',
                    marginTop: '10px',
                  }}>
                    <Text style={{ fontSize: '13px', color: colors.primary }}>
                      Ex: Add 10 ETH → must add 20,000 USDC → get 447 LP
                    </Text>
                  </Box>
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 8: Remove Liquidity ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Remove Liquidity</Heading>
            <FlexBox style={{ gap: '24px' }} flexDirection="column" alignItems="center">
              <Box style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.3)',
                borderRadius: borderRadius.lg,
                padding: '20px',
                maxWidth: '500px',
                width: '100%',
              }}>
                <Text style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '12px' }}>Formulas:</Text>
                <Box style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: borderRadius.sm,
                  padding: '10px 16px',
                  marginBottom: '8px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '17px', color: colors.success }}>
                    Token A out = (LP burned / Total LP) × Reserve A
                  </Text>
                </Box>
                <Box style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: borderRadius.sm,
                  padding: '10px 16px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '17px', color: colors.primary }}>
                    Token B out = (LP burned / Total LP) × Reserve B
                  </Text>
                </Box>
              </Box>

              <Box style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: borderRadius.md,
                padding: '16px 24px',
              }}>
                <Text style={{ fontSize: '17px', color: colors.warning, fontWeight: 600, marginBottom: '4px' }}>
                  Example:
                </Text>
                <Text style={{ fontSize: '16px', color: colors.textSecondary }}>
                  Own 10% (447 LP) → Burn all → Receive 10 ETH + 20,000 USDC
                </Text>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 9: Swap Mechanism ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Swap Mechanism - Step-by-Step Derivation</Heading>
            <FlexBox style={{ gap: '20px' }}>
              <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <StepBox number={1} content="Constant product: x × y = k" color={colors.primary} />
                <StepBox number={2} content="After swap: (x + Δx) × (y − Δy) = k" color={colors.success} />
                <StepBox number={3} content="Both equal k: (x + Δx)(y − Δy) = xy" color={colors.warning} />
                <StepBox number={4} content="Solve for Δy: Δy = (Δx × y) / (x + Δx)" color={colors.chartPurple} />

                <Box style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: borderRadius.sm,
                  padding: '8px 12px',
                  marginTop: '4px',
                }}>
                  <Text style={{ fontSize: '13px', color: colors.textMuted }}>
                    Δx = amount in, Δy = amount out, x,y = reserves
                  </Text>
                </Box>
              </Box>

              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '16px',
                }}>
                  <Text style={{ fontSize: '17px', fontWeight: 600, color: colors.warning, marginBottom: '12px' }}>
                    Example Calculation:
                  </Text>
                  <Text style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>
                    Pool: 100 ETH / 200,000 USDC<br /><br />
                    Swap: 10 ETH → ?<br /><br />
                    Δy = (10 × 200,000) / (100 + 10)<br />
                    Δy = 2,000,000 / 110<br />
                    <span style={{ color: colors.success, fontWeight: 600 }}>Δy = 18,181.8 USDC</span>
                  </Text>
                  <Box style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    borderRadius: borderRadius.sm,
                    padding: '8px 10px',
                    marginTop: '12px',
                  }}>
                    <Text style={{ fontSize: '13px', color: colors.error }}>
                      ⚠️ Not 20,000 — that's price impact!
                    </Text>
                  </Box>
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 10: Trading Fees ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Trading Fees</Heading>
            <FlexBox style={{ gap: '24px' }}>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '16px',
                }}>
                  <Text style={{ fontSize: '42px', fontWeight: 700, color: colors.primary, marginBottom: '8px' }}>0.3%</Text>
                  <Text style={{ fontSize: '18px', color: colors.textSecondary }}>Standard Fee</Text>
                </Box>
                <FlexBox style={{ gap: '12px' }}>
                  <Box style={{
                    flex: 1,
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: borderRadius.md,
                    padding: '12px',
                    textAlign: 'center',
                  }}>
                    <Text style={{ fontSize: '24px', fontWeight: 600, color: colors.success }}>0.25%</Text>
                    <Text style={{ fontSize: '13px', color: colors.textMuted }}>To LPs</Text>
                  </Box>
                  <Box style={{
                    flex: 1,
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: borderRadius.md,
                    padding: '12px',
                    textAlign: 'center',
                  }}>
                    <Text style={{ fontSize: '24px', fontWeight: 600, color: colors.warning }}>0.05%</Text>
                    <Text style={{ fontSize: '13px', color: colors.textMuted }}>To Protocol</Text>
                  </Box>
                </FlexBox>
              </Box>
              <Box style={{ flex: 1 }}>
                <Text style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '12px' }}>
                  Formula with fees:
                </Text>
                <Box style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: borderRadius.md,
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '14px', color: colors.success, lineHeight: 1.6 }}>
                    Δy = (Δx × 997 × y) / (x × 1000 + Δx × 997)
                  </Text>
                </Box>
                <Text style={{ fontSize: '14px', color: colors.textMuted }}>
                  997/1000 = 0.997 → 0.3% fee deducted from input
                </Text>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 11: Slippage ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Slippage</Heading>
            <FlexBox style={{ gap: '24px' }}>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '16px',
                  marginBottom: '16px',
                }}>
                  <Text style={{ fontSize: '18px', fontWeight: 600, color: colors.error, marginBottom: '8px' }}>
                    What is Slippage?
                  </Text>
                  <Text style={{ fontSize: '16px', color: colors.textSecondary }}>
                    Difference between expected and executed price
                  </Text>
                </Box>
                <Text style={{ fontSize: '16px', fontWeight: 600, color: colors.text, marginBottom: '8px' }}>Causes:</Text>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['Large trade size', 'Low liquidity', 'High volatility', 'Network delays'].map((cause, i) => (
                    <FlexBox key={i} alignItems="center" style={{ gap: '8px' }}>
                      <Box style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.warning }} />
                      <Text style={{ fontSize: '14px', color: colors.textSecondary }}>{cause}</Text>
                    </FlexBox>
                  ))}
                </Box>
              </Box>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '16px',
                }}>
                  <Text style={{ fontSize: '16px', fontWeight: 600, color: colors.success, marginBottom: '10px' }}>
                    Slippage Protection:
                  </Text>
                  <Box style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: borderRadius.sm,
                    padding: '10px',
                    marginBottom: '10px',
                  }}>
                    <Text style={{ fontFamily: fonts.code, fontSize: '14px', color: colors.primary }}>
                      minOut = expected × (1 - tolerance)
                    </Text>
                  </Box>
                  <Text style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.5 }}>
                    Example: 1% tolerance<br />
                    Expected: 1000 tokens<br />
                    Minimum: 990 tokens<br />
                    <span style={{ color: colors.error }}>Reverts if output {'<'} 990</span>
                  </Text>
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 12: Price Impact vs Slippage ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Price Impact vs Slippage</Heading>
            <FlexBox style={{ gap: '20px' }}>
              <Box style={{
                flex: 1,
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: borderRadius.lg,
                padding: '16px',
              }}>
                <Text style={{ fontSize: '18px', fontWeight: 600, color: colors.warning, marginBottom: '12px' }}>
                  Price Impact
                </Text>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Your trade moves the price',
                    'Determined by trade size vs liquidity',
                    'Large trade + Small pool = High impact',
                    'Predictable and calculable',
                  ].map((item, i) => (
                    <FlexBox key={i} alignItems="flex-start" style={{ gap: '8px' }}>
                      <Box style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.warning, marginTop: '4px' }} />
                      <Text style={{ fontSize: '14px', color: colors.textSecondary }}>{item}</Text>
                    </FlexBox>
                  ))}
                </Box>
              </Box>
              <Box style={{
                flex: 1,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: borderRadius.lg,
                padding: '16px',
              }}>
                <Text style={{ fontSize: '18px', fontWeight: 600, color: colors.error, marginBottom: '12px' }}>
                  Slippage
                </Text>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Price changes between quote & execution',
                    'Caused by other trades or delays',
                    'MEV bots can sandwich trades',
                    'Unpredictable, need tolerance setting',
                  ].map((item, i) => (
                    <FlexBox key={i} alignItems="flex-start" style={{ gap: '8px' }}>
                      <Box style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.error, marginTop: '4px' }} />
                      <Text style={{ fontSize: '14px', color: colors.textSecondary }}>{item}</Text>
                    </FlexBox>
                  ))}
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 13: Impermanent Loss ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>Impermanent Loss</Heading>
            <FlexBox style={{ gap: '40px', maxWidth: '1100px', width: '100%' }}>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '24px',
                  marginBottom: '20px',
                }}>
                  <Text style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '12px' }}>Formula:</Text>
                  <Box style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: borderRadius.sm,
                    padding: '14px',
                  }}>
                    <Text style={{ fontFamily: fonts.code, fontSize: '18px', color: colors.chartPurple }}>
                      IL = 2√(price ratio) / (1 + price ratio) - 1
                    </Text>
                  </Box>
                </Box>
                <Text style={{ fontSize: '16px', color: colors.textMuted, lineHeight: 1.6 }}>
                  IL becomes permanent only when withdrawing at a different price ratio than when depositing.
                </Text>
              </Box>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(15, 29, 50, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: borderRadius.md,
                  overflow: 'hidden',
                }}>
                  <FlexBox style={{
                    background: 'rgba(77, 162, 255, 0.15)',
                    padding: '12px 20px',
                  }}>
                    <Text style={{ flex: 1, fontSize: '16px', fontWeight: 600, color: colors.primary }}>Price Change</Text>
                    <Text style={{ flex: 1, fontSize: '16px', fontWeight: 600, color: colors.primary }}>IL</Text>
                  </FlexBox>
                  {[
                    ['1.25x (25% up)', '0.6%'],
                    ['1.5x (50% up)', '2.0%'],
                    ['2x (100% up)', '5.7%'],
                    ['5x (400% up)', '25.5%'],
                  ].map((row, i) => (
                    <FlexBox key={i} style={{
                      padding: '12px 20px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    }}>
                      <Text style={{ flex: 1, fontSize: '16px', color: colors.textSecondary }}>{row[0]}</Text>
                      <Text style={{ flex: 1, fontSize: '16px', color: colors.warning, fontWeight: 600 }}>{row[1]}</Text>
                    </FlexBox>
                  ))}
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 14: Key Takeaways ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="40px" style={{ marginBottom: '32px', fontWeight: 700 }}>Key Takeaways - Part 1</Heading>
            <Box style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📐', text: 'AMMs use x × y = k for algorithmic pricing' },
                { icon: '💧', text: 'LPs deposit both tokens, receive LP tokens as shares' },
                { icon: '💸', text: 'Swaps have fees (0.3%) paid to liquidity providers' },
                { icon: '🛡️', text: 'Slippage protection prevents unfavorable executions' },
                { icon: '⚠️', text: 'LPs risk impermanent loss when prices diverge' },
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

        {/* ==================== SLIDE 15: Move Language Basics ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '48px', fontWeight: 700 }}>Move Language Basics</Heading>
            <FlexBox style={{ gap: '48px', maxWidth: '1100px', width: '100%' }}>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '28px',
                }}>
                  <Text style={{ fontSize: '22px', fontWeight: 600, color: colors.success, marginBottom: '20px' }}>
                    Why Move for DEX?
                  </Text>
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      'Resource-oriented programming',
                      'Linear types prevent double-spending',
                      'Built-in safety guarantees',
                      'Native support for digital assets',
                    ].map((item, i) => (
                      <FlexBox key={i} alignItems="center" style={{ gap: '12px' }}>
                        <Text style={{ color: colors.success, fontSize: '20px' }}>✓</Text>
                        <Text style={{ fontSize: '18px', color: colors.textSecondary }}>{item}</Text>
                      </FlexBox>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box style={{ flex: 1 }}>
                <Box style={{
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  borderRadius: borderRadius.lg,
                  padding: '28px',
                }}>
                  <Text style={{ fontSize: '22px', fontWeight: 600, color: colors.primary, marginBottom: '20px' }}>
                    Move vs Solidity
                  </Text>
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { feature: 'Resources', desc: "Assets can't be copied/dropped" },
                      { feature: 'Generics', desc: 'Type-safe coin operations' },
                      { feature: 'Abilities', desc: 'copy, drop, store, key' },
                      { feature: 'Reentrancy', desc: 'Prevented by design' },
                    ].map((item, i) => (
                      <FlexBox key={i} style={{ gap: '12px' }}>
                        <Text style={{ fontSize: '18px', color: colors.primary, fontWeight: 600, minWidth: '100px' }}>{item.feature}</Text>
                        <Text style={{ fontSize: '18px', color: colors.textSecondary }}>{item.desc}</Text>
                      </FlexBox>
                    ))}
                  </Box>
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 16: Sui DEX Architecture ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>Sui DEX Architecture</Heading>
            <FlexBox justifyContent="center" style={{ width: '100%', maxWidth: '700px' }}>
              <svg viewBox="0 0 500 320" style={{ width: '100%' }}>
                {/* Frontend */}
                <rect x="150" y="20" width="200" height="50" rx="10" fill={colors.chartPurple} opacity="0.9" />
                <text x="250" y="52" fill="#fff" fontSize="16" textAnchor="middle" fontWeight="600">Frontend (React/TS)</text>

                {/* Arrow */}
                <path d="M250 70 L250 110" stroke={colors.textSecondary} strokeWidth="3" markerEnd="url(#arrowhead2)" />

                {/* PTB */}
                <rect x="100" y="115" width="300" height="50" rx="10" fill={colors.warning} opacity="0.9" />
                <text x="250" y="147" fill="#fff" fontSize="15" textAnchor="middle" fontWeight="600">PTB (Programmable Transaction Block)</text>

                {/* Arrow */}
                <path d="M250 165 L250 205" stroke={colors.textSecondary} strokeWidth="3" markerEnd="url(#arrowhead2)" />

                {/* Modules */}
                <rect x="40" y="210" width="120" height="45" rx="8" fill={colors.primary} opacity="0.9" />
                <text x="100" y="240" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="600">Pool</text>

                <rect x="190" y="210" width="120" height="45" rx="8" fill={colors.success} opacity="0.9" />
                <text x="250" y="240" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="600">LP Token</text>

                <rect x="340" y="210" width="120" height="45" rx="8" fill={colors.chartPink} opacity="0.9" />
                <text x="400" y="240" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="600">Swap</text>

                {/* PTB explanation */}
                <text x="250" y="285" fill={colors.textSecondary} fontSize="14" textAnchor="middle">
                  PTB chains calls atomically:
                </text>
                <text x="250" y="308" fill={colors.primary} fontSize="14" textAnchor="middle" fontFamily="monospace">
                  swap() → swap() → transfer()
                </text>

                <defs>
                  <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={colors.textSecondary} />
                  </marker>
                </defs>
              </svg>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 17: Module Structure ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '48px', fontWeight: 700 }}>Module Structure</Heading>
            <FlexBox style={{ gap: '20px', maxWidth: '1100px', justifyContent: 'center' }} flexWrap="wrap">
              {[
                { name: 'dex::pool', desc: 'Pool creation & reserves', color: colors.primary },
                { name: 'dex::swap', desc: 'Token swap logic', color: colors.success },
                { name: 'dex::liquidity', desc: 'Add/remove liquidity', color: colors.warning },
                { name: 'dex::lp_token', desc: 'LP token mint/burn', color: colors.chartPurple },
                { name: 'dex::registry', desc: 'Pool lookup & management', color: colors.error },
                { name: 'dex::math', desc: 'AMM calculations', color: colors.chartPink },
                { name: 'dex::events', desc: 'Emit swap/LP events', color: colors.chartCyan },
              ].map((mod, i) => (
                <Box key={i} style={{
                  background: `${mod.color}15`,
                  border: `2px solid ${mod.color}50`,
                  borderRadius: borderRadius.lg,
                  padding: '20px 28px',
                  minWidth: '280px',
                }}>
                  <Text style={{ fontFamily: fonts.code, fontSize: '20px', color: mod.color, fontWeight: 600, marginBottom: '8px' }}>{mod.name}</Text>
                  <Text style={{ fontSize: '16px', color: colors.textSecondary }}>{mod.desc}</Text>
                </Box>
              ))}
            </FlexBox>
            <Box style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: borderRadius.lg,
              padding: '16px 32px',
              marginTop: '36px',
              textAlign: 'center',
            }}>
              <Text style={{ fontSize: '20px', color: colors.success, fontWeight: 600 }}>
                💡 No router needed — Sui PTBs handle composability!
              </Text>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 18: Object Design Patterns ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '48px', fontWeight: 700 }}>Object Design Patterns</Heading>
            <Box style={{ maxWidth: '900px', width: '100%' }}>
              {[
                { pattern: 'Multiple Pool Objects', desc: 'Parallel tx execution, higher throughput', color: colors.primary },
                { pattern: 'Shared vs Owned', desc: 'Shared Pool (anyone swaps), Owned LP (fast transfers)', color: colors.success },
                { pattern: 'Centralized Registry', desc: 'On-chain pool lookup, prevent duplicates', color: colors.warning },
                { pattern: 'Phantom Types <X, Y>', desc: 'Compile-time type safety', color: colors.chartPurple },
              ].map((item, i) => (
                <Box key={i} style={{
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: borderRadius.md,
                  padding: '20px 28px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                }}>
                  <Text style={{ fontSize: '20px', fontWeight: 600, color: item.color, minWidth: '280px' }}>{item.pattern}</Text>
                  <Text style={{ fontSize: '18px', color: colors.textSecondary }}>{item.desc}</Text>
                </Box>
              ))}
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 19: Core Structs ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Core Structs (Types)</Heading>
            <FlexBox style={{ gap: '24px', width: '100%', maxWidth: '1100px' }}>
              <Box style={{ fontSize: '14px', flex: 1 }}>
                <CodePane language="rust" showLineNumbers>
                  {`/// AMM Pool holding two token reserves
public struct Pool<phantom X, phantom Y> has key, store {
    id: UID,
    balance_x: Balance<X>,
    balance_y: Balance<Y>,
    lp_supply: Supply<LP<X, Y>>,
    fee_bps: u64,  // 30 = 0.3%
}

/// LP Token with phantom types
public struct LP<phantom X, phantom Y> has drop {}

/// Admin capability
public struct AdminCap has key, store { id: UID }`}
                </CodePane>
              </Box>
              <Box style={{ fontSize: '14px', flex: 1 }}>
                <CodePane language="rust" showLineNumbers>
                  {`/// Centralized registry for pool lookup
public struct Registry has key {
    id: UID,
    pools: Table<PoolKey, PoolInfo>,
    pool_count: u64,
}

/// Key for pool lookup (sorted pair)
public struct PoolKey has copy, drop, store {
    type_x: TypeName,
    type_y: TypeName,
}

/// Pool information
public struct PoolInfo has copy, drop, store {
    pool_id: ID,
    created_at: u64,
    is_active: bool,
}`}
                </CodePane>
              </Box>
            </FlexBox>
            <FlexBox style={{ gap: '20px', marginTop: '24px', maxWidth: '1100px' }}>
              <Box style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.3)',
                borderRadius: borderRadius.md,
                padding: '12px 20px',
                flex: 1,
              }}>
                <Text style={{ fontSize: '16px', color: colors.primary, fontWeight: 600 }}>phantom X, Y</Text>
                <Text style={{ fontSize: '14px', color: colors.textSecondary, marginTop: '4px' }}>Type safety without storage cost</Text>
              </Box>
              <Box style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: borderRadius.md,
                padding: '12px 20px',
                flex: 1,
              }}>
                <Text style={{ fontSize: '16px', color: colors.success, fontWeight: 600 }}>key, store</Text>
                <Text style={{ fontSize: '14px', color: colors.textSecondary, marginTop: '4px' }}>Can be stored and has UID</Text>
              </Box>
              <Box style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: borderRadius.md,
                padding: '12px 20px',
                flex: 1,
              }}>
                <Text style={{ fontSize: '16px', color: colors.error, fontWeight: 600 }}>Registry</Text>
                <Text style={{ fontSize: '14px', color: colors.textSecondary, marginTop: '4px' }}>On-chain pool lookup</Text>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 20: Add Liquidity Code ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '36px', fontWeight: 700 }}>Add Liquidity (Move Code)</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="rust" showLineNumbers>
                {`public fun add_liquidity<X, Y>(
    pool: &mut Pool<X, Y>,
    coin_x: Coin<X>,
    coin_y: Coin<Y>,
    ctx: &mut TxContext,
): Coin<LP<X, Y>> {
    let amount_x = coin::value(&coin_x);
    let amount_y = coin::value(&coin_y);
    let lp_supply = pool::get_lp_supply(pool);

    let lp_amount = if (lp_supply == 0) {
        // Initial: LP = sqrt(x * y) - MINIMUM_LIQUIDITY
        math::calculate_initial_lp(amount_x, amount_y) - 1000
    } else {
        // Proportional: LP = min(dx/x, dy/y) * total_lp
        math::calculate_subsequent_lp(amount_x, amount_y, ...)
    };

    // Add to reserves & mint LP tokens
    balance::join(pool::borrow_balance_x_mut(pool), coin::into_balance(coin_x));
    balance::join(pool::borrow_balance_y_mut(pool), coin::into_balance(coin_y));
    coin::from_balance(
        balance::increase_supply(pool::borrow_lp_supply_mut(pool), lp_amount), ctx
    )
}`}
              </CodePane>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 21: Swap Function Code ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '36px', fontWeight: 700 }}>Swap Function (Move Code)</Heading>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="rust" showLineNumbers>
                {`public fun swap_x_to_y<X, Y>(
    pool: &mut Pool<X, Y>,
    coin_in: Coin<X>,
    min_out: u64,
    ctx: &mut TxContext,
): Coin<Y> {
    let amount_in = coin::value(&coin_in);
    let (reserve_x, reserve_y) = pool::get_reserves(pool);
    let fee_bps = pool::get_fee_bps(pool);

    // Calculate output: dy = (dx * (10000-fee) * y) / (x*10000 + dx*(10000-fee))
    let amount_out = math::calculate_swap_output(
        amount_in, reserve_x, reserve_y, fee_bps
    );

    // Slippage protection
    assert!(amount_out >= min_out, E_SLIPPAGE_EXCEEDED);

    // Add input, remove output
    balance::join(pool::borrow_balance_x_mut(pool), coin::into_balance(coin_in));
    coin::from_balance(
        balance::split(pool::borrow_balance_y_mut(pool), amount_out), ctx
    )
}`}
              </CodePane>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 22: PTB Composability ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '24px', fontWeight: 700 }}>PTB Composability</Heading>
            <Text style={{ fontSize: '20px', color: colors.textSecondary, marginBottom: '24px' }}>
              Multi-hop swap example (TypeScript):
            </Text>
            <Box style={{ fontSize: '15px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`const tx = new Transaction();

// Swap 1: SUI -> USDC
const [usdcCoin] = tx.moveCall({
  target: \`\${PKG}::swap::swap_x_to_y\`,
  typeArguments: [SUI_TYPE, USDC_TYPE],
  arguments: [pool1, suiCoin, tx.pure.u64(minUsdc)],
});

// Swap 2: USDC -> USDT (chain output from swap 1!)
const [usdtCoin] = tx.moveCall({
  target: \`\${PKG}::swap::swap_x_to_y\`,
  typeArguments: [USDC_TYPE, USDT_TYPE],
  arguments: [pool2, usdcCoin, tx.pure.u64(minUsdt)],
});

// Transfer result to sender
tx.transferObjects([usdtCoin], sender);

// All in one atomic transaction - no router needed!`}
              </CodePane>
            </Box>
            <Box style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: borderRadius.lg,
              padding: '16px 32px',
              marginTop: '28px',
            }}>
              <Text style={{ fontSize: '18px', color: colors.success, fontWeight: 600 }}>
                💡 PTB chains calls atomically — no router contract needed!
              </Text>
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 23: Query Registry with SuiClient ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '24px', fontWeight: 700 }}>Query Registry with SuiClient</Heading>
            <Text style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '24px' }}>
              Fetch all pool information from the on-chain Registry:
            </Text>
            <Box style={{ fontSize: '14px', width: '100%', maxWidth: '1000px' }}>
              <CodePane language="typescript" showLineNumbers>
                {`import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

const client = new SuiClient({ url: getFullnodeUrl('mainnet') });

// Get Registry object with all pool data
async function getAllPools(registryId: string) {
  const registry = await client.getObject({
    id: registryId,
    options: { showContent: true },
  });

  // Access dynamic fields (pools table)
  const pools = await client.getDynamicFields({
    parentId: registryId,
  });

  // Fetch each pool's info
  const poolInfos = await Promise.all(
    pools.data.map(async (field) => {
      const poolData = await client.getDynamicFieldObject({
        parentId: registryId,
        name: field.name,
      });
      return poolData;
    })
  );

  return { registry, pools: poolInfos };
}

// Usage
const { registry, pools } = await getAllPools(REGISTRY_ID);
console.log(\`Found \${pools.length} pools\`);`}
              </CodePane>
            </Box>
            <FlexBox style={{ gap: '20px', marginTop: '24px', maxWidth: '1000px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Box style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.3)',
                borderRadius: borderRadius.md,
                padding: '12px 20px',
              }}>
                <Text style={{ fontSize: '16px', color: colors.primary, fontWeight: 500 }}>getObject() - Fetch Registry</Text>
              </Box>
              <Box style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: borderRadius.md,
                padding: '12px 20px',
              }}>
                <Text style={{ fontSize: '16px', color: colors.success, fontWeight: 500 }}>getDynamicFields() - List Pools</Text>
              </Box>
              <Box style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: borderRadius.md,
                padding: '12px 20px',
              }}>
                <Text style={{ fontSize: '16px', color: colors.error, fontWeight: 500 }}>getDynamicFieldObject() - Pool Info</Text>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 24: Security Patterns ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '48px', fontWeight: 700 }}>Security Patterns</Heading>
            <Box style={{ maxWidth: '900px', width: '100%' }}>
              {[
                { pattern: 'No Reentrancy', desc: "Move's linear types prevent by design", color: colors.success, icon: '🛡️' },
                { pattern: 'Access Control', desc: 'public fun admin_fn(cap: &AdminCap)', color: colors.primary, icon: '🔐' },
                { pattern: 'Integer Overflow', desc: 'Move aborts on overflow, use u128 for calculations', color: colors.warning, icon: '🔢' },
                { pattern: 'Input Validation', desc: 'assert!(amount > 0, E_ZERO_AMOUNT)', color: colors.chartPurple, icon: '✅' },
              ].map((item, i) => (
                <Box key={i} style={{
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: borderRadius.md,
                  padding: '20px 28px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}>
                  <Text style={{ fontSize: '28px' }}>{item.icon}</Text>
                  <Box style={{ flex: 1 }}>
                    <Text style={{ fontSize: '20px', fontWeight: 600, color: item.color, marginBottom: '4px' }}>{item.pattern}</Text>
                    <Text style={{ fontSize: '17px', color: colors.textSecondary, fontFamily: item.pattern === 'Input Validation' || item.pattern === 'Access Control' ? fonts.code : undefined }}>{item.desc}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 24: Testing Strategies ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '32px', fontWeight: 700 }}>Testing Strategies</Heading>
            <Box style={{ fontSize: '14px', width: '100%', maxWidth: '950px' }}>
              <CodePane language="rust" showLineNumbers>
                {`#[test]
fun test_swap_x_to_y() {
    let mut scenario = ts::begin(ADMIN);

    // Setup pool with initial liquidity
    setup_pool_with_liquidity(&mut scenario, 100_000_000, 200_000_000_000);

    ts::next_tx(&mut scenario, USER);
    {
        let mut pool = ts::take_shared<Pool<SUI, USDC>>(&scenario);
        let ctx = ts::ctx(&mut scenario);
        let sui_in = mint_coin<SUI>(10_000_000, ctx);

        // Swap with slippage protection
        let usdc_out = swap::swap_x_to_y(&mut pool, sui_in, 18_000_000_000, ctx);
        assert!(coin::value(&usdc_out) > 18_000_000_000, 0);

        coin::burn_for_testing(usdc_out);
        ts::return_shared(pool);
    };
    ts::end(scenario);
}`}
              </CodePane>
            </Box>
            <FlexBox style={{ gap: '16px', marginTop: '24px', maxWidth: '950px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Zero amounts', 'Large swaps', 'Slippage fails', 'Overflow'].map((item, i) => (
                <Box key={i} style={{
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  borderRadius: borderRadius.md,
                  padding: '12px 20px',
                }}>
                  <Text style={{ fontSize: '16px', color: colors.primary, fontWeight: 500 }}>✓ {item}</Text>
                </Box>
              ))}
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 25: Deployment Guide ==================== */}
        <Slide backgroundColor="tertiary">
          <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Heading fontSize="48px" style={{ marginBottom: '40px', fontWeight: 700 }}>Deployment Guide</Heading>
            <FlexBox style={{ gap: '40px', maxWidth: '1100px', width: '100%' }}>
              <Box style={{ flex: 1 }}>
                <Text style={{ fontSize: '22px', fontWeight: 600, color: colors.primary, marginBottom: '20px' }}>
                  Testnet Commands:
                </Text>
                <Box style={{ fontSize: '16px' }}>
                  <CodePane language="bash" showLineNumbers={false}>
                    {`sui move build --skip-fetch-latest-git-deps
sui move test --skip-fetch-latest-git-deps
sui client publish --gas-budget 100000000`}
                  </CodePane>
                </Box>
              </Box>
              <Box style={{ flex: 1 }}>
                <Text style={{ fontSize: '22px', fontWeight: 600, color: colors.success, marginBottom: '20px' }}>
                  Mainnet Checklist:
                </Text>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'All tests passing',
                    'Security audit completed',
                    'Gas optimization done',
                    'Admin keys secured (multisig)',
                    'Monitoring & alerts setup',
                    'Emergency pause mechanism',
                  ].map((item, i) => (
                    <FlexBox key={i} alignItems="center" style={{ gap: '12px' }}>
                      <Text style={{ color: colors.success, fontSize: '20px' }}>✓</Text>
                      <Text style={{ fontSize: '18px', color: colors.textSecondary }}>{item}</Text>
                    </FlexBox>
                  ))}
                </Box>
              </Box>
            </FlexBox>
          </FlexBox>
        </Slide>

        {/* ==================== SLIDE 26: Q&A ==================== */}
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
            <Box style={{
              background: 'rgba(77, 162, 255, 0.1)',
              border: '1px solid rgba(77, 162, 255, 0.2)',
              borderRadius: borderRadius.lg,
              padding: '20px 32px',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              <Text style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '8px' }}>
                Workshop Repository:
              </Text>
              <Text style={{ fontSize: '22px', color: colors.primary, fontFamily: fonts.code }}>
                github.com/phamdat721101/se
              </Text>
            </Box>
            <Text style={{ fontSize: '20px', color: colors.textMuted }}>
              Oliver - Sui Developer Workshop • Hanoi
            </Text>
          </FlexBox>
        </Slide>
      </Deck >
    </FullscreenDeck >
  );
}
