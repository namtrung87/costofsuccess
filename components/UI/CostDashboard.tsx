import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import GlassPanel from './GlassPanel';
import { X, TrendingUp, TrendingDown, PieChart, Activity, DollarSign, Brain } from 'lucide-react';

const CostDashboard: React.FC = () => {
    const { state, dispatch } = useGame();

    if (!state.isDashboardOpen) return null;

    // Mock data calculations based on game state
    // In a real scenario, we'd track Prime vs Period costs in the state
    const primeCostPercent = 65;
    const periodCostPercent = 35;
    const breakEvenPoint = 1200;
    const currentEfficiency = 88;

    const dataPoints = [40, 60, 45, 70, 55, 80, 75];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-5xl h-[80vh] relative"
                >
                    <GlassPanel intensity="HIGH" border="CYAN" className="w-full h-full flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neonCyan/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-neonCyan/10 rounded-lg border border-neonCyan/50">
                                    <Activity className="w-6 h-6 text-neonCyan" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading text-neonCyan tracking-wider uppercase">CFO Strategic Dashboard</h2>
                                    <p className="text-[10px] font-mono text-gray-400">REAL-TIME COST REAPPORTIONMENT MONITORING</p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'TOGGLE_DASHBOARD' })}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400 hover:text-white" />
                            </button>
                        </div>

                        {/* Content Scrolling Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                            {/* Top Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Current Budget', value: `$${state.budget}`, icon: DollarSign, color: 'text-neonCyan' },
                                    { label: 'Mental Load', value: `${state.sanity}%`, icon: Brain, color: 'text-neonPink' },
                                    { label: 'Efficiency', value: `${currentEfficiency}%`, icon: TrendingUp, color: 'text-neonGreen' },
                                    { label: 'OAR Accuracy', value: 'OPTIMAL', icon: Activity, color: 'text-neonBlue' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 bg-black/40 border border-white/10 rounded-xl relative overflow-hidden group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">{stat.label}</span>
                                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                        </div>
                                        <div className={`text-2xl font-heading mt-2 ${stat.color}`}>{stat.value}</div>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Visualizing Prime vs Period */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-heading text-white/80 flex items-center gap-2">
                                        <PieChart className="w-4 h-4 text-neonCyan" />
                                        COST COMPOSITION
                                    </h3>
                                    <div className="h-64 bg-black/40 border border-white/5 rounded-2xl p-6 flex items-center justify-center relative group">
                                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                                            {/* Prime Cost Segment */}
                                            <circle
                                                cx="50" cy="50" r="40"
                                                fill="transparent"
                                                stroke="rgba(0, 240, 255, 0.2)"
                                                strokeWidth="12"
                                            />
                                            <motion.circle
                                                cx="50" cy="50" r="40"
                                                fill="transparent"
                                                stroke="#00f0ff"
                                                strokeWidth="12"
                                                strokeDasharray="251.2"
                                                initial={{ strokeDashoffset: 251.2 }}
                                                animate={{ strokeDashoffset: 251.2 - (251.2 * primeCostPercent) / 100 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                            {/* Inner Glow */}
                                            <circle cx="50" cy="50" r="30" className="fill-black/40" />
                                        </svg>

                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-3xl font-heading text-neonCyan">{primeCostPercent}%</span>
                                            <span className="text-[8px] font-mono text-gray-400 uppercase tracking-tighter">Prime Content</span>
                                        </div>

                                        {/* Legend */}
                                        <div className="absolute bottom-4 right-4 text-[10px] flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-neonCyan" />
                                                <span className="text-white">PRIME COSTS</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-white/20" />
                                                <span className="text-gray-400">PERIOD COSTS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Trend */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-heading text-white/80 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-neonGreen" />
                                        EFFICIENCY TREND
                                    </h3>
                                    <div className="h-64 bg-black/40 border border-white/5 rounded-2xl p-6 relative">
                                        <div className="absolute inset-0 p-8">
                                            <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#00ff41" stopOpacity="0.3" />
                                                        <stop offset="100%" stopColor="#00ff41" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>

                                                {/* Trend Line */}
                                                <motion.path
                                                    d={`M ${dataPoints.map((p, i) => `${(i / (dataPoints.length - 1)) * 100} ${40 - (p / 100) * 35}`).join(' L ')}`}
                                                    fill="none"
                                                    stroke="#00ff41"
                                                    strokeWidth="1.5"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 2, ease: "easeInOut" }}
                                                    className="drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"
                                                />

                                                {/* Area Fill */}
                                                <motion.path
                                                    d={`M 0 40 L ${dataPoints.map((p, i) => `${(i / (dataPoints.length - 1)) * 100} ${40 - (p / 100) * 35}`).join(' L ')} L 100 40 Z`}
                                                    fill="url(#lineFill)"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1 }}
                                                />
                                            </svg>
                                        </div>
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-10">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-white w-full" />)}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom Insight Footer */}
                            <div className="p-4 bg-neonCyan/5 border border-neonCyan/30 rounded-xl flex items-start gap-4">
                                <TrendingUp className="w-5 h-5 text-neonCyan shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xs font-heading text-neonCyan uppercase tracking-widest">Strategic Insight</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed font-mono italic">
                                        Current budget allows for 14.5 days of runway. Reapportionment strategies are yielding a 12% reduction in overhead drag compared to Q3 projection. Keep the OAR balanced for maximum yield.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </GlassPanel>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CostDashboard;
