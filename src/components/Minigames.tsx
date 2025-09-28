"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Gamepad2, GitBranch, GitCommit, GitMerge, Play, Trophy } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";

interface Minigame {
    id: string;
    name: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    points: number;
    icon: React.ReactNode;
    category: string;
}

const MINIGAMES: Minigame[] = [
    {
        id: "branch-master",
        name: "Branch Master",
        description: "Create and switch between branches as fast as possible",
        difficulty: "easy",
        points: 10,
        icon: <GitBranch className="h-6 w-6" />,
        category: "Branching",
    },
    {
        id: "commit-champion",
        name: "Commit Champion",
        description: "Write meaningful commit messages under pressure",
        difficulty: "medium",
        points: 20,
        icon: <GitCommit className="h-6 w-6" />,
        category: "Commits",
    },
    {
        id: "merge-master",
        name: "Merge Master",
        description: "Resolve merge conflicts like a pro",
        difficulty: "hard",
        points: 30,
        icon: <GitMerge className="h-6 w-6" />,
        category: "Advanced",
    },
];

interface MinigamesProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Minigames({ isOpen, onClose }: MinigamesProps) {
    const { t } = useLanguage();
    const [completedGames, setCompletedGames] = useState<string[]>([]);

    const handlePlayMinigame = (game: Minigame) => {
        // Simulate playing the minigame
        // In a real implementation, this would open the actual minigame
        setTimeout(() => {
            setCompletedGames(prev => [...prev, game.id]);
            // Add points to player's score here
        }, 2000);
    };

    const getDifficultyColor = (difficulty: Minigame["difficulty"]) => {
        switch (difficulty) {
            case "easy":
                return "text-green-400 border-green-600 bg-green-900/20";
            case "medium":
                return "text-yellow-400 border-yellow-600 bg-yellow-900/20";
            case "hard":
                return "text-red-400 border-red-600 bg-red-900/20";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl border-purple-900/20 bg-[#1a1625] text-purple-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl text-white">
                        <Gamepad2 className="mr-2 h-6 w-6 text-purple-400" />
                        {t("minigame.title")}
                    </DialogTitle>
                    <p className="text-purple-300">{t("minigame.subtitle")}</p>
                </DialogHeader>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {MINIGAMES.map(game => {
                        const isCompleted = completedGames.includes(game.id);

                        return (
                            <Card
                                key={game.id}
                                className={`border transition-all duration-300 hover:scale-105 ${getDifficultyColor(game.difficulty)} ${
                                    isCompleted ? "opacity-60" : ""
                                }`}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={getDifficultyColor(game.difficulty).split(" ")[0]}>
                                                {game.icon}
                                            </div>
                                            <CardTitle
                                                className={`text-lg ${getDifficultyColor(game.difficulty).split(" ")[0]}`}>
                                                {game.name}
                                            </CardTitle>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs capitalize ${getDifficultyColor(game.difficulty).split(" ")[0]} ${getDifficultyColor(game.difficulty).split(" ")[1]}`}>
                                            {game.difficulty}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-purple-200">{game.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-purple-400">
                                            <strong>{game.category}</strong> • +{game.points} {t("progress.points")}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handlePlayMinigame(game)}
                                        disabled={isCompleted}
                                        className={`w-full ${
                                            isCompleted
                                                ? "cursor-not-allowed bg-green-600 text-white"
                                                : "bg-purple-600 text-white hover:bg-purple-700"
                                        }`}>
                                        {isCompleted ? (
                                            <>
                                                <Trophy className="mr-2 h-4 w-4" />
                                                {t("minigame.completed")}
                                            </>
                                        ) : (
                                            <>
                                                <Play className="mr-2 h-4 w-4" />
                                                {t("minigame.play")}
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-6 flex justify-center">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
