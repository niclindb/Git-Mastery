import {
    createLevel,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

// Level 1: git reset --soft (Progressive learning: simple → HEAD → HEAD~n)
const resetLevel1 = createLevel({
    id: 1,
    name: "reset.level1.name",
    description: "reset.level1.description",
    objectives: [
        "Undo the last commit while keeping changes staged",
        "Reset to HEAD (current commit) to understand the concept",
        "Reset to a specific previous commit using HEAD~n notation"
    ],
    hints: [
        "Start simple: git reset --soft HEAD~1 (undo last commit)",
        "View commit history first: git log --oneline",
        "git reset --soft HEAD keeps everything as is (no change)",
        "git reset --soft HEAD~2 goes back 2 commits",
        "Files stay staged after --soft reset - perfect for fixing commit messages!",
        "Use git status to see what's staged after reset"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "reset-soft-last-commit",
            command: "git reset",
            requiresArgs: ["--soft"],
            description: "reset.level1.requirement1.description",
            successMessage: "✅ Good! The commit is gone but files are still staged!"
        },
        {
            id: "reset-soft-to-head",
            command: "git reset",
            requiresArgs: ["--soft"],
            description: "reset.level1.requirement2.description",
            successMessage: "✅ Perfect! Reset to HEAD means 'stay where you are' - no changes!"
        },
        {
            id: "reset-soft-head-tilde",
            command: "git reset",
            requiresArgs: ["--soft"],
            description: "reset.level1.requirement3.description",
            successMessage: "✅ Excellent! You've mastered HEAD~n notation for soft resets!"
        }
    ],
    story: createStory({
        title: "reset.level1.story.title",
        narrative: `🔄 **Understanding git reset --soft**

**The Situation:**
You're working on a feature and made 5 commits. But looking back, you realize:
- Commit 5: "Add database config" - Oops! This has sensitive credentials! 🔐
- Commit 4: "Update API endpoints" - This is good ✅
- Commit 3: "Add authentication" - Good ✅
- Commit 2: "Setup routing" - Good ✅
- Commit 1: "Initial project setup" - Good ✅

You need to undo commit 5, fix it, and commit again properly!

**What is git reset --soft?**
Think of Git commits like a stack of boxes 📦📦📦. Each box is a commit.

\`git reset --soft\` removes boxes from the top of the stack, BUT keeps all the items (your changes) on a staging table, ready to be packed into a new box!

**Three Ways to Use git reset --soft:**

**1. Reset to the previous commit (most common):**
\`git reset --soft HEAD~1\`
- HEAD = "where you are now" (the top box)
- ~1 = "go back 1 box"
- Result: Last commit removed, but changes stay staged!

**2. Reset to HEAD (educational - does nothing):**
\`git reset --soft HEAD\`
- This means "reset to where I already am"
- Nothing happens! Good for understanding the concept.

**3. Reset to an older commit:**
\`git reset --soft HEAD~3\`
- Goes back 3 commits
- All changes from those 3 commits stay staged
- Perfect for combining multiple commits into one!

**Your Mission:**

**Step 1:** Remove the last commit (the one with credentials)
\`git reset --soft HEAD~1\`
Check with \`git status\` - your files are still staged! ✨

**Step 2:** Try resetting to HEAD (educational)
\`git reset --soft HEAD\`
Notice: Nothing changed! You're already at HEAD.

**Step 3:** Go back further to practice
\`git reset --soft HEAD~2\`
Now you've removed 2 commits, but files are still staged!

**Remember:**
- 📦 Commits are removed from history
- ✅ Files stay in staging area
- 🎯 Perfect for fixing commit messages or combining commits
- ⚠️  Only use on commits you haven't pushed yet!

Let's practice these three techniques! 🚀`,
        realWorldContext: "reset.level1.story.realWorldContext",
        taskIntroduction: "reset.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Payment System\n\nSecure payment processing API"),
            createFileStructure("/src/routes.js", 'const routes = require("express").Router();\nmodule.exports = routes;'),
            createFileStructure("/src/auth.js", 'function authenticate(user) {\n  return jwt.sign(user);\n}'),
            createFileStructure("/src/api.js", 'const API_BASE = "https://api.example.com";\nmodule.exports = { API_BASE };'),
            createFileStructure("/config/database.js", '// SENSITIVE!\nmodule.exports = {\n  password: "admin123",\n  user: "root"\n};'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project setup",
                    files: ["/README.md"]
                },
                {
                    message: "Setup routing",
                    files: ["/src/routes.js"]
                },
                {
                    message: "Add authentication",
                    files: ["/src/auth.js"]
                },
                {
                    message: "Update API endpoints",
                    files: ["/src/api.js"]
                },
                {
                    message: "Add database config - CONTAINS SENSITIVE DATA!",
                    files: ["/config/database.js"]
                }
            ],
        }),
    }),
});

// Level 2: git reset --hard (Progressive learning: simple → HEAD → HEAD~n - DESTRUCTIVE!)
const resetLevel2 = createLevel({
    id: 2,
    name: "reset.level2.name",
    description: "reset.level2.description",
    objectives: [
        "Completely discard the last buggy commit",
        "Reset to HEAD to understand it does nothing",
        "Jump back multiple commits and discard everything"
    ],
    hints: [
        "⚠️  WARNING: --hard is DESTRUCTIVE! All changes are permanently lost!",
        "Check what you'll lose first: git log --oneline",
        "git reset --hard HEAD~1 removes last commit AND all changes",
        "git reset --hard HEAD does nothing (already at HEAD)",
        "git reset --hard HEAD~3 goes back 3 commits, deletes everything",
        "Use this when you want to throw away bad code completely",
        "💡 In real life: Only use --hard on code you haven't pushed!"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "reset-hard-last-commit",
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "reset.level2.requirement1.description",
            successMessage: "💥 Commit and all changes destroyed! No going back!"
        },
        {
            id: "reset-hard-to-head",
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "reset.level2.requirement2.description",
            successMessage: "✅ Nothing changed - you're already at HEAD!"
        },
        {
            id: "reset-hard-head-tilde",
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "reset.level2.requirement3.description",
            successMessage: "💥 Multiple commits destroyed! Workspace is clean again!"
        }
    ],
    story: createStory({
        title: "reset.level2.story.title",
        narrative: `⚠️  **Understanding git reset --hard - THE NUCLEAR OPTION**

**The Situation:**
It's Friday evening. You've been experimenting with a new feature all day:
- Commit 6: "Try experimental algorithm v3" - Completely broken! 💀
- Commit 5: "Try experimental algorithm v2" - Still broken! 🐛
- Commit 4: "Try experimental algorithm v1" - Nope! ❌
- Commit 3: "Add user dashboard" - This was working! ✅
- Commit 2: "Add user authentication" - Good ✅
- Commit 1: "Initial project" - Good ✅

You realize: These experiments are garbage. You want them GONE. Forever. 💣

**What is git reset --hard?**
Remember the boxes metaphor? 📦📦📦

\`git reset --soft\` removed boxes but kept the items on the staging table.

\`git reset --hard\` removes boxes AND throws all items in the trash! 🗑️

**⚠️  CRITICAL: This is DESTRUCTIVE and PERMANENT!**
- Commits are deleted from history
- ALL file changes are deleted
- Working directory is cleaned
- Staging area is cleared
- **THERE IS NO UNDO!**

**Three Ways to Use git reset --hard:**

**1. Destroy the last commit (most common):**
\`git reset --hard HEAD~1\`
- Removes the last commit
- Deletes all changes in that commit
- Working directory looks like the previous commit
- ⚠️  Changes are GONE FOREVER!

**2. Reset to HEAD (educational - does nothing):**
\`git reset --hard HEAD\`
- Means "make my workspace look like HEAD"
- Since you're already at HEAD, nothing changes
- Good for understanding: HEAD = current position

**3. Destroy multiple commits:**
\`git reset --hard HEAD~4\`
- Goes back 4 commits
- All 4 commits are DELETED from history
- All changes in those commits are DELETED
- It's like they never existed! 👻

**When to Use --hard:**
- ✅ Experiment failed, throw it away
- ✅ Broke everything, need to start over
- ✅ Committed secrets/passwords by accident
- ❌ NOT on commits you've already pushed!
- ❌ NOT if you might need the changes later!

**Your Mission:**

**Step 1:** Destroy the last broken commit
\`git reset --hard HEAD~1\`
Check with \`git status\` - workspace is clean! 🧹

**Step 2:** Try resetting to HEAD (safe practice)
\`git reset --hard HEAD\`
Nothing happens - you're already there!

**Step 3:** Destroy multiple failed experiments
\`git reset --hard HEAD~3\`
All 3 bad commits are gone! It's like Friday never happened! 😅

**Remember:**
- 💥 This is the NUCLEAR OPTION
- 🗑️  Everything is deleted - commits AND changes
- ⏪ Can't be undone (unless you have the commit hash)
- 🎯 Only use when you're 100% sure
- ⚠️  NEVER use on pushed commits!

**Fun Fact:** Professional developers say "I'm going hard reset on this" when they want to start over completely! 🔥

Ready to practice safe destruction? Let's go! 💪`,
        realWorldContext: "reset.level2.story.realWorldContext",
        taskIntroduction: "reset.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Experimental Features\n\nTrying new algorithms"),
            createFileStructure("/src/auth.js", 'function login(user) {\n  return validateUser(user);\n}'),
            createFileStructure("/src/dashboard.js", 'function Dashboard() {\n  return <div>User Dashboard</div>;\n}'),
            createFileStructure("/src/algorithm-v1.js", '// Attempt 1\nfunction calculate() {\n  // This doesn\'t work\n  return NaN;\n}'),
            createFileStructure("/src/algorithm-v2.js", '// Attempt 2\nfunction calculate() {\n  // Still broken\n  throw new Error("Failed!");\n}'),
            createFileStructure("/src/algorithm-v3.js", '// Attempt 3 - WORST\nfunction calculate() {\n  while(true) {} // Infinite loop!\n}'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project",
                    files: ["/README.md"]
                },
                {
                    message: "Add user authentication",
                    files: ["/src/auth.js"]
                },
                {
                    message: "Add user dashboard",
                    files: ["/src/dashboard.js"]
                },
                {
                    message: "Try experimental algorithm v1 - doesn't work",
                    files: ["/src/algorithm-v1.js"]
                },
                {
                    message: "Try experimental algorithm v2 - still broken",
                    files: ["/src/algorithm-v2.js"]
                },
                {
                    message: "Try experimental algorithm v3 - COMPLETE DISASTER",
                    files: ["/src/algorithm-v3.js"]
                }
            ],
        }),
    }),
});

// Level 3: git reset with commit hash (Advanced: Using actual commit IDs)
const resetLevel3 = createLevel({
    id: 3,
    name: "reset.level3.name",
    description: "reset.level3.description",
    objectives: [
        "View commit history and identify the good commit",
        "Reset to a specific commit using its hash",
    ],
    hints: [
        "First, check your commit history: git log --oneline",
        "Each commit has a unique hash (like 'a1b2c3d')",
        "git reset --soft <commit-hash> keeps changes staged",
        "git reset --hard <commit-hash> destroys everything after that commit",
        "Commit hashes are permanent IDs - HEAD~n is relative",
        "Pro tip: You only need the first 7 characters of the hash!",
        "Find 'Version 2 - Good version' and use its hash"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "view-commit-history",
            command: "git log",
            description: "reset.level3.requirement1.description",
            successMessage: "✅ Good! Now you can see all commits and their hashes!"
        },
        {
            id: "reset-to-specific-commit",
            command: "git reset",
            description: "reset.level3.requirement2.description",
            successMessage: "🎯 Perfect! You've mastered resetting to specific commit hashes!"
        }
    ],
    story: createStory({
        title: "reset.level3.story.title",
        narrative: `🎯 **Advanced Reset: Using Commit Hashes**

**The Situation:**
Your project has grown. You're now at commit 8, but you need to go back to commit 3.

Using \`HEAD~5\` to count back 5 commits is annoying and error-prone. What if someone adds a commit while you're working? The count changes!

**The Professional Solution: Commit Hashes**

Every commit has a unique ID (hash), like a fingerprint:
\`a1b2c3d - "Version 2 - Good version"\`

This hash NEVER changes! It's permanent and unique.

**Current Situation:**
- Commit 8: "Attempted fix v3" - Still broken! 💔
- Commit 7: "Attempted fix v2" - Nope! 🐛
- Commit 6: "Attempted fix v1" - Failed! ❌
- Commit 5: "Add broken feature" - Started the mess 🔥
- Commit 4: "Update styling" - Cosmetic ✨
- Commit 3: "Version 2 - GOOD VERSION" - Last known good state! ✅
- Commit 2: "Version 1" - Initial version ✅
- Commit 1: "Initial commit" - Foundation ✅

**Your Mission:**

**Step 1: Find the Good Commit**
Run: \`git log --oneline\`

You'll see something like:
\`\`\`
f7e8a9b Attempted fix v3
d6c7b8a Attempted fix v2
c5b6a7f Attempted fix v1
b4a5c6e Add broken feature
a3b4c5d Update styling
9a2b3c4 Version 2 - Good version  ← THIS ONE!
8a1b2c3 Version 1
7a0b1c2 Initial commit
\`\`\`

**Step 2: Reset to That Commit**
\`git reset --soft 9a2b3c4\`
(Use the actual hash you see!)

OR (more destructive):
\`git reset --hard 9a2b3c4\`

**HEAD~n vs Commit Hash:**

**Relative (HEAD~n):**
- \`HEAD~1\` = "previous commit"
- \`HEAD~5\` = "5 commits ago"
- ❌ Changes if new commits are added
- ✅ Quick for recent commits

**Absolute (Commit Hash):**
- \`git reset --soft a1b2c3d\`
- ✅ Permanent reference
- ✅ Never changes
- ✅ Professional approach
- 🎯 Best for going back to specific known-good states

**Pro Tips:**
- Only need first 7 characters: \`9a2b3c4\` instead of full hash
- You can copy hashes from \`git log\`
- Hashes work with ANY git command: \`git show a1b2c3d\`
- Save important commit hashes in notes for easy rollback!

**Real-World Scenario:**
"Hey team, if the deploy breaks, rollback to commit 9a2b3c4 - that's our last stable version!"

**In CI/CD Systems:**
Production deploys often use commit hashes for precise version control:
\`\`\`
deploy.sh --commit=9a2b3c4
\`\`\`

Let's practice professional-grade Git! 🚀`,
        realWorldContext: "reset.level3.story.realWorldContext",
        taskIntroduction: "reset.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Production Application\n\nVersion control matters!"),
            createFileStructure("/src/app.js", 'console.log("Version 1 - Basic");'),
            createFileStructure("/src/styles.css", 'body { margin: 0; }'),
            createFileStructure("/src/feature.js", '// Broken feature\nfunction unstableCode() {\n  throw new Error("Still broken!");\n}'),
            createFileStructure("/src/fix-v1.js", '// Fix attempt 1\nfunction fix1() { return false; }'),
            createFileStructure("/src/fix-v2.js", '// Fix attempt 2\nfunction fix2() { return null; }'),
            createFileStructure("/src/fix-v3.js", '// Fix attempt 3\nfunction fix3() { return undefined; }'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md"]
                },
                {
                    message: "Version 1 - Basic functionality",
                    files: ["/src/app.js"]
                },
                {
                    message: "Version 2 - Good version with styling",
                    files: ["/src/styles.css"]
                },
                {
                    message: "Update styling - cosmetic changes",
                    files: ["/src/styles.css"]
                },
                {
                    message: "Add broken feature - started the problems",
                    files: ["/src/feature.js"]
                },
                {
                    message: "Attempted fix v1 - didn't work",
                    files: ["/src/fix-v1.js"]
                },
                {
                    message: "Attempted fix v2 - still broken",
                    files: ["/src/fix-v2.js"]
                },
                {
                    message: "Attempted fix v3 - giving up",
                    files: ["/src/fix-v3.js"]
                }
            ],
        }),
    }),
});

export const resetLevels = {
    1: resetLevel1,
    2: resetLevel2,
    3: resetLevel3,
};
