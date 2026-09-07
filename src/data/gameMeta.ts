export interface GameMetaData {
  id: number;
  levelNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  description: string;
  detailedObjective: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  xpReward: number;
  skills: string[];
  interactionType: string;
  hintAvailability: string;
  iconName: 'pop' | 'push' | 'build' | 'predict' | 'debug' | 'speed';
  howToPlay: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  previewData: {
    stackItems?: (number | string)[];
    targetStack?: (number | string)[];
    operationsTrace?: string[];
    debugStep?: { text: string; isError: boolean };
    topPointer?: number;
    popZoneLabel?: string;
  };
}

export const GAME_CATALOG: GameMetaData[] = [
  {
    id: 1,
    levelNumber: 1,
    title: 'BASIC OPERATIONS OF STACK',
    shortTitle: 'Basic Operations of Stack',
    subtitle: 'Pop, Push, Push + Pop & Peek',
    tagline: 'Master the core stack operations: Pop, Push, Combined Push + Pop, and Peek.',
    description: 'Practice the fundamental operations of a stack across 4 sequential rounds: POP, PUSH, PUSH + POP, and PEEK.',
    detailedObjective:
      'Learn how elements enter, leave, and are inspected in the stack through LIFO order. Remove top elements with Pop, add elements with Push, combine both operations, and inspect top elements with Peek.',
    difficulty: 'Beginner',
    duration: '3–5 min',
    xpReward: 100,
    skills: ['LIFO Principle', 'Pop Operation', 'Push Operation', 'Combined Push + Pop', 'Peek Operation'],
    interactionType: 'Drag-and-drop & Palette Selection',
    hintAvailability: '3-stage progressive hints available',
    iconName: 'pop',
    howToPlay: [
      {
        stepNumber: 1,
        title: 'Round 1: POP',
        description: 'Identify the topmost element and drag it into the POP ZONE (or click Pop) to remove it according to LIFO.',
      },
      {
        stepNumber: 2,
        title: 'Round 2: PUSH',
        description: 'Select the requested element from Available Elements and push it onto the top of the stack.',
      },
      {
        stepNumber: 3,
        title: 'Round 3: PUSH + POP',
        description: 'Execute both Pop and Push operations in sequence to adjust the stack to match the target state.',
      },
      {
        stepNumber: 4,
        title: 'Round 4: PEEK',
        description: 'Inspect the topmost element without removing it from the stack using the non-destructive peek() operation.',
      },
    ],
    previewData: {
      stackItems: [10, 20, 30],
      topPointer: 30,
      popZoneLabel: 'POP / PUSH ZONE',
    },
  },
  {
    id: 2,
    levelNumber: 2,
    title: 'BUILDING THE STACK',
    shortTitle: 'Building the Stack',
    subtitle: 'Reconstruct & Predict Stack Structures',
    tagline: 'Reconstruct target stacks and trace sequential stack operations.',
    description: 'Construct the target stack and follow operation execution traces across 2 rounds: BUILD THE STACK and PREDICT THE STACK.',
    detailedObjective:
      'Deepen your mental model of stack states. Construct stacks from bottom to top and follow algorithmic operation traces to predict the final stack content.',
    difficulty: 'Intermediate',
    duration: '4–6 min',
    xpReward: 150,
    skills: ['Stack Construction', 'Operation Tracing', 'LIFO Memory Model'],
    interactionType: 'Palette Selection, Drag-and-Drop, Pop Zone',
    hintAvailability: '3-stage progressive hints available',
    iconName: 'build',
    howToPlay: [
      {
        stepNumber: 1,
        title: 'Round 1: BUILD THE STACK',
        description: 'Using the available elements, reconstruct the required target stack in bottom-to-top LIFO order.',
      },
      {
        stepNumber: 2,
        title: 'Round 2: PREDICT THE STACK',
        description: 'Follow the code execution trace step-by-step and build the resulting final stack state.',
      },
    ],
    previewData: {
      targetStack: [10, 20, 30, 40],
      topPointer: 40,
    },
  },
];
