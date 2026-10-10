import React from 'react';
import {
  TrendingUp,
  BookOpen,
  Video,
  Gamepad2,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Circle,
  Star,
  Award,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEffects } from '../../services/sound';
import { getTopicPointsBreakdown } from '../../services/storage';
import { QUIZ_QUESTIONS } from '../../data/quizData';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress?: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress }) => {
  // Navigation helper to switch views using existing DOM elements
  const navigateTo = (tab: 'theory' | 'lab' | 'game' | 'quiz') => {
    soundEffects.playClick();
    const btn = document.getElementById(`nav-${tab}`);
    if (btn) {
      btn.click();
    }
  };

  // Canonical breakdown from central storage service
  const breakdown = getTopicPointsBreakdown(progress);

  // Pillar counts
  const completedTheoryCount = breakdown.theoryCompletedCount; // 0..12
  const completedVideosCount = breakdown.completedVideosCount; // 0..2
  const completedGamesCount = breakdown.completedGamesCount; // 0..2
  const quizAnsweredCount = breakdown.quizQuestionsAnsweredCount; // 0..10

  // Points per pillar
  const videoPoints = breakdown.visualizationPoints; // out of 20
  const gamePoints = breakdown.gamePoints; // out of 40
  const quizPoints = breakdown.quizPoints; // out of 40
  const totalTopicPoints = breakdown.totalTopicPoints; // out of 100

  // Quiz details
  const quizScores = progress.quizQuestionScores || {};
  let quizCorrect = 0;
  let quizIncorrect = 0;
  let quizTimedOut = 0;
  Object.values(quizScores).forEach((sc) => {
    if (sc === 4) quizCorrect++;
    else if (sc === -2) quizIncorrect++;
    else if (sc === 0) quizTimedOut++;
  });

  const quizAccuracy =
    quizAnsweredCount > 0 ? Math.round((quizCorrect / quizAnsweredCount) * 100) : 0;

  // Percentages for individual pillar progress bars
  const theoryPercent = Math.round((completedTheoryCount / 12) * 100);
  const videoPercent = Math.round((completedVideosCount / 2) * 100);
  const gamePercent = Math.round((completedGamesCount / 2) * 100);
  const quizPercent = Math.round((quizAnsweredCount / 10) * 100);

  // Dynamic Recommendation
  const getRecommendation = () => {
    if (completedTheoryCount === 0) {
      return {
        title: 'Start with What is a Stack?',
        description: 'Learn the basic structure of a Stack and understand how the TOP pointer works.',
        actionLabel: 'Read Chapter 01',
        tab: 'theory' as const,
      };
    }
    if (completedTheoryCount < 4) {
      return {
        title: 'Learn Stack Operations',
        description: 'Study Push, Pop, Peek, and Display to master element movement.',
        actionLabel: 'Continue Theory',
        tab: 'theory' as const,
      };
    }
    if (completedVideosCount < 2) {
      return {
        title: 'Watch Stack Videos (+20 pts)',
        description: 'Visualize LIFO operations and pointer movement in the visual laboratory.',
        actionLabel: 'Watch Videos',
        tab: 'lab' as const,
      };
    }
    if (completedGamesCount < 2) {
      return {
        title: 'Try Stack Challenges (+40 pts)',
        description: 'Test your understanding with interactive Stack challenges and games.',
        actionLabel: 'Play Games',
        tab: 'game' as const,
      };
    }
    if (!progress.quizCompleted) {
      return {
        title: 'Take the Stack Quiz (+40 pts)',
        description: 'Verify your knowledge of LIFO, operations, boundary errors, and complexity.',
        actionLabel: 'Take Quiz',
        tab: 'quiz' as const,
      };
    }
    return {
      title: 'Maintain Stack Mastery',
      description: 'You have achieved full Stack module progress! Review any concepts to keep your skills sharp.',
      actionLabel: 'Review Theory',
      tab: 'theory' as const,
    };
  };

  const recommendation = getRecommendation();

  // 12 Theory Chapters
  const theoryChapters = [
    '01. What is a Stack?',
    '02. LIFO Principle',
    '03. Stack Terminology',
    '04. Stack Operations',
    '05. Stack Algorithms',
    '06. Overflow & Underflow',
    '07. Array Implementation',
    '08. Linked List Implementation',
    '09. Complexity',
    '10. Stack Problem Solving',
    '11. Real-World Applications',
    '12. Advantages, Limitations & Summary',
  ];

  // 2 Visualize Videos
  const visualizeVideos = [
    { id: 1, title: '01. Stack Data Structure', pts: 10 },
    { id: 2, title: '02. Stack Operations', pts: 10 },
  ];

  // 2 Games
  const gameChallenges = [
    { id: 1, title: '01. Basic Operations of Stack', pts: 20 },
    { id: 2, title: '02. Building the Stack', pts: 20 },
  ];

  const getStatusBadge = (status: 'Completed' | 'In Progress' | 'Not Started') => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3" />
          In Progress
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
        <Circle className="w-2.5 h-2.5" />
        Not Started
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-14 max-w-4xl mx-auto">
      {/* ─── 1. TOP HEADER BANNER (Clean, No Refresh/Reset) ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
            <TrendingUp className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Stack Learning Progress
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Track your journey through Stack concepts, operations, algorithms, implementations, problem solving, and scoring.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO PROGRESS SECTION: OVERALL COMPLETION & TOPIC SCORE ─── */}
      <div className="space-y-4">
        {/* Overall Completion Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                OVERALL COMPLETION
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {breakdown.overallCompletionPercent}%
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  ({breakdown.completedModulesCount} of {breakdown.totalModulesCount} Modules)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800">
                Level {progress.level} Stacker
              </span>
            </div>
          </div>

          {/* Full-width High-contrast Progress Bar */}
          <div className="w-full h-3 bg-slate-900 dark:bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/60">
            <div
              className="h-full bg-cyan-400 dark:bg-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.overallCompletionPercent}%` }}
            />
          </div>
        </div>

        {/* Stack Topic Score Card (100 Pts Target) */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Stack Topic Score
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                Earn up to 100 points across Visualization (20 pts), Game challenges (40 pts), and Quiz assessment (40 pts).
              </p>
            </div>

            {/* Glowing Star Icon in Top-Right */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/80 text-amber-500 flex items-center justify-center shrink-0 shadow-xs">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-500" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {totalTopicPoints}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-400 dark:text-slate-500 font-mono">
              / 100
            </span>
            <span className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              PTS EARNED
            </span>
          </div>

          {/* Quick Pillar Points Breakdown Badges */}
          <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Visualize</span>
              <span className="font-bold text-slate-900 dark:text-white">{videoPoints} / 20 pts</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Game</span>
              <span className="font-bold text-slate-900 dark:text-white">{gamePoints} / 40 pts</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Quiz</span>
              <span className="font-bold text-slate-900 dark:text-white">{quizPoints} / 40 pts</span>
            </div>
          </div>
        </div>

        {/* ─── 3. THE 4 PILLAR CARDS (LEARN, VISUALIZE, GAME, QUIZ) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CARD 1: LEARN (Theory) */}
          <div
            onClick={() => navigateTo('theory')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Learn</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {completedTheoryCount} / 12 Chapters
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                <span>Progress</span>
                <span className="font-bold">{theoryPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${theoryPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* CARD 2: VISUALIZE */}
          <div
            onClick={() => navigateTo('lab')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visualize</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {videoPoints} / 20 pts ({completedVideosCount}/2 Videos)
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                <span>Progress</span>
                <span className="font-bold">{videoPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${videoPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* CARD 3: GAME */}
          <div
            onClick={() => navigateTo('game')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Play <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Game</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {gamePoints} / 40 pts ({completedGamesCount}/2 Games)
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                <span>Progress</span>
                <span className="font-bold">{gamePercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600"
                  style={{ width: `${gamePercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* CARD 4: QUIZ */}
          <div
            onClick={() => navigateTo('quiz')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Start <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quiz</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {quizPoints} / 40 pts ({quizAnsweredCount}/10 Qs)
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                <span>Progress</span>
                <span className="font-bold">{quizPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600"
                  style={{ width: `${quizPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. RECOMMENDED NEXT STEP ─── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/20">
            Recommended Next Step
          </span>
          <h3 className="text-base font-bold text-white mt-1">
            {recommendation.title}
          </h3>
          <p className="text-xs text-blue-100/80 mt-0.5">
            {recommendation.description}
          </p>
        </div>

        <button
          onClick={() => navigateTo(recommendation.tab)}
          className="px-4 py-2.5 bg-white hover:bg-blue-50 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <span>{recommendation.actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ─── 5. LEARNING AREAS CHECKLIST & DRILL-DOWN ─── */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Module Details &amp; Points Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AREA 1: THEORY (12 Chapters) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Theory
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      12 Stack Chapters
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('theory')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Open <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Completed</span>
                  <span className="font-bold">{completedTheoryCount} / 12</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${theoryPercent}%` }}
                  />
                </div>
              </div>

              {/* Compact Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {theoryChapters.map((ch, idx) => {
                  const chNumber = idx + 1;
                  const isDone = progress.completedTheoryChapters?.includes(chNumber);
                  const isCurrent = !isDone && completedTheoryCount === idx;
                  const status = isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Not Started';

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                        {ch}
                      </span>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AREA 2: VISUALIZE (2 Videos, 20 pts) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Visualize
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      2 Videos • +10 pts each (Total 20 pts)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('lab')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Open <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Points Earned</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {videoPoints} / 20 pts
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${videoPercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {visualizeVideos.map((vid) => {
                  const isDone = (progress.completedLabs || []).includes(vid.id);
                  const status = isDone ? 'Completed' : 'Not Started';

                  return (
                    <div
                      key={vid.id}
                      className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {vid.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-1.5 py-0.5 rounded">
                          +{vid.pts} pts
                        </span>
                      </div>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AREA 3: GAME (2 Games, 40 pts) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Game
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      2 Games • +20 pts each (Total 40 pts)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('game')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Play <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Points Earned</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {gamePoints} / 40 pts
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600"
                    style={{ width: `${gamePercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {gameChallenges.map((gm) => {
                  const isDone = (progress.completedGameLevels || []).includes(gm.id);
                  const earned = progress.gameScores?.[gm.id] ?? (isDone ? 20 : 0);
                  const status = isDone ? 'Completed' : 'Not Started';

                  return (
                    <div
                      key={gm.id}
                      className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {gm.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
                          {isDone ? `${earned} pts` : `+${gm.pts} pts`}
                        </span>
                      </div>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AREA 4: QUIZ (10 Questions, 40 pts) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Quiz
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      10 Questions • +4 correct, -2 wrong (Max 40 pts)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('quiz')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Start <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Points Earned</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {quizPoints} / 40 pts
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${quizPercent}%` }}
                  />
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Accuracy</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {quizAccuracy}%
                  </span>
                </div>
                <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">+4 Correct</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                    {quizCorrect}
                  </span>
                </div>
                <div className="bg-rose-50/60 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/50">
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 uppercase tracking-wider block">-2 Wrong</span>
                  <span className="font-mono font-bold text-rose-700 dark:text-rose-300 text-sm">
                    {quizIncorrect}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Questions Answered</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {quizAnsweredCount} / {QUIZ_QUESTIONS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 6. SUMMARY FOOTER ─── */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {totalTopicPoints === 100
            ? '🎉 Maximum 100 points achieved! You have mastered the Stack module.'
            : 'Complete videos, games, and the quiz without deductions to reach the 100-point Stack mastery.'}
        </p>
      </div>
    </div>
  );
};
