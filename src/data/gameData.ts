import { GameLevelConfig } from '../types';

export const GAME_LEVELS: GameLevelConfig[] = [
  // ==========================================
  // CARD 1: BASIC OPERATIONS OF STACK (4 Rounds)
  // ==========================================
  {
    id: 1,
    levelNumber: 1,
    title: 'Basic Operations of Stack',
    subtitle: 'Pop, Push, Push + Pop & Peek Operations',
    type: 'basic_operations',
    difficulty: 'Beginner',
    description: 'Master the core operations of Stack through 4 progressive rounds: POP, PUSH, PUSH + POP, and PEEK.',
    xpReward: 100,
    stars: 3,
    hints: [
      'Stack adheres strictly to LIFO (Last In, First Out).',
      'Pop removes the top, Push adds to top, and combined rounds pop before pushing.',
      'Peek (or Top) allows safe inspection of the topmost value without altering the stack size.',
    ],
    challenges: [
      // ----------------------------------------------------
      // ROUND 1: POP
      // ----------------------------------------------------
      {
        id: 'c1-r1-pop',
        challengeNumber: 1,
        totalChallengesInLevel: 4,
        mode: 'pop',
        difficulty: 'Beginner',
        question: 'ROUND 1: POP THE TOP ELEMENT',
        instruction: 'The Stack currently holds [10, 20, 30, 40, 50]. Following LIFO, hold and drag the topmost element [50] into the POP ZONE (or click Pop) to remove it.',
        initialStack: [10, 20, 30, 40, 50],
        capacity: 6,
        targetValue: 50,
        hint: {
          title: 'Remember: Stack follows LIFO',
          thoughtPrompt: 'The element added most recently sits at the top of the stack.',
          clue: 'Look at the topmost item marked with the TOP indicator (value 50). Hold and drag it into the POP ZONE.',
        },
        guide: {
          ruleTitle: 'POP Operation Rule',
          ruleDescription: 'POP removes only the TOP element. Elements below the top cannot be accessed or removed directly.',
          example: 'Stack [10, 20, 30] → Pop() removes 30, leaving [10, 20].',
        },
        feedback: {
          correctTitle: 'Round 1 Complete: Pop Successful!',
          correctActionText: '50 was popped from the TOP of the stack.',
          lifoReason: 'Stack follows LIFO: Last In, First Out. 50 was at the topmost position.',
          incorrectTip: 'Only the TOP element can be popped. Elements buried below cannot be removed directly.',
        },
        xpReward: 25,
      },

      // ----------------------------------------------------
      // ROUND 2: PUSH
      // ----------------------------------------------------
      {
        id: 'c1-r2-push',
        challengeNumber: 2,
        totalChallengesInLevel: 4,
        mode: 'push',
        difficulty: 'Beginner',
        question: 'ROUND 2: PUSH ELEMENT ONTO STACK',
        instruction: 'The Stack currently holds [10, 20, 30]. Select element [40] from Available Elements (or drag it) to PUSH it onto the TOP of the Stack.',
        initialStack: [10, 20, 30],
        availableElements: [40, 50, 60],
        capacity: 6,
        targetValue: 40,
        hint: {
          title: 'Push Placement',
          thoughtPrompt: 'Where do newly added elements land in a stack?',
          clue: 'Click the [40] chip or drag it into the stack to place it directly on top of [30].',
        },
        guide: {
          ruleTitle: 'PUSH Operation Rule',
          ruleDescription: 'PUSH increments the stack size and places the new element above all existing elements.',
          example: 'Stack [10, 20] + Push(30) → Stack [10, 20, 30].',
        },
        feedback: {
          correctTitle: 'Round 2 Complete: Push Successful!',
          correctActionText: '40 was pushed onto the TOP of the stack.',
          lifoReason: 'In LIFO, every pushed element immediately becomes the new active TOP.',
          incorrectTip: 'Push the requested value [40] from the available elements.',
        },
        xpReward: 25,
      },

      // ----------------------------------------------------
      // ROUND 3: PUSH + POP
      // ----------------------------------------------------
      {
        id: 'c1-r3-pushpop',
        challengeNumber: 3,
        totalChallengesInLevel: 4,
        mode: 'push_pop',
        difficulty: 'Beginner',
        question: 'ROUND 3: PUSH + POP OPERATIONS',
        instruction: 'The Stack holds [10, 20, 99]. Pop the incorrect element [99] from the TOP, then push [30] from Available Elements to achieve the target stack [10, 20, 30]!',
        initialStack: [10, 20, 99],
        availableElements: [30, 40, 50],
        targetStack: [10, 20, 30],
        capacity: 5,
        hint: {
          title: 'Combined Operations',
          thoughtPrompt: 'What needs to be removed first before adding the new element?',
          clue: 'First pop the top item [99] into the Pop Zone, then select or drop [30] onto the stack.',
        },
        guide: {
          ruleTitle: 'Interleaved Push and Pop',
          ruleDescription: 'Modifying a stack often involves popping outdated items and pushing new replacements.',
          example: '[10, 20, 99] → Pop() → [10, 20] → Push(30) → [10, 20, 30].',
        },
        feedback: {
          correctTitle: 'Round 3 Complete: Push + Pop Mastered!',
          correctActionText: 'Popped 99 and pushed 30 to reach target stack [10, 20, 30].',
          lifoReason: 'Both fundamental stack operations executed in proper LIFO order.',
          incorrectTip: 'Pop the top element [99] first, then push [30] to match the target stack.',
        },
        xpReward: 25,
      },

      // ----------------------------------------------------
      // ROUND 4: PEEK (INSPECT TOP)
      // ----------------------------------------------------
      {
        id: 'c1-r4-peek',
        challengeNumber: 4,
        totalChallengesInLevel: 4,
        mode: 'peek',
        difficulty: 'Beginner',
        question: 'ROUND 4: PEEK (INSPECT THE TOP ELEMENT)',
        instruction: 'The Stack currently holds [10, 20, 30, 40, 50]. The peek() operation inspects the topmost element WITHOUT modifying or removing anything from the stack. Execute peek() or select the value returned by peek().',
        initialStack: [10, 20, 30, 40, 50],
        availableElements: [10, 20, 30, 40, 50],
        capacity: 6,
        targetValue: 50,
        hint: {
          title: 'Peek / Top Operation',
          thoughtPrompt: 'Does peek() alter the size or elements in the stack?',
          clue: 'No! peek() is a non-destructive read. It looks up the topmost element (value 50) without popping it.',
        },
        guide: {
          ruleTitle: 'PEEK Operation Rule',
          ruleDescription: 'PEEK (also known as top()) retrieves the value of the most recently added element without modifying the stack. Time complexity is O(1).',
          example: 'Stack [10, 20, 30] → peek() returns 30, and stack remains [10, 20, 30].',
        },
        feedback: {
          correctTitle: 'Round 4 Complete: Peek Mastered!',
          correctActionText: 'peek() returned 50 from TOP. Notice the stack structure and size remain completely unaltered!',
          lifoReason: 'peek() provides safe read-only access to the TOP element with O(1) time complexity.',
          incorrectTip: 'peek() retrieves only the topmost element (at index TOP). Non-top elements cannot be peeked directly.',
        },
        xpReward: 25,
      },
    ],
  },

  // ==========================================
  // CARD 2: BUILDING THE STACK (2 Rounds)
  // ==========================================
  {
    id: 2,
    levelNumber: 2,
    title: 'Building the Stack',
    subtitle: 'Reconstruct & Predict Stack Structures',
    type: 'build',
    difficulty: 'Intermediate',
    description: 'Construct stacks and follow operation traces across 2 rounds: BUILD THE STACK and PREDICT THE STACK.',
    xpReward: 150,
    stars: 3,
    hints: [
      'In a stack, the bottom element was pushed first.',
      'To build a stack from bottom to top, start with the bottom-most target item.',
      'When tracing operations, each Push adds to the top, and each Pop removes the current top.',
    ],
    challenges: [
      // ----------------------------------------------------
      // ROUND 1: BUILD THE STACK
      // ----------------------------------------------------
      {
        id: 'c2-r1-build',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        mode: 'build',
        difficulty: 'Intermediate',
        question: 'ROUND 1: BUILD THE STACK',
        instruction: 'Using the available elements, reconstruct the required target stack [10, 20, 30, 40] in LIFO bottom-to-top order.',
        initialStack: [],
        availableElements: [40, 10, 30, 20],
        targetStack: [10, 20, 30, 40],
        capacity: 5,
        hint: {
          title: 'Start with the Bottom Item',
          thoughtPrompt: 'Which element sits at the very bottom of the target stack?',
          clue: 'Push 10 first (bottom foundation), followed by 20, then 30, and finally 40 (the top).',
        },
        guide: {
          ruleTitle: 'Stack Construction Principle',
          ruleDescription: 'Because stacks grow upward, the first element pushed will be at the bottom, and the last will be at the top.',
          example: 'Target [10, 20, 30] → Push(10), Push(20), Push(30).',
        },
        feedback: {
          correctTitle: 'Round 1 Complete: Stack Reconstructed!',
          correctActionText: 'Target stack [10, 20, 30, 40] built successfully.',
          lifoReason: 'Elements were placed in bottom-to-top order matching LIFO entry sequence.',
          incorrectTip: 'Ensure you push elements from bottom to top: 10, then 20, then 30, then 40.',
        },
        xpReward: 75,
      },

      // ----------------------------------------------------
      // ROUND 2: PREDICT THE STACK
      // ----------------------------------------------------
      {
        id: 'c2-r2-predict',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        mode: 'predict',
        difficulty: 'Intermediate',
        question: 'ROUND 2: PREDICT THE STACK',
        instruction: 'Trace the execution sequence: Push(15) → Push(30) → Pop() → Push(45) → Push(60). Build the predicted final stack state!',
        operationsTrace: [
          'Push(15)  → Stack: [15]',
          'Push(30)  → Stack: [15, 30]',
          'Pop()      → Stack: [15]',
          'Push(45)  → Stack: [15, 45]',
          'Push(60)  → Stack: [15, 45, 60] (Final TOP)',
        ],
        initialStack: [],
        availableElements: [15, 30, 45, 60],
        targetStack: [15, 45, 60],
        capacity: 5,
        hint: {
          title: 'Trace Step-by-Step',
          thoughtPrompt: 'Push(15), Push(30), then Pop() removes 30. What remains before pushing 45 and 60?',
          clue: 'After Pop(), 15 remains. Then pushing 45 and 60 creates the final stack: [15, 45, 60].',
        },
        guide: {
          ruleTitle: 'Trace Execution',
          ruleDescription: 'Follow each operation sequentially to predict the stack state at runtime.',
          example: 'Push(A), Push(B), Pop(), Push(C) leaves [A, C].',
        },
        feedback: {
          correctTitle: 'Round 2 Complete: Trace Predicted Accurately!',
          correctActionText: 'Final stack state [15, 45, 60] verified successfully.',
          lifoReason: 'Pop() removed 30 after it was pushed, leaving 15 at base, topped with 45 and 60.',
          incorrectTip: 'Review the Pop() step in the trace which removes 30 before 45 and 60 are pushed.',
        },
        xpReward: 75,
      },
    ],
  },
];
