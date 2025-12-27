import { useState, useEffect, useCallback, Component, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from './components/Home';
import { presentations, getPresentationById } from './presentations';
import { colors, borderRadius, fonts } from './theme';

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: colors.background,
          color: colors.text,
          padding: '48px',
        }}>
          <h1 style={{ color: colors.error, marginBottom: '24px' }}>Something went wrong</h1>
          <pre style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '24px',
            borderRadius: borderRadius.md,
            maxWidth: '800px',
            overflow: 'auto',
            fontFamily: fonts.code,
            fontSize: '14px',
          }}>
            {this.state.error?.toString()}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.hash = '';
            }}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: colors.primary,
              color: colors.text,
              border: 'none',
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [currentPresentationId, setCurrentPresentationId] = useState<string | null>(null);

  // Handle URL hash for direct linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && getPresentationById(hash)) {
        setCurrentPresentationId(hash);
      } else {
        setCurrentPresentationId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && currentPresentationId) {
      e.preventDefault();
      setCurrentPresentationId(null);
      window.location.hash = '';
    }
  }, [currentPresentationId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelectPresentation = (id: string) => {
    setCurrentPresentationId(id);
    window.location.hash = id;
  };

  const handleBackToHome = () => {
    setCurrentPresentationId(null);
    window.location.hash = '';
  };

  const currentPresentation = currentPresentationId
    ? getPresentationById(currentPresentationId)
    : null;

  return (
    <ErrorBoundary>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {currentPresentation ? (
            <motion.div
              key={currentPresentationId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
            >
              {/* Back button overlay */}
              <BackButton onClick={handleBackToHome} />

              {/* Presentation */}
              <div style={{ width: '100%', height: '100%' }}>
                {currentPresentation.component()}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '100%', overflow: 'auto' }}
            >
              <Home
                presentations={presentations}
                onSelectPresentation={handleSelectPresentation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}

// Back button component
function BackButton({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        background: isHovered
          ? 'rgba(77, 162, 255, 0.2)'
          : 'rgba(15, 29, 50, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isHovered ? colors.primary : 'rgba(77, 162, 255, 0.2)'}`,
        borderRadius: borderRadius.md,
        color: colors.text,
        fontSize: '14px',
        fontFamily: fonts.body,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span>Back</span>
      <kbd style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '10px',
        marginLeft: '4px',
      }}>
        Esc
      </kbd>
    </motion.button>
  );
}

export default App;
