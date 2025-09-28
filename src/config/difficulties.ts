import type { DifficultyConfig } from "~/types";

export const DIFFICULTIES: Record<string, DifficultyConfig> = {
    beginner: {
        id: "beginner",
        name: "Beginner",
        description: "New to Git? Start here! Learn the essential commands and concepts at a comfortable pace with plenty of explanations.",
        icon: "🌱",
        color: "green",
        stages: ["Intro", "Files"], // Basic fundamentals
        maxPoints: 100
    },
    advanced: {
        id: "advanced",
        name: "Advanced",
        description: "Skip the basics! Jump into branching, merging, collaboration workflows, and powerful Git techniques.",
        icon: "⚡",
        color: "blue",
        stages: ["Branches", "Merge", "Workflow", "TeamWork"], // Skip intro, focus on practical skills
        maxPoints: 250
    },
    pro: {
        id: "pro",
        name: "Pro",
        description: "Master the dark arts of Git! Advanced rebasing, bisecting, cherry-picking, and complex repository management.",
        icon: "🚀",
        color: "purple",
        stages: ["Rebase", "Advanced", "Archaeology", "Mastery"], // Advanced techniques only
        maxPoints: 400
    }
};

export const getAvailableStagesForDifficulty = (difficulty: DifficultyConfig["id"]): string[] => {
    return DIFFICULTIES[difficulty]?.stages || [];
};

export const getDifficultyConfig = (difficulty: DifficultyConfig["id"]): DifficultyConfig | null => {
    return DIFFICULTIES[difficulty] || null;
};
