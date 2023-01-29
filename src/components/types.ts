export interface Input {
  wishes: Record<string, string[]>;
  projects: Record<string, number>;
}

export interface State {
  input: Input;
  inputError: Error | null;
  isLoading: boolean;
  results: Step[];
  reqDuration: number;
}

export type Step = Record<
  string,
  {
    denials: number;
    points: number;
    wishes: string[];
    assigned: string[];
  }
>;
