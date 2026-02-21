
import React, { Suspense, ReactNode, Component } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { AudioProvider } from './context/AudioContext';
import { GamePhase } from './types';
import GameHUD from './components/HUD/GameHUD';
import Handbook from './components/UI/Handbook';
import PauseMenu from './components/UI/PauseMenu';
import FeedbackModal from './components/UI/FeedbackModal';
import PhaseTransition from './components/UI/PhaseTransition';
import LoadingScreen from './components/UI/LoadingScreen';
import StartScreen from './phases/StartScreen';

// Lazy Load Phases - Explicit Relative Paths
const Phase1 = React.lazy(() => import('./phases/Phase1'));
const Phase2 = React.lazy(() => import('./phases/Phase2'));
const Phase3 = React.lazy(() => import('./phases/Phase3'));
const Phase4 = React.lazy(() => import('./phases/Phase4'));
const Phase5 = React.lazy(() => import('./phases/Phase5'));
const Phase6 = React.lazy(() => import('./phases/Phase6'));
const Phase7 = React.lazy(() => import('./phases/Phase7'));
const Phase8 = React.lazy(() => import('./phases/Phase8'));
const Phase9 = React.lazy(() => import('./phases/Phase9'));
const Phase10 = React.lazy(() => import('./phases/Phase10'));
const Phase11 = React.lazy(() => import('./phases/Phase11'));
const Phase12 = React.lazy(() => import('./phases/Phase12'));
const Phase13 = React.lazy(() => import('./phases/Phase13'));
const Phase14 = React.lazy(() => import('./phases/Phase14'));
const Phase15 = React.lazy(() => import('./phases/Phase15'));
const Phase16 = React.lazy(() => import('./phases/Phase16'));
const Phase17 = React.lazy(() => import('./phases/Phase17'));
const Phase18 = React.lazy(() => import('./phases/Phase18'));
const Phase19 = React.lazy(() => import('./phases/Phase19'));
const Phase20 = React.lazy(() => import('./phases/Phase20'));
const Phase21 = React.lazy(() => import('./phases/Phase21'));
const Phase22 = React.lazy(() => import('./phases/Phase22'));
const Phase23 = React.lazy(() => import('./phases/Phase23'));
const Phase24 = React.lazy(() => import('./phases/Phase24'));
const Phase25 = React.lazy(() => import('./phases/Phase25'));
const Phase26 = React.lazy(() => import('./phases/Phase26'));
const Phase27 = React.lazy(() => import('./phases/Phase27'));
const Phase28 = React.lazy(() => import('./phases/Phase28'));
const Phase29 = React.lazy(() => import('./phases/Phase29'));
const Phase30 = React.lazy(() => import('./phases/Phase30'));
const Phase31 = React.lazy(() => import('./phases/Phase31'));
const Phase32 = React.lazy(() => import('./phases/Phase32'));
const Phase33 = React.lazy(() => import('./phases/Phase33'));
const Phase34 = React.lazy(() => import('./phases/Phase34'));
const Phase35 = React.lazy(() => import('./phases/Phase35'));
const VictoryScreen = React.lazy(() => import('./phases/VictoryScreen'));
const GameOver = React.lazy(() => import('./phases/GameOver'));
const PracticeSession = React.lazy(() => import('./components/Gameplay/PracticeSession'));

// Placeholder for future phases
const PlaceholderPhase: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-center h-screen bg-obsidian text-neonCyan font-mono flex-col gap-4">
    <div className="text-4xl animate-pulse">COMING SOON</div>
    <div className="border border-neonPink px-4 py-2 text-neonPink">PHASE: {name}</div>
  </div>
);

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-red-500 font-mono p-8 text-center">
          <h1 className="text-4xl mb-4">SYSTEM FAILURE</h1>
          <p className="border border-red-500 p-4 rounded mb-4 max-w-2xl bg-red-900/10 break-all">
            {this.state.error?.message || "Unknown Error"}
          </p>
          <button
            className="px-6 py-2 bg-red-600 text-black font-bold rounded hover:bg-red-500 transition-colors"
            onClick={() => window.location.reload()}
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const GameContent: React.FC = () => {
  const { state, dispatch } = useGame();

  // Render Phase Content based on state
  // Using 'key' to force re-render when phase changes or restart is triggered
  const renderPhase = () => {
    switch (state.currentPhase) {
      case GamePhase.START_SCREEN:
        return <StartScreen key="start" />;
      case GamePhase.PHASE_1_LOBBY:
      case GamePhase.PHASE_1_QUIZ:
      case GamePhase.PHASE_1_INTERVIEW:
        return <Phase1 key="phase1" />;
      case GamePhase.PHASE_2_SORTING:
        return <Phase2 key="phase2" />;
      case GamePhase.PHASE_3_ELEMENTS:
        return <Phase3 key="phase3" />;
      case GamePhase.PHASE_4_OVERHEADS:
        return <Phase4 key="phase4" />;
      case GamePhase.PHASE_5_ALLOCATION:
        return <Phase5 key="phase5" />;
      case GamePhase.PHASE_6_MATH:
        return <Phase6 key="phase6" />;
      case GamePhase.PHASE_7_DELIVERY:
        return <Phase7 key="phase7" />;
      case GamePhase.PHASE_8_PIPES:
        return <Phase8 key="phase8" />;
      case GamePhase.PHASE_9_ABSORPTION:
        return <Phase9 key="phase9" />;
      case GamePhase.PHASE_10_REALITY:
        return <Phase10 key="phase10" />;
      case GamePhase.PHASE_11_BOSS:
        return <Phase11 key="phase11" />;
      case GamePhase.PHASE_12_BEHAVIOR:
        return <Phase12 key="phase12" />;
      case GamePhase.PHASE_13_CONTRIBUTION:
        return <Phase13 key="phase13" />;
      case GamePhase.PHASE_14_RECONCILIATION:
        return <Phase14 key="phase14" />;
      case GamePhase.PHASE_15_BREAK_EVEN:
        return <Phase15 key="phase15" />;
      case GamePhase.PHASE_16_MARGIN_OF_SAFETY:
        return <Phase16 key="phase16" />;
      case GamePhase.PHASE_17_STANDARD:
        return <Phase17 key="phase17" />;
      case GamePhase.PHASE_18_SALES_VAR:
        return <Phase18 key="phase18" />;
      case GamePhase.PHASE_19_MATERIAL_VAR:
        return <Phase19 key="phase19" />;
      case GamePhase.PHASE_20_LABOR_VOH_VAR:
        return <Phase20 key="phase20" />;
      case GamePhase.PHASE_21_FIXED_VOH_VAR:
        return <Phase21 key="phase21" />;
      case GamePhase.PHASE_22_OP_STATEMENT:
        return <Phase22 key="phase22" />;
      case GamePhase.PHASE_23_CEREMONY:
        return <Phase23 key="phase23" />;
      case GamePhase.PHASE_24_MATERIAL_MIX_YIELD:
        return <Phase24 key="phase24" />;
      case GamePhase.PHASE_25_PLANNING_OPERATIONAL:
        return <Phase25 key="phase25" />;
      case GamePhase.PHASE_26_RELEVANT_COST:
        return <Phase26 key="phase26" />;
      case GamePhase.PHASE_27_LIMITING_FACTOR:
        return <Phase27 key="phase27" />;
      case GamePhase.PHASE_28_MAKE_BUY:
        return <Phase28 key="phase28" />;
      case GamePhase.PHASE_29_SHUTDOWN:
        return <Phase29 key="phase29" />;
      case GamePhase.PHASE_30_STRATEGY_BOSS:
        return <Phase30 key="phase30" />;
      case GamePhase.PHASE_31_TRANSFER_PRICING:
        return <Phase31 key="phase31" />;
      case GamePhase.PHASE_32_ROI_RI:
        return <Phase32 key="phase32" />;
      case GamePhase.PHASE_33_BALANCED_SCORECARD:
        return <Phase33 key="phase33" />;
      case GamePhase.PHASE_34_DIVISIONAL_PERF:
        return <Phase34 key="phase34" />;
      case GamePhase.PHASE_35_GROUP_BOSS:
        return <Phase35 key="phase35" />;
      case GamePhase.VICTORY:
        return <VictoryScreen key="victory" />;
      case GamePhase.GAME_OVER:
        return <GameOver key="gameover" />;
      case GamePhase.PRACTICE_MODE:
        return <PracticeSession key="practice" onExit={() => dispatch({ type: 'SET_PHASE', payload: GamePhase.START_SCREEN })} />;
      default:
        return <PlaceholderPhase name="UNKNOWN" />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-obsidian overflow-hidden selection:bg-neonCyan selection:text-black">

      {/* Global Overlays */}
      <Handbook />
      <PauseMenu />
      <FeedbackModal />
      <PhaseTransition />

      {/* HUD (Heads Up Display) */}
      <GameHUD />

      {/* Main Game Canvas */}
      <div className="relative z-10 w-full h-full">
        {/* Suspense Wrapper with fallback loader */}
        <Suspense fallback={<LoadingScreen message="NEURAL LINK ESTABLISHING..." />}>
          {renderPhase()}
        </Suspense>
      </div>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GameProvider>
        <AudioProvider>
          <GameContent />
        </AudioProvider>
      </GameProvider>
    </ErrorBoundary>
  );
};

export default App;
