import { motion } from 'framer-motion';
import { colors, fonts, borderRadius, shadows, transitions } from '../theme';
import type { Presentation } from '../presentations';

interface HomeProps {
  presentations: Presentation[];
  onSelectPresentation: (id: string) => void;
}

export function Home({ presentations, onSelectPresentation }: HomeProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        <h1 style={{
          fontFamily: fonts.header,
          fontSize: '48px',
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
        }}>
          Interactive Presentations
        </h1>
        <p style={{
          fontFamily: fonts.body,
          fontSize: '18px',
          color: colors.textSecondary,
          maxWidth: '600px',
        }}>
          Technical workshops and educational content with interactive visualizations
        </p>
      </motion.div>

      {/* Presentation Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        {presentations.map((presentation, index) => (
          <PresentationCard
            key={presentation.id}
            presentation={presentation}
            index={index}
            onClick={() => onSelectPresentation(presentation.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          marginTop: '64px',
          textAlign: 'center',
          color: colors.textMuted,
          fontSize: '14px',
        }}
      >
        Press <kbd style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2px 8px',
          borderRadius: '4px',
          fontFamily: fonts.code,
          fontSize: '12px',
        }}>←</kbd> <kbd style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2px 8px',
          borderRadius: '4px',
          fontFamily: fonts.code,
          fontSize: '12px',
        }}>→</kbd> to navigate slides, <kbd style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2px 8px',
          borderRadius: '4px',
          fontFamily: fonts.code,
          fontSize: '12px',
        }}>Esc</kbd> to return home
      </motion.footer>
    </div>
  );
}

interface PresentationCardProps {
  presentation: Presentation;
  index: number;
  onClick: () => void;
}

function PresentationCard({ presentation, index, onClick }: PresentationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{
        scale: 1.02,
        boxShadow: shadows.glow,
        borderColor: colors.primary,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: colors.backgroundCard,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(77, 162, 255, 0.15)',
        borderRadius: borderRadius.lg,
        padding: '24px',
        cursor: 'pointer',
        transition: transitions.normal,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: borderRadius.md,
        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
      }}>
        {presentation.icon || '📊'}
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: fonts.header,
        fontSize: '20px',
        fontWeight: 600,
        color: colors.text,
        margin: 0,
      }}>
        {presentation.title}
      </h2>

      {/* Description */}
      <p style={{
        fontFamily: fonts.body,
        fontSize: '14px',
        color: colors.textSecondary,
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
      }}>
        {presentation.description}
      </p>

      {/* Tags */}
      {presentation.tags && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {presentation.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(77, 162, 255, 0.1)',
                border: '1px solid rgba(77, 162, 255, 0.2)',
                borderRadius: borderRadius.full,
                padding: '4px 12px',
                fontSize: '12px',
                color: colors.primary,
                fontFamily: fonts.code,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Slide count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.textMuted,
        fontSize: '12px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        {presentation.slideCount} slides
      </div>
    </motion.div>
  );
}
