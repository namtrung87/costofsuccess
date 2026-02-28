
import React from 'react';

const CyberOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-30" />

            {/* Static Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

            {/* RGB Shift Border */}
            <div className="absolute inset-0 border-[20px] border-transparent shadow-[inset_0_0_100px_rgba(0,240,255,0.05)]" />

            {/* Intermittent Flicker */}
            <div className="absolute inset-0 bg-white opacity-[0.01] animate-[flicker_0.15s_infinite]" />

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes flicker {
          0% { opacity: 0.01; }
          5% { opacity: 0.02; }
          10% { opacity: 0.01; }
          15% { opacity: 0.01; }
          20% { opacity: 0.015; }
          100% { opacity: 0.01; }
        }
      `}} />
        </div>
    );
};

export default CyberOverlay;
