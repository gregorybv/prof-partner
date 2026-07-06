declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      ...args: unknown[]
    ) => void;
    yaCounter66006553?: {
      reachGoal: (goal: string, params?: unknown) => void;
    };
    jivo_api?: {
      getContactInfo: () => { client_name?: string; phone?: string; email?: string };
    };
    jivo_onIntroduction?: () => void;
    CalltouchDataObject?: string;
    ct?: (...args: unknown[]) => void;
  }
}

export {};
