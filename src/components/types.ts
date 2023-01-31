export type Projects = Record<string, number>;
export type Wishes = Record<string, string[]>;

export interface Input {
  wishes: Wishes;
  projects: Projects;
  error: Error | null;
}

export interface Results {
  reqDuration: number;
  results: Step[];
  isLoading: boolean;
  error: Error | null;
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
