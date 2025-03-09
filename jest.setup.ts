class MockIntersectionObserver implements IntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Prevent ESLint errors for unused variables
    void callback;
    void options;
  }
}

global.IntersectionObserver = MockIntersectionObserver;
