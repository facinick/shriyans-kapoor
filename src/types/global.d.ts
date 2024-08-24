declare global {
  interface Document {
    msHidden?: boolean;
    webkitHidden?: boolean;
    startViewTransition?(callback: () => void): ViewTransition;
  }

  interface DocumentEventMap {
    msvisibilitychange: Event;
    webkitvisibilitychange: Event;
  }

  interface Window {
    disqus_config: () => void;
    DISQUS: any;
    page: {
      url: string;
      identifier: string;
    };
    callbacks: {
      onReady: [() => void];
    }
  }
}

export { };
