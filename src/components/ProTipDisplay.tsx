import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { getRandomGitTip } from "~/lib/ProGitTips";

export function ProTipDisplay() {
    const { progressManager, currentStage, currentLevel } = useGameContext();
    const { t } = useLanguage();
    const [currentTip, setCurrentTip] = useState("");

    // Check if user has purchased pro-tips
    const hasProTips = progressManager.getPurchasedItems().includes("pro-tips");

    // Generate new tip when level changes
    useEffect(() => {
        if (hasProTips && currentStage && currentLevel) {
            setCurrentTip(getRandomGitTip());
        }
    }, [currentStage, currentLevel, hasProTips]);

    // Don't render if user hasn't purchased the item
    if (!hasProTips || !currentTip) {
        return null;
    }

    // Simple, always-visible tip bar integrated into footer
    return (
        <div className="border-t border-blue-500/30 bg-gradient-to-r from-blue-950/95 via-purple-950/95 to-blue-950/95 px-4 py-2">
            <div className="container mx-auto flex items-center space-x-3">
                <Lightbulb className="h-4 w-4 flex-shrink-0 text-yellow-400" />
                <div className="flex items-baseline space-x-2">
                    <span className="text-xs font-semibold text-blue-300">{t("shop.proTip.title")}:</span>
                    <p className="text-xs text-purple-100">{currentTip}</p>
                </div>
            </div>
        </div>
    );
}
