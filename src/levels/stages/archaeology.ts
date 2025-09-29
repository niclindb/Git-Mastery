import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const archaeologyLevel1 = createLevel({
    id: 1,
    name: "Git Blame - Code Archaeology",
    description: "Investigate code history to understand changes and find the origin of bugs",
    objectives: [
        "Use git blame to find who wrote specific lines",
        "Track down the history of a bug",
        "Understand the context of code changes",
        "Find related commits and changes"
    ],
    hints: [
        "git blame shows who last modified each line",
        "Use -L option to blame specific line ranges",
        "Combine blame with log to understand context",
        "Look for patterns in commit messages"
    ],
    requirements: [
        createRequirement({
            command: "git blame src/utils/validator.js",
            description: "Investigate who wrote the validation logic",
            successMessage: "Code authorship revealed!"
        }),
        createRequirement({
            command: "git log --oneline -n 10",
            description: "Check recent commit history for context",
            successMessage: "Recent history examined!"
        }),
        createRequirement({
            command: "git show",
            description: "Examine the details of a specific commit",
            successMessage: "Commit details analyzed!"
        })
    ],
    story: createStory({
        title: "The Case of the Mysterious Bug",
        narrative: `🔍 Monday morning, 9:47 AM. Your coffee is still hot, but your day is about to get very complicated.

A critical bug report just landed on your desk: "User input validation is failing for international phone numbers, causing registration failures for 23% of our European customers."

The validation logic is complex - 247 lines of intricate regular expressions and edge case handling, written over 18 months by at least 4 different developers. The bug could be anywhere.

Your senior developer, Maya, walks over:

"Welcome to code archaeology! This is what separates experienced developers from beginners. Anyone can write new code, but tracking down bugs in legacy code? That's detective work."

"Git isn't just version control - it's your time machine. Every line of code has a story: who wrote it, when, and most importantly, why."

Your investigation toolkit:
- \`git blame\`: Find who wrote each line
- \`git log\`: Understand the timeline
- \`git show\`: Examine specific changes
- Context clues: Commit messages, related changes

The bug is hiding somewhere in that validation code. But you're not just looking for what's wrong - you need to understand why it was written that way in the first place.

Time to become a Git detective. The truth is out there, buried in the commit history!`,
        realWorldContext: "Code archaeology skills are essential for maintaining large, long-lived codebases with multiple contributors over time.",
        taskIntroduction: "Learn to investigate code history and track down the source of bugs using Git forensic tools."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/utils/validator.js", `// Input validation utilities
// Created by: Original Team (2022)
// Modified by: Sarah Chen (phone validation - March 2023)
// Modified by: Alex Rodriguez (international support - June 2023)
// Modified by: Jordan Kim (bug fixes - September 2023)

function validatePhoneNumber(phone) {
    // US phone number validation - Sarah Chen, March 2023
    const usPattern = /^\\+?1?[2-9]\\d{2}[2-9]\\d{2}\\d{4}$/;

    // European phone number validation - Alex Rodriguez, June 2023
    // BUG: Missing country code handling for some EU countries
    const euPattern = /^\\+?[1-9]\\d{1,14}$/;

    // Bug fix attempt - Jordan Kim, September 2023
    // TODO: This doesn't handle all edge cases
    if (phone.startsWith('+')) {
        return euPattern.test(phone);
    }

    return usPattern.test(phone);
}

function validateEmail(email) {
    // Basic email validation - Original Team, 2022
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

module.exports = { validatePhoneNumber, validateEmail };`),
            createFileStructure("/tests/validator.test.js", "// Validator tests\ntest('validates US phone numbers', () => {\n  expect(validatePhoneNumber('555-123-4567')).toBe(true);\n});"),
            createFileStructure("/bug-reports/issue-247.md", "# Issue #247: International Phone Validation\n\n## Problem\nUsers from Germany, France, and Netherlands cannot register.\n\n## Error\n'Invalid phone number format'")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial validation system",
                    files: ["/src/utils/validator.js", "/tests/validator.test.js"]
                },
                {
                    message: "Add phone number validation for US users",
                    files: ["/src/utils/validator.js"]
                },
                {
                    message: "Add international phone support for EU expansion",
                    files: ["/src/utils/validator.js"]
                },
                {
                    message: "Attempt to fix phone validation edge cases",
                    files: ["/src/utils/validator.js"]
                },
                {
                    message: "Add bug report for investigation",
                    files: ["/bug-reports/issue-247.md"]
                }
            ]
        })
    })
});

const archaeologyLevel2 = createLevel({
    id: 2,
    name: "Commit Forensics with Git Log",
    description: "Master advanced git log techniques to investigate complex code history",
    objectives: [
        "Use advanced log filtering to find specific changes",
        "Track file renames and moves",
        "Find commits by content changes",
        "Analyze commit patterns and trends"
    ],
    hints: [
        "Use --grep to search commit messages",
        "Use -S to find when specific text was added/removed",
        "Use --follow to track files through renames",
        "Combine filters for powerful searches"
    ],
    requirements: [
        createRequirement({
            command: "git log --grep='security'",
            description: "Find all commits related to security",
            successMessage: "Security-related commits found!"
        }),
        createRequirement({
            command: "git log -S'password'",
            description: "Find commits that added or removed 'password' text",
            successMessage: "Password-related changes tracked!"
        }),
        createRequirement({
            command: "git log --oneline --author='Sarah'",
            description: "Find all commits by Sarah to understand her contributions",
            successMessage: "Sarah's contribution history analyzed!"
        })
    ],
    story: createStory({
        title: "The Security Audit Trail",
        narrative: `🛡️ Red alert! Your company just received a security audit, and the auditors want a complete history of all security-related changes in your codebase.

The lead auditor, a serious woman with sharp eyes, sits across from you:

"We need to understand your security posture. Show us every commit that touched authentication, password handling, or encryption. We want to see who made changes, when, and why."

Your heart sinks. The codebase has 2,847 commits over 3 years. How do you find every security-related change without manually checking each one?

Your security team lead, Marcus, walks over with a knowing smile:

"Time to unleash the power of advanced Git log techniques. Git doesn't just store changes - it stores searchable metadata. You can find commits by:

- Message content (--grep)
- Code content (-S for 'pickaxe' search)
- Author (--author)
- Date ranges (--since, --until)
- File paths (-- path/to/file)
- And much more!"

Your mission:
1. Find all security-related commits
2. Track password handling changes
3. Identify who made authentication changes
4. Build a comprehensive audit trail

This isn't just about passing an audit - these Git forensic skills will help you understand any codebase quickly and track down issues efficiently.

The auditors are waiting. Time to show them what Git can do!`,
        realWorldContext: "Advanced Git log techniques are essential for security audits, code reviews, and understanding complex project histories.",
        taskIntroduction: "Master advanced Git log techniques for comprehensive code history investigation and forensic analysis."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/auth/security.js", `// Security utilities
// SECURITY: Encryption and hashing functions

const crypto = require('crypto');

function hashPassword(password, salt) {
    // Added password hashing - Sarah Chen, Jan 2023
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
}

function generateSalt() {
    // Security improvement - Marcus Johnson, Feb 2023
    return crypto.randomBytes(32);
}

function verifyPassword(password, hash, salt) {
    // Password verification - Sarah Chen, Jan 2023
    const newHash = hashPassword(password, salt);
    return crypto.timingSafeEqual(hash, newHash);
}

module.exports = { hashPassword, generateSalt, verifyPassword };`),
            createFileStructure("/src/auth/session.js", "// Session management\nfunction createSession(userId) {\n  // Session handling logic\n  return jwt.sign({ userId }, secretKey);\n}"),
            createFileStructure("/SECURITY.md", "# Security Guidelines\n\n## Password Policy\n- Minimum 8 characters\n- Must include special characters\n\n## Encryption\n- All passwords are hashed with PBKDF2")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial authentication system",
                    files: ["/src/auth/session.js"]
                },
                {
                    message: "Add password hashing for security",
                    files: ["/src/auth/security.js"]
                },
                {
                    message: "Security: Improve salt generation",
                    files: ["/src/auth/security.js"]
                },
                {
                    message: "Update user interface components",
                    files: ["/src/components/UserForm.js"]
                },
                {
                    message: "Security audit: Add password verification",
                    files: ["/src/auth/security.js"]
                },
                {
                    message: "Add security documentation",
                    files: ["/SECURITY.md"]
                }
            ]
        })
    })
});

const archaeologyLevel3 = createLevel({
    id: 3,
    name: "Git Reflog - The Time Machine",
    description: "Use Git reflog to recover lost commits and understand repository state changes",
    objectives: [
        "Understand what reflog tracks",
        "Recover accidentally deleted commits",
        "Find lost branch references",
        "Restore previous repository states"
    ],
    hints: [
        "Reflog tracks all HEAD movements",
        "Use git reflog to see recent actions",
        "git reset --hard can use reflog references",
        "Reflog entries expire after 90 days by default"
    ],
    requirements: [
        createRequirement({
            command: "git reflog",
            description: "Check the reflog to see recent HEAD movements",
            successMessage: "Reflog history examined!"
        }),
        createRequirement({
            command: "git reset --hard HEAD@{2}",
            description: "Reset to a previous state using reflog reference",
            successMessage: "Repository state restored!"
        }),
        createRequirement({
            command: "git branch recovery HEAD@{1}",
            description: "Create a recovery branch from a reflog entry",
            successMessage: "Recovery branch created!"
        })
    ],
    story: createStory({
        title: "The Great Git Disaster Recovery",
        narrative: `💥 DISASTER STRIKES!

It's 4:30 PM on a Friday. You're getting ready to head home when your teammate Jake rushes over, panic in his eyes:

"I messed up! I was trying to clean up some branches and accidentally ran 'git reset --hard' to what I thought was a safe commit. But I lost the entire feature branch I've been working on for two weeks!"

"All my work... the authentication system, the new UI components, the test suite... it's all gone! I don't have it backed up anywhere else!"

The office goes quiet. Everyone knows that sinking feeling of losing important work.

But you remember something your senior developer mentor told you months ago: "Git never forgets. Even when you think you've lost something, Git probably still has it somewhere."

This is where Git reflog comes to the rescue - the secret time machine that most developers don't know about.

Here's what reflog tracks:
- Every commit you've made
- Every branch switch
- Every merge, rebase, and reset
- Every time HEAD moved

Even "deleted" commits often still exist in reflog for 90 days!

Your mission:
1. Examine the reflog to see what happened
2. Find the "lost" commits
3. Recover Jake's work
4. Create a recovery branch for safety

Jake is depending on you. Time to work some Git magic and save the day!

(This is why senior developers always say: "It's probably not actually gone, let me check the reflog...")`,
        realWorldContext: "Git reflog is a powerful recovery tool that can save developers from catastrophic data loss scenarios.",
        taskIntroduction: "Master Git reflog to become the hero who can recover 'lost' work and save the day for your teammates."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Project Repository\n\nMain development branch - some work may appear to be lost!"),
            createFileStructure("/src/main.js", "// Main application\nconsole.log('Basic app structure');"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"]
                },
                {
                    message: "Add authentication system (LOST!)",
                    files: ["/src/auth/login.js", "/src/auth/register.js"]
                },
                {
                    message: "Add new UI components (LOST!)",
                    files: ["/src/components/LoginForm.js", "/src/components/UserDashboard.js"]
                },
                {
                    message: "Complete test suite (LOST!)",
                    files: ["/tests/auth.test.js", "/tests/ui.test.js"]
                }
            ]
        })
    })
});

export const archaeologyLevels = {
    1: archaeologyLevel1,
    2: archaeologyLevel2,
    3: archaeologyLevel3,
};
