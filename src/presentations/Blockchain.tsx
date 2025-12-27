import React from 'react';
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

// Animated Block Component
function BlockchainBlock({ index, hash, prevHash, data }: {
  index: number;
  hash: string;
  prevHash: string;
  data: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2 }}
      style={{
        background: 'rgba(77, 162, 255, 0.1)',
        border: `1px solid ${colors.primary}40`,
        borderRadius: borderRadius.md,
        padding: '12px',
        width: '180px',
        fontSize: '10px',
      }}
    >
      <FlexBox justifyContent="space-between" style={{ marginBottom: '8px' }}>
        <Text style={{ color: colors.primary, fontWeight: 600, fontSize: '12px' }}>Block #{index}</Text>
        <Box style={{
          background: colors.success,
          color: '#000',
          padding: '2px 6px',
          borderRadius: borderRadius.sm,
          fontSize: '9px',
          fontWeight: 600,
        }}>Valid</Box>
      </FlexBox>

      <Box style={{ marginBottom: '6px' }}>
        <Text style={{ color: colors.textMuted, fontSize: '9px' }}>Hash:</Text>
        <Text style={{ color: colors.success, fontFamily: fonts.code, fontSize: '9px' }}>{hash}</Text>
      </Box>

      <Box style={{ marginBottom: '6px' }}>
        <Text style={{ color: colors.textMuted, fontSize: '9px' }}>Prev Hash:</Text>
        <Text style={{ color: colors.warning, fontFamily: fonts.code, fontSize: '9px' }}>{prevHash}</Text>
      </Box>

      <Box>
        <Text style={{ color: colors.textMuted, fontSize: '9px' }}>Data:</Text>
        <Text style={{ color: colors.text, fontSize: '9px' }}>{data}</Text>
      </Box>
    </motion.div>
  );
}

// Chain connector arrow
function ChainConnector() {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
      <svg width="30" height="20" viewBox="0 0 30 20">
        <line x1="0" y1="10" x2="20" y2="10" stroke={colors.primary} strokeWidth="2" />
        <polygon points="20,5 30,10 20,15" fill={colors.primary} />
      </svg>
    </Box>
  );
}

// Layer diagram component
function LayerDiagram() {
  const layers = [
    { name: 'Application Layer', desc: 'DApps, Wallets, DEXs', color: colors.chartPurple },
    { name: 'Smart Contract', desc: 'Business Logic', color: colors.primary },
    { name: 'Consensus Layer', desc: 'PoW, PoS, BFT', color: colors.success },
    { name: 'Network Layer', desc: 'P2P Communication', color: colors.warning },
    { name: 'Data Layer', desc: 'Blocks, Transactions', color: colors.error },
  ];

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {layers.map((layer, i) => (
        <motion.div
          key={layer.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          style={{
            background: `${layer.color}15`,
            border: `1px solid ${layer.color}40`,
            borderRadius: borderRadius.md,
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FlexBox alignItems="center" style={{ gap: '12px' }}>
            <Box style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: layer.color,
            }} />
            <Text style={{ color: colors.text, fontWeight: 600, fontSize: '13px' }}>{layer.name}</Text>
          </FlexBox>
          <Text style={{ color: colors.textSecondary, fontSize: '11px' }}>{layer.desc}</Text>
        </motion.div>
      ))}
    </Box>
  );
}

export function BlockchainPresentation() {
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
            <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>🔗</span>
            <Heading fontSize="48px" style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.success})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}>
              Blockchain Architecture
            </Heading>
          </motion.div>
          <Text fontSize="20px" color="secondary" style={{ marginBottom: '32px' }}>
            Understanding the Building Blocks
          </Text>
          <Text fontSize="12px" color="secondary" style={{ marginTop: '48px', opacity: 0.5 }}>
            Use ← → arrows to navigate
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 2: What is Blockchain? */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="32px" style={{ marginBottom: '24px' }}>What is Blockchain?</Heading>

        <FlexBox style={{ gap: '24px' }}>
          <Box style={{ flex: 1 }}>
            <Text fontSize="14px" color="secondary" style={{ lineHeight: 1.8, marginBottom: '24px' }}>
              A blockchain is a <span style={{ color: colors.primary }}>distributed ledger</span> that records transactions across many computers. The data is secured through <span style={{ color: colors.success }}>cryptographic hashing</span> and <span style={{ color: colors.warning }}>consensus mechanisms</span>.
            </Text>

            <Box style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🔐', title: 'Immutable', desc: 'Once written, data cannot be changed' },
                { icon: '🌐', title: 'Decentralized', desc: 'No single point of failure' },
                { icon: '👁️', title: 'Transparent', desc: 'All transactions are publicly visible' },
              ].map((item, i) => (
                <Appear key={i}>
                  <FlexBox alignItems="center" style={{
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(77, 162, 255, 0.1)',
                    borderRadius: borderRadius.md,
                  }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <Box>
                      <Text style={{ fontSize: '13px', fontWeight: 600, color: colors.text }}>{item.title}</Text>
                      <Text style={{ fontSize: '11px', color: colors.textSecondary }}>{item.desc}</Text>
                    </Box>
                  </FlexBox>
                </Appear>
              ))}
            </Box>
          </Box>

          <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 200 200" style={{ width: '200px', height: '200px' }}>
              {/* Central hub */}
              <circle cx="100" cy="100" r="25" fill={colors.primary} opacity="0.8" />
              <text x="100" y="105" fill="#fff" fontSize="10" textAnchor="middle">Ledger</text>

              {/* Nodes */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 100 + 70 * Math.cos(rad);
                const y = 100 + 70 * Math.sin(rad);
                return (
                  <g key={i}>
                    <line x1="100" y1="100" x2={x} y2={y} stroke={colors.primary} strokeWidth="1" opacity="0.5" />
                    <circle cx={x} cy={y} r="12" fill={colors.success} opacity="0.8" />
                    <text x={x} y={y + 4} fill="#fff" fontSize="8" textAnchor="middle">N{i + 1}</text>
                  </g>
                );
              })}
            </svg>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 3: Block Structure */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '24px' }}>Block Structure</Heading>

        <FlexBox alignItems="center" justifyContent="center" style={{ marginBottom: '24px' }}>
          <BlockchainBlock
            index={0}
            hash="0x8f4a..."
            prevHash="0x0000..."
            data="Genesis"
          />
          <ChainConnector />
          <BlockchainBlock
            index={1}
            hash="0x2b7c..."
            prevHash="0x8f4a..."
            data="Tx: A→B 10"
          />
          <ChainConnector />
          <BlockchainBlock
            index={2}
            hash="0x9e3d..."
            prevHash="0x2b7c..."
            data="Tx: B→C 5"
          />
          <ChainConnector />
          <BlockchainBlock
            index={3}
            hash="0x1a5f..."
            prevHash="0x9e3d..."
            data="Tx: C→A 3"
          />
        </FlexBox>

        <Box style={{
          background: 'rgba(77, 162, 255, 0.1)',
          border: `1px solid ${colors.primary}30`,
          borderRadius: borderRadius.md,
          padding: '16px',
          textAlign: 'center',
        }}>
          <Text fontSize="12px" color="secondary">
            Each block contains a <span style={{ color: colors.success }}>hash</span> of the previous block, creating a chain.
            Changing any block would invalidate all subsequent hashes.
          </Text>
        </Box>
      </Slide>

      {/* Slide 4: Architecture Layers */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '24px' }}>Blockchain Architecture Layers</Heading>

        <FlexBox style={{ gap: '32px' }}>
          <Box style={{ flex: 1 }}>
            <LayerDiagram />
          </Box>

          <Box style={{ flex: 1 }}>
            <Box style={{
              background: 'rgba(15, 29, 50, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: borderRadius.lg,
              padding: '20px',
            }}>
              <Text fontSize="14px" style={{ fontWeight: 600, marginBottom: '16px' }}>Layer Responsibilities</Text>
              <Text fontSize="12px" color="secondary" style={{ lineHeight: 1.8 }}>
                <span style={{ color: colors.chartPurple }}>• Application:</span> User interfaces and business logic<br />
                <span style={{ color: colors.primary }}>• Smart Contract:</span> Programmable rules and automation<br />
                <span style={{ color: colors.success }}>• Consensus:</span> Agreement on transaction validity<br />
                <span style={{ color: colors.warning }}>• Network:</span> Node discovery and propagation<br />
                <span style={{ color: colors.error }}>• Data:</span> Storage of blocks and state
              </Text>
            </Box>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 5: Consensus Mechanisms */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '24px' }}>Consensus Mechanisms</Heading>

        <FlexBox style={{ gap: '16px' }}>
          {[
            {
              title: 'Proof of Work',
              icon: '⛏️',
              color: colors.warning,
              pros: ['Battle-tested', 'High security'],
              cons: ['Energy intensive', 'Slow finality'],
            },
            {
              title: 'Proof of Stake',
              icon: '🎯',
              color: colors.success,
              pros: ['Energy efficient', 'Fast finality'],
              cons: ['Wealth concentration', 'Nothing at stake'],
            },
            {
              title: 'BFT Variants',
              icon: '🤝',
              color: colors.primary,
              pros: ['Instant finality', 'High throughput'],
              cons: ['Limited scalability', 'Permissioned'],
            },
          ].map((consensus, i) => (
            <Appear key={i}>
              <Box style={{
                flex: 1,
                background: `${consensus.color}10`,
                border: `1px solid ${consensus.color}30`,
                borderRadius: borderRadius.lg,
                padding: '16px',
              }}>
                <FlexBox alignItems="center" style={{ gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{consensus.icon}</span>
                  <Text style={{ color: consensus.color, fontWeight: 600, fontSize: '14px' }}>{consensus.title}</Text>
                </FlexBox>

                <Box style={{ marginBottom: '8px' }}>
                  <Text style={{ color: colors.success, fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>+ Pros</Text>
                  {consensus.pros.map((pro, j) => (
                    <Text key={j} style={{ color: colors.textSecondary, fontSize: '10px', marginBottom: '2px' }}>• {pro}</Text>
                  ))}
                </Box>

                <Box>
                  <Text style={{ color: colors.error, fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>- Cons</Text>
                  {consensus.cons.map((con, j) => (
                    <Text key={j} style={{ color: colors.textSecondary, fontSize: '10px', marginBottom: '2px' }}>• {con}</Text>
                  ))}
                </Box>
              </Box>
            </Appear>
          ))}
        </FlexBox>
      </Slide>

      {/* Slide 6: Code Example */}
      <Slide backgroundColor="tertiary">
        <Heading fontSize="28px" style={{ marginBottom: '20px' }}>Simple Block Implementation</Heading>

        <Box style={{ fontSize: '11px' }}>
          <CodePane language="typescript" showLineNumbers>
{`import { createHash } from 'crypto';

interface Block {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  hash: string;
  nonce: number;
}

function calculateHash(block: Omit<Block, 'hash'>): string {
  const content = block.index + block.timestamp +
                  block.data + block.previousHash + block.nonce;
  return createHash('sha256').update(content).digest('hex');
}

function mineBlock(index: number, data: string, prevHash: string): Block {
  let nonce = 0;
  let hash = '';

  // Simple PoW: find hash starting with "00"
  while (!hash.startsWith('00')) {
    nonce++;
    hash = calculateHash({ index, timestamp: Date.now(), data, previousHash: prevHash, nonce });
  }

  return { index, timestamp: Date.now(), data, previousHash: prevHash, hash, nonce };
}`}
          </CodePane>
        </Box>
      </Slide>

      {/* Slide 7: Summary */}
      <Slide backgroundColor="tertiary">
        <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <Heading fontSize="36px" style={{ marginBottom: '32px' }}>Summary</Heading>

          <Box style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '🔗', text: 'Blockchain links blocks using cryptographic hashes' },
              { icon: '🏗️', text: 'Five layers: Data, Network, Consensus, Contract, Application' },
              { icon: '⚖️', text: 'Consensus mechanisms ensure network agreement' },
              { icon: '🔒', text: 'Immutability comes from hash chain integrity' },
            ].map((item, i) => (
              <Appear key={i}>
                <FlexBox alignItems="center" style={{
                  gap: '16px',
                  padding: '14px 20px',
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.2)',
                  borderRadius: borderRadius.md,
                }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <Text fontSize="13px" color="secondary">{item.text}</Text>
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
