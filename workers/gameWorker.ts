// Web Worker to keep game timers alive even if tab is in the background
// and to offload interval calculation from the main thread.

let sanityTimer: any = null;
let marketTimer: any = null;

self.onmessage = (e: MessageEvent) => {
    const { type, payload } = e.data;

    if (type === 'START_SANITY_TIMER') {
        if (sanityTimer) clearInterval(sanityTimer);
        const interval = payload.interval || 4000;
        sanityTimer = setInterval(() => {
            self.postMessage({ type: 'TICK_SANITY' });
        }, interval);
    }

    if (type === 'STOP_SANITY_TIMER') {
        if (sanityTimer) clearInterval(sanityTimer);
        sanityTimer = null;
    }

    if (type === 'START_MARKET_TIMER') {
        if (marketTimer) clearInterval(marketTimer);
        marketTimer = setInterval(() => {
            self.postMessage({ type: 'TICK_MARKET' });
        }, 20000); // 20s market tick
    }

    if (type === 'STOP_MARKET_TIMER') {
        if (marketTimer) clearInterval(marketTimer);
        marketTimer = null;
    }
};
