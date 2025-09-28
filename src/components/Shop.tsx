"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { ShoppingCart, Star, Zap, Shield, Trophy, Coins } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";

interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: React.ReactNode;
    category: "cosmetic" | "utility" | "achievement";
    rarity: "common" | "rare" | "epic" | "legendary";
}

const SHOP_ITEMS: ShopItem[] = [
    {
        id: "golden-terminal",
        name: "Golden Terminal",
        description: "A shiny gold terminal theme that shows your Git mastery",
        price: 50,
        icon: <Star className="h-6 w-6" />,
        category: "cosmetic",
        rarity: "rare",
    },
    {
        id: "hint-master",
        name: "Hint Master",
        description: "Get extra hints for challenging levels",
        price: 30,
        icon: <Zap className="h-6 w-6" />,
        category: "utility",
        rarity: "common",
    },
    {
        id: "git-guardian",
        name: "Git Guardian",
        description: "Protection against accidental force pushes in real Git",
        price: 75,
        icon: <Shield className="h-6 w-6" />,
        category: "utility",
        rarity: "epic",
    },
    {
        id: "git-legend",
        name: "Git Legend Badge",
        description: "Show everyone you've mastered Git with this exclusive badge",
        price: 100,
        icon: <Trophy className="h-6 w-6" />,
        category: "achievement",
        rarity: "legendary",
    },
];

interface ShopProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Shop({ isOpen, onClose }: ShopProps) {
    const { progressManager } = useGameContext();
    const { t } = useLanguage();
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

    const progress = progressManager.getProgress();
    const playerPoints = progress.score;

    const handlePurchase = (item: ShopItem) => {
        if (playerPoints >= item.price && !purchasedItems.includes(item.id)) {
            // In a real implementation, you'd deduct points from the progress system
            setPurchasedItems(prev => [...prev, item.id]);
            // progressManager.spendPoints(item.price); // This would need to be implemented
        }
    };

    const getRarityColor = (rarity: ShopItem["rarity"]) => {
        switch (rarity) {
            case "common":
                return "text-gray-400 border-gray-600";
            case "rare":
                return "text-blue-400 border-blue-600";
            case "epic":
                return "text-purple-400 border-purple-600";
            case "legendary":
                return "text-yellow-400 border-yellow-600";
        }
    };

    const getRarityBg = (rarity: ShopItem["rarity"]) => {
        switch (rarity) {
            case "common":
                return "bg-gray-900/20";
            case "rare":
                return "bg-blue-900/20";
            case "epic":
                return "bg-purple-900/20";
            case "legendary":
                return "bg-yellow-900/20";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl border-purple-900/20 bg-[#1a1625] text-purple-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl text-white">
                        <ShoppingCart className="mr-2 h-6 w-6 text-purple-400" />
                        {t("shop.title")}
                    </DialogTitle>
                    <p className="text-purple-300">{t("shop.subtitle")}</p>
                    <div className="flex items-center space-x-2 text-lg font-semibold text-yellow-400">
                        <Coins className="h-5 w-5" />
                        <span>
                            {t("shop.balance")}: {playerPoints} {t("progress.points")}
                        </span>
                    </div>
                </DialogHeader>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {SHOP_ITEMS.map(item => {
                        const isPurchased = purchasedItems.includes(item.id);
                        const canAfford = playerPoints >= item.price;

                        return (
                            <Card
                                key={item.id}
                                className={`border transition-all duration-300 ${getRarityColor(item.rarity)} ${getRarityBg(item.rarity)} ${
                                    isPurchased ? "opacity-60" : "hover:scale-105"
                                }`}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={`${getRarityColor(item.rarity).split(" ")[0]}`}>
                                                {item.icon}
                                            </div>
                                            <CardTitle
                                                className={`text-lg ${getRarityColor(item.rarity).split(" ")[0]}`}>
                                                {item.name}
                                            </CardTitle>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs capitalize ${getRarityColor(item.rarity)}`}>
                                            {item.rarity}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-purple-200">{item.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 text-yellow-400">
                                            <Coins className="h-4 w-4" />
                                            <span className="font-semibold">{item.price}</span>
                                        </div>

                                        <Button
                                            onClick={() => handlePurchase(item)}
                                            disabled={isPurchased || !canAfford}
                                            className={`${
                                                isPurchased
                                                    ? "cursor-not-allowed bg-green-600 text-white"
                                                    : !canAfford
                                                      ? "cursor-not-allowed bg-gray-600 text-gray-300"
                                                      : "bg-purple-600 text-white hover:bg-purple-700"
                                            }`}>
                                            {isPurchased
                                                ? t("shop.purchased")
                                                : !canAfford
                                                  ? t("shop.insufficient")
                                                  : t("shop.buy")}
                                        </Button>
                                    </div>
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
