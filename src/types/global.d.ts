interface DocumentEventMap {
  msvisibilitychange: Event;
  webkitvisibilitychange: Event;
}
interface Document {
  msHidden: boolean;
  webkitHidden: boolean;
}

declare global {
  interface Window {
    disqus_config: () => void;
    DISQUS: any;
    page: {
      url: string;
      identifier: string;
    };
    callbacks: {
      onReady: [() => void];
    };
  }
}

export {};
