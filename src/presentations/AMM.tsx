import React, { useState, useMemo } from 'react';
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

// Fullscreen wrapper - applies CSS for viewport-filling slides
function FullscreenDeck({ children }: { children: React.ReactNode }) {
  return (
    <div className="fullscreen-presentation">
      {children}
    </div>
  );
}

// Interactive AMM Curve Visualization
function AMMCurve({ k = 10000 }: { k?: number }) {
  const [inputAmount, setInputAmount] = useState(100);

  const { curvePoints, currentPoint, tradeResult } = useMemo(() => {
    const points: string[] = [];
    const minX = 20;
    const maxX = 500;
    const step = 5;

    // Generate curve points for x * y = k
    for (let x = minX; x <= maxX; x += step) {
      const y = k / x;
      // Scale for SVG (flip y for correct orientation)
      const scaledX = x;
      const scaledY = 300 - (y / 2);
      if (scaledY > 0 && scaledY < 300) {
        points.push(`${scaledX},${scaledY}`);
      }
    }

    // Current position
    const currentX = inputAmount;
    const currentY = k / currentX;

    // Trade simulation: swap 10% of x for y
    const swapAmount = currentX * 0.1;
    const newX = currentX + swapAmount;
    const newY = k / newX;
    const receivedY = currentY - newY;

    return {
      curvePoints: points.join(' '),
      currentPoint: { x: currentX, y: currentY, scaledY: 300 - (currentY / 2) },
      tradeResult: {
        newX,
        newY,
        swapAmount,
        receivedY,
        priceImpact: ((swapAmount / receivedY - currentX / currentY) / (currentX / currentY) * 100).toFixed(2),
      },
    };
  }, [k, inputAmount]);

  return (
    <FlexBox flexDirection="row" justifyContent="space-between" alignItems="flex-start" style={{ gap: '32px', width: '100%' }}>
      {/* Chart */}
      <Box style={{ flex: 1 }}>
        <svg viewBox="0 0 550 320" style={{ width: '100%', maxWidth: '500px' }}>
          {/* Grid lines */}
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>

          {/* Axes */}
          <line x1="50" y1="280" x2="530" y2="280" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="50" y1="20" x2="50" y2="280" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* Axis labels */}
          <text x="290" y="310" fill={colors.textSecondary} fontSize="12" textAnchor="middle">Token X</text>
          <text x="20" y="150" fill={colors.textSecondary} fontSize="12" textAnchor="middle" transform="rotate(-90, 20, 150)">Token Y</text>

          {/* Curve */}
          <polyline
            points={curvePoints}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Current position indicator */}
          <circle
            cx={currentPoint.x}
            cy={currentPoint.scaledY}
            r="8"
            fill={colors.success}
            stroke="#fff"
            strokeWidth="2"
          />

          {/* Dashed guide lines */}
          <line
            x1={currentPoint.x}
            y1={currentPoint.scaledY}
            x2={currentPoint.x}
            y2="280"
            stroke={colors.success}
            strokeWidth="1"
            strokeDasharray="4"
          />
          <line
            x1="50"
            y1={currentPoint.scaledY}
            x2={currentPoint.x}
            y2={currentPoint.scaledY}
            stroke={colors.success}
            strokeWidth="1"
            strokeDasharray="4"
          />
        </svg>
      </Box>

      {/* Controls & Values */}
      <Box style={{
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Formula */}
        <Box style={{
          background: 'rgba(77, 162, 255, 0.1)',
          border: `1px solid ${colors.primary}`,
          borderRadius: borderRadius.md,
          padding: '12px 16px',
          textAlign: 'center',
        }}>
          <Text style={{ fontFamily: fonts.code, fontSize: '18px', color: colors.primary, margin: 0 }}>
            x × y = k = {k.toLocaleString()}
          </Text>
        </Box>

        {/* Slider */}
        <Box style={{ padding: '8px 0' }}>
          <Text style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '8px' }}>
            Adjust Token X Amount:
          </Text>
          <input
            type="range"
            min="30"
            max="450"
            value={inputAmount}
            onChange={(e) => setInputAmount(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </Box>

        {/* Current values */}
        <Box style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: borderRadius.md,
          padding: '12px',
        }}>
          <FlexBox justifyContent="space-between" style={{ marginBottom: '8px' }}>
            <Text style={{ fontSize: '12px', color: colors.textSecondary }}>Token X:</Text>
            <Text style={{ fontSize: '14px', color: colors.success, fontFamily: fonts.code }}>
              {inputAmount.toFixed(2)}
            </Text>
          </FlexBox>
          <FlexBox justifyContent="space-between">
            <Text style={{ fontSize: '12px', color: colors.textSecondary }}>Token Y:</Text>
            <Text style={{ fontSize: '14px', color: colors.primary, fontFamily: fonts.code }}>
              {currentPoint.y.toFixed(2)}
            </Text>
          </FlexBox>
        </Box>

        {/* Trade simulation */}
        <Box style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: borderRadius.md,
          padding: '12px',
        }}>
          <Text style={{ fontSize: '11px', color: colors.warning, marginBottom: '8px', fontWeight: 600 }}>
            Trade Simulation (10% swap):
          </Text>
          <FlexBox justifyContent="space-between" style={{ marginBottom: '4px' }}>
            <Text style={{ fontSize: '11px', color: colors.textSecondary }}>Swap:</Text>
            <Text style={{ fontSize: '12px', color: colors.text, fontFamily: fonts.code }}>
              {tradeResult.swapAmount.toFixed(2)} X
            </Text>
          </FlexBox>
          <FlexBox justifyContent="space-between" style={{ marginBottom: '4px' }}>
            <Text style={{ fontSize: '11px', color: colors.textSecondary }}>Receive:</Text>
            <Text style={{ fontSize: '12px', color: colors.success, fontFamily: fonts.code }}>
              {tradeResult.receivedY.toFixed(2)} Y
            </Text>
          </FlexBox>
          <FlexBox justifyContent="space-between">
            <Text style={{ fontSize: '11px', color: colors.textSecondary }}>Price Impact:</Text>
            <Text style={{ fontSize: '12px', color: colors.error, fontFamily: fonts.code }}>
              {tradeResult.priceImpact}%
            </Text>
          </FlexBox>
        </Box>
      </Box>
    </FlexBox>
  );
}

// Legend Item Component
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <FlexBox alignItems="center" style={{ gap: '8px' }}>
      <Box style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: color,
      }} />
      <Text style={{ fontSize: '12px', color: colors.textSecondary }}>{label}</Text>
    </FlexBox>
  );
}

// Step Box Component
function StepBox({ number, title, description, color = colors.primary }: {
  number: number;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: number * 0.15 }}
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        padding: '16px',
        background: `${color}10`,
        borderRadius: borderRadius.md,
        border: `1px solid ${color}30`,
      }}
    >
      <Box style={{
        minWidth: '32px',
        height: '32px',
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '14px',
        color: '#000',
      }}>
        {number}
      </Box>
      <Box>
        <Text style={{ fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>
          {title}
        </Text>
        <Text style={{ fontSize: '12px', color: colors.textSecondary, lineHeight: 1.5 }}>
          {description}
        </Text>
      </Box>
    </motion.div>
  );
}

// Comparison Card Component
function ComparisonCard({ title, items, color, icon }: {
  title: string;
  items: string[];
  color: string;
  icon: string;
}) {
  return (
    <Box style={{
      flex: 1,
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: borderRadius.lg,
      padding: '20px',
    }}>
      <FlexBox alignItems="center" style={{ gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <Heading fontSize="18px" style={{ color, margin: 0 }}>{title}</Heading>
      </FlexBox>
      {items.map((item, i) => (
        <FlexBox key={i} alignItems="center" style={{ gap: '8px', marginBottom: '8px' }}>
          <Box style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
          }} />
          <Text style={{ fontSize: '13px', color: colors.textSecondary }}>{item}</Text>
        </FlexBox>
      ))}
    </Box>
  );
}

export function AMMPresentation() {
  return (
    <FullscreenDeck>
      <Deck theme={spectacleTheme} template={() => <></>}>
      {/* Slide 1: Title */}
      <Slide backgroundColor="tertiary">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Heading fontSize="48px" style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}>
              AMM Fundamentals
            </Heading>
          </motion.div>
          <Text fontSize="20px" color="secondary" style={{ marginBottom: '32px' }}>
            Understanding Automated Market Makers
          </Text>
          <FlexBox style={{ gap: '24px' }}>
            <LegendItem color={colors.primary} label="Concepts" />
            <LegendItem color={colors.success} label="Interactive" />
            <LegendItem color={colors.warning} label="Examples" />
          </FlexBox>
          <Text fontSize="12px" color="secondary" style={{ marginTop: '48px', opacity: 0.5 }}>
            Use ← → arrows to navigate
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 2: What is an AMM? */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="32px" style={{ marginBottom: '24px' }}>What is an AMM?</Heading>

        <FlexBox style={{ gap: '24px', marginBottom: '24px' }}>
          <ComparisonCard
            title="Traditional Exchange"
            icon="📊"
            color={colors.warning}
            items={[
              'Order book matching',
              'Requires market makers',
              'Bid-ask spread',
              'Limited liquidity',
            ]}
          />
          <ComparisonCard
            title="Automated Market Maker"
            icon="🤖"
            color={colors.success}
            items={[
              'Mathematical pricing',
              'Algorithmic liquidity',
              'Constant liquidity',
              'Permissionless',
            ]}
          />
        </FlexBox>

        <Appear>
          <Box style={{
            background: 'rgba(77, 162, 255, 0.1)',
            border: `1px solid ${colors.primary}30`,
            borderRadius: borderRadius.md,
            padding: '16px',
            textAlign: 'center',
          }}>
            <Text fontSize="14px" style={{ color: colors.textSecondary }}>
              AMMs use <span style={{ color: colors.primary }}>smart contracts</span> and <span style={{ color: colors.success }}>mathematical formulas</span> to determine asset prices automatically
            </Text>
          </Box>
        </Appear>
      </Slide>

      {/* Slide 3: The Constant Product Formula */}
      <Slide backgroundColor="tertiary">
        <FlexBox justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <Heading fontSize="28px">The Constant Product Formula</Heading>
          <Box style={{
            background: 'rgba(77, 162, 255, 0.1)',
            border: `1px solid ${colors.primary}`,
            borderRadius: borderRadius.md,
            padding: '8px 16px',
          }}>
            <Text style={{ fontFamily: fonts.code, fontSize: '20px', color: colors.primary, margin: 0 }}>
              x × y = k
            </Text>
          </Box>
        </FlexBox>

        <FlexBox style={{ gap: '16px', marginBottom: '20px' }}>
          <LegendItem color={colors.success} label="x = Token X reserve" />
          <LegendItem color={colors.primary} label="y = Token Y reserve" />
          <LegendItem color={colors.warning} label="k = Constant product" />
        </FlexBox>

        <AMMCurve k={10000} />

        <Text fontSize="11px" color="secondary" style={{ textAlign: 'center', marginTop: '12px' }}>
          Move the slider to see how the curve maintains constant k while x and y vary inversely
        </Text>
      </Slide>

      {/* Slide 4: How Swaps Work */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '24px' }}>How Swaps Work</Heading>

        <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <StepBox
            number={1}
            title="User deposits Token X"
            description="The user sends a certain amount of Token X to the liquidity pool smart contract."
            color={colors.primary}
          />
          <StepBox
            number={2}
            title="Pool calculates new ratio"
            description="Using x × y = k, the pool determines the new amount of Token Y after the trade."
            color={colors.success}
          />
          <StepBox
            number={3}
            title="User receives Token Y"
            description="The difference in Token Y before and after is sent to the user, minus fees."
            color={colors.warning}
          />
          <StepBox
            number={4}
            title="Price automatically adjusts"
            description="The new ratio becomes the new spot price for future trades."
            color={colors.chartPurple}
          />
        </Box>
      </Slide>

      {/* Slide 5: Price Impact */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '16px' }}>Understanding Price Impact</Heading>

        <FlexBox style={{ gap: '24px' }}>
          <Box style={{ flex: 1 }}>
            <Text fontSize="14px" color="secondary" style={{ marginBottom: '16px', lineHeight: 1.6 }}>
              Price impact occurs because each trade changes the pool's token ratio. Larger trades relative to pool size cause higher price impact.
            </Text>

            <Box style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: borderRadius.md,
              padding: '16px',
              marginBottom: '16px',
            }}>
              <Text fontSize="12px" style={{ color: colors.error, fontWeight: 600, marginBottom: '8px' }}>
                ⚠️ High Price Impact Warning
              </Text>
              <Text fontSize="12px" color="secondary">
                Trading large amounts in small pools can result in significant value loss due to slippage.
              </Text>
            </Box>

            <Box style={{ fontSize: '11px' }}>
              <CodePane language="typescript" showLineNumbers={false}>
{`// Price impact calculation
const priceImpact =
  (tradeSize / poolLiquidity) * 100;

// Example: 1% of pool = ~1% impact
// 10% of pool = ~10% impact`}
              </CodePane>
            </Box>
          </Box>

          <Box style={{ flex: 1 }}>
            <Box style={{
              background: 'rgba(15, 29, 50, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: borderRadius.lg,
              padding: '20px',
            }}>
              <Text fontSize="14px" style={{ fontWeight: 600, marginBottom: '16px' }}>Trade Size vs Impact</Text>
              <svg viewBox="0 0 300 200" style={{ width: '100%' }}>
                {/* Grid */}
                <line x1="40" y1="170" x2="280" y2="170" stroke="rgba(255,255,255,0.2)" />
                <line x1="40" y1="20" x2="40" y2="170" stroke="rgba(255,255,255,0.2)" />

                {/* Bars */}
                {[
                  { label: '1%', value: 10 },
                  { label: '5%', value: 45 },
                  { label: '10%', value: 85 },
                  { label: '25%', value: 130 },
                ].map((bar, i) => (
                  <g key={i}>
                    <rect
                      x={60 + i * 55}
                      y={170 - bar.value}
                      width="35"
                      height={bar.value}
                      fill={bar.value > 80 ? colors.error : bar.value > 40 ? colors.warning : colors.success}
                      rx="4"
                    />
                    <text
                      x={77 + i * 55}
                      y="185"
                      fill={colors.textSecondary}
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {bar.label}
                    </text>
                  </g>
                ))}

                {/* Labels */}
                <text x="160" y="198" fill={colors.textSecondary} fontSize="10" textAnchor="middle">
                  Trade Size (% of pool)
                </text>
                <text x="15" y="95" fill={colors.textSecondary} fontSize="10" textAnchor="middle" transform="rotate(-90, 15, 95)">
                  Impact
                </text>
              </svg>
            </Box>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 6: Liquidity Provision */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '24px' }}>Becoming a Liquidity Provider</Heading>

        <FlexBox style={{ gap: '24px' }}>
          <Box style={{ flex: 1 }}>
            <Box style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: borderRadius.lg,
              padding: '20px',
              marginBottom: '16px',
            }}>
              <FlexBox alignItems="center" style={{ gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>💰</span>
                <Heading fontSize="16px" style={{ color: colors.success, margin: 0 }}>Benefits</Heading>
              </FlexBox>
              <ul style={{ margin: 0, paddingLeft: '20px', color: colors.textSecondary, fontSize: '13px', lineHeight: 1.8 }}>
                <li>Earn trading fees (typically 0.3%)</li>
                <li>Passive income from swaps</li>
                <li>Support ecosystem liquidity</li>
              </ul>
            </Box>

            <Box style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: borderRadius.lg,
              padding: '20px',
            }}>
              <FlexBox alignItems="center" style={{ gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <Heading fontSize="16px" style={{ color: colors.error, margin: 0 }}>Risks</Heading>
              </FlexBox>
              <ul style={{ margin: 0, paddingLeft: '20px', color: colors.textSecondary, fontSize: '13px', lineHeight: 1.8 }}>
                <li>Impermanent loss</li>
                <li>Smart contract risk</li>
                <li>Token price volatility</li>
              </ul>
            </Box>
          </Box>

          <Box style={{ flex: 1 }}>
            <Box style={{
              background: 'rgba(15, 29, 50, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: borderRadius.lg,
              padding: '20px',
            }}>
              <Text fontSize="14px" style={{ fontWeight: 600, marginBottom: '16px' }}>LP Token Flow</Text>
              <svg viewBox="0 0 280 180" style={{ width: '100%' }}>
                {/* Deposit */}
                <rect x="20" y="20" width="80" height="40" fill={colors.primary} rx="6" />
                <text x="60" y="45" fill="#fff" fontSize="11" textAnchor="middle">Token A</text>

                <rect x="20" y="70" width="80" height="40" fill={colors.success} rx="6" />
                <text x="60" y="95" fill="#fff" fontSize="11" textAnchor="middle">Token B</text>

                {/* Arrows */}
                <path d="M105 60 L135 90" stroke={colors.textSecondary} strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

                {/* Pool */}
                <rect x="140" y="60" width="80" height="60" fill="rgba(77, 162, 255, 0.2)" stroke={colors.primary} rx="8" />
                <text x="180" y="85" fill={colors.text} fontSize="10" textAnchor="middle">Liquidity</text>
                <text x="180" y="100" fill={colors.text} fontSize="10" textAnchor="middle">Pool</text>

                {/* LP Token */}
                <path d="M225 90 L250 90" stroke={colors.textSecondary} strokeWidth="2" fill="none" />
                <circle cx="265" cy="90" r="15" fill={colors.warning} />
                <text x="265" y="94" fill="#000" fontSize="10" textAnchor="middle">LP</text>

                {/* Label */}
                <text x="265" y="125" fill={colors.textSecondary} fontSize="9" textAnchor="middle">LP Token</text>

                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill={colors.textSecondary} />
                  </marker>
                </defs>
              </svg>
            </Box>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 7: Code Example */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '20px' }}>AMM Implementation</Heading>

        <Box style={{ fontSize: '12px' }}>
          <CodePane language="typescript" showLineNumbers>
{`// Simplified AMM swap function
function swap(
  inputAmount: number,
  inputReserve: number,
  outputReserve: number,
  feePercent: number = 0.003
): number {
  // Apply fee
  const inputWithFee = inputAmount * (1 - feePercent);

  // Constant product formula: x * y = k
  // (inputReserve + inputWithFee) * (outputReserve - output) = k
  // Solving for output:
  const numerator = inputWithFee * outputReserve;
  const denominator = inputReserve + inputWithFee;
  const output = numerator / denominator;

  return output;
}

// Example usage
const tokenAReserve = 1000;
const tokenBReserve = 1000;
const swapAmount = 100;

const received = swap(swapAmount, tokenAReserve, tokenBReserve);
console.log(\`Swapping \${swapAmount} A -> \${received.toFixed(2)} B\`);
// Output: "Swapping 100 A -> 90.66 B"`}
          </CodePane>
        </Box>
      </Slide>

      {/* Slide 8: Summary */}
      <Slide backgroundColor="tertiary">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <Heading fontSize="36px" style={{ marginBottom: '32px' }}>Key Takeaways</Heading>

          <Box style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '📐', text: 'AMMs use x × y = k to maintain constant liquidity' },
              { icon: '💱', text: 'Prices are determined algorithmically by pool ratios' },
              { icon: '📊', text: 'Larger trades cause higher price impact' },
              { icon: '💰', text: 'LPs earn fees but face impermanent loss risk' },
            ].map((item, i) => (
              <Appear key={i}>
                <FlexBox alignItems="center" style={{
                  gap: '16px',
                  padding: '16px 24px',
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.2)',
                  borderRadius: borderRadius.md,
                }}>
                  <span style={{ fontSize: '24px' }}>{item.icon}</span>
                  <Text fontSize="14px" color="secondary">{item.text}</Text>
                </FlexBox>
              </Appear>
            ))}
          </Box>

          <Text fontSize="14px" color="secondary" style={{ marginTop: '48px' }}>
            Thank you! Questions?
          </Text>
        </FlexBox>
      </Slide>
      </Deck>
    </FullscreenDeck>
  );
}
