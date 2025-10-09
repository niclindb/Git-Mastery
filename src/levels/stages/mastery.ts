import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const masteryLevel1 = createLevel({
    id: 1,
    name: "Advanced Merge Strategies",
    description: "Master complex merge scenarios and custom merge strategies",
    objectives: [
        "Handle octopus merges with multiple branches",
        "Use custom merge strategies",
        "Resolve complex three-way conflicts",
        "Maintain clean merge history"
    ],
    hints: [
        "Octopus merges combine multiple branches at once",
        "Use -X options for custom merge strategies",
        "Consider merge vs rebase for different scenarios",
        "Document complex merge decisions"
    ],
    requirements: [
        createRequirement({
            command: "git merge feature/auth feature/payments feature/ui",
            description: "Perform an octopus merge of three feature branches",
            successMessage: "Octopus merge completed!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage resolved merge conflicts",
            successMessage: "Complex conflicts resolved!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit the complex merge with descriptive message",
            successMessage: "Multi-branch merge committed!"
        })
    ],
    story: createStory({
        title: "The Grand Convergence",
        narrative: `🎯 The moment of truth has arrived. You're the Lead Integration Engineer at TechCorp, and today is the day when three massive feature branches - developed in parallel by different teams over the past 3 months - must be merged into a single release.

Your CTO, Dr. Martinez, addresses the room:

"This is what we call 'The Grand Convergence.' Three teams, three critical features, all coming together. The authentication team, the payments team, and the UI team have been working independently. Now we need to merge their work into a cohesive release."

The complexity is staggering:
- 127 commits across three branches
- Overlapping file changes in shared utilities
- Different coding styles and patterns
- Interdependent features that must work together

Your mission:
1. Perform an octopus merge of all three branches
2. Resolve inevitable conflicts with wisdom
3. Ensure all features work together harmoniously
4. Document the integration decisions

This isn't just about Git mechanics - it's about software architecture, team coordination, and engineering judgment. The success of the entire release depends on your ability to bring these divergent branches together.

Welcome to the pinnacle of Git mastery. This is what senior engineers do.`,
        realWorldContext: "Complex merge scenarios are common in enterprise development where multiple teams work on integrated systems simultaneously.",
        taskIntroduction: "Master advanced merge strategies to handle complex multi-branch integration scenarios like a senior engineer."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/app.js", "// Main application\nconst auth = require('./auth');\nconst payments = require('./payments');\nconst ui = require('./ui');\n\napp.use(auth);\napp.use(payments);\napp.use(ui);"),
            createFileStructure("/src/utils/shared.js", "// Shared utilities - BASE VERSION\nfunction formatDate(date) {\n  return date.toISOString();\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature/auth", "feature/payments", "feature/ui"],
            commits: [
                {
                    message: "Initial application structure",
                    files: ["/src/app.js", "/src/utils/shared.js"]
                }
            ],
            mergeConflicts: [
                {
                    file: "/src/utils/shared.js",
                    content: `// Shared utilities
function formatDate(date) {
<<<<<<< feature/auth
  // Auth team needs ISO format
  return date.toISOString();
=======
  // Payments team needs locale format
  return date.toLocaleDateString();
>>>>>>> feature/payments
}

<<<<<<< feature/ui
// UI utility functions
function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
}
=======
// Empty - no UI utilities in other branches
>>>>>>> HEAD`
                }
            ]
        })
    })
});

const masteryLevel2 = createLevel({
    id: 2,
    name: "Git Hooks and Automation",
    description: "Implement Git hooks to automate workflows and enforce quality standards",
    objectives: [
        "Create pre-commit hooks for code quality",
        "Set up post-commit hooks for notifications",
        "Implement server-side hooks",
        "Build automated workflow pipelines"
    ],
    hints: [
        "Pre-commit hooks run before commits are created",
        "Post-commit hooks run after successful commits",
        "Use exit codes to prevent commits in pre-commit hooks",
        "Server-side hooks control what can be pushed"
    ],
    requirements: [
        createRequirement({
            command: "chmod +x .git/hooks/pre-commit",
            description: "Make the pre-commit hook executable",
            successMessage: "Pre-commit hook activated!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage files to test the pre-commit hook",
            successMessage: "Files staged!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Attempt a commit to trigger the quality checks",
            successMessage: "Quality checks passed!"
        })
    ],
    story: createStory({
        title: "The Quality Guardian",
        narrative: `⚡ You've been promoted to DevOps Engineer, and your first mission is to implement the "Quality Guardian" - an automated system that prevents bad code from entering the repository.

The development team has been growing rapidly, and with growth comes inconsistency:
- Commits without proper testing
- Code style violations
- Secrets accidentally committed
- Broken builds pushed to main

Your team lead, Sarah, explains the vision:

"We need automation to enforce our quality standards. Every commit should be automatically checked for:
- Linting and code style
- Unit test passage
- Security vulnerabilities
- Commit message standards"

"Git hooks are perfect for this. They're scripts that run at specific points in the Git workflow. Think of them as quality gates that code must pass through."

The hook ecosystem:
- pre-commit: Run checks before commits are created
- pre-push: Validate before pushing to remote
- post-commit: Send notifications or trigger builds
- Server-side hooks: Control what can be pushed

Your mission:
1. Implement a pre-commit hook for quality checks
2. Set up automated testing and linting
3. Create notification systems
4. Build a comprehensive quality pipeline

This is infrastructure work that will benefit every developer on your team. You're not just writing code - you're building the foundation for code quality.`,
        realWorldContext: "Git hooks are essential for implementing automated quality assurance and workflow automation in professional development environments.",
        taskIntroduction: "Master Git hooks to build automated quality systems that enforce standards and improve team productivity."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/.git/hooks/pre-commit", `#!/bin/sh
# Pre-commit hook for quality assurance

echo "🔍 Running pre-commit quality checks..."

# Check for code style
echo "Checking code style..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix code style issues."
    exit 1
fi

# Run tests
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix failing tests."
    exit 1
fi

# Check for secrets
echo "Checking for secrets..."
if grep -r "password\|secret\|api_key" src/; then
    echo "❌ Potential secrets detected. Please remove them."
    exit 1
fi

echo "✅ All quality checks passed!"
exit 0`),
            createFileStructure("/src/main.js", "// Main application\n// TODO: Remove this secret before commit\nconst apiKey = 'sk-test-123';\n\nconsole.log('App starting...');"),
            createFileStructure("/package.json", '{\n  "name": "quality-app",\n  "scripts": {\n    "test": "echo \\"Running tests...\\" && exit 0",\n    "lint": "echo \\"Checking code style...\\" && exit 0"\n  }\n}')
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Set up quality automation infrastructure",
                    files: ["/.git/hooks/pre-commit", "/package.json"]
                }
            ]
        })
    })
});

const masteryLevel3 = createLevel({
    id: 3,
    name: "Git Mastery: The Final Challenge",
    description: "Combine all advanced Git techniques to solve a complex real-world scenario",
    objectives: [
        "Orchestrate a complex release with multiple hotfixes",
        "Handle emergency rollbacks and recovery",
        "Coordinate with multiple teams simultaneously",
        "Demonstrate mastery of all Git techniques"
    ],
    hints: [
        "This challenge combines everything you've learned",
        "Think strategically about branch management",
        "Communication is as important as technical skills",
        "Document your decisions for the team"
    ],
    requirements: [
        {
            id: "create-emergency-branch",
            command: "git switch -c",
            alternativeCommands: ["git checkout -b"],
            requiresArgs: ["any"],
            description: "Create an emergency rollback branch",
            successMessage: "Emergency procedures initiated!"
        },
        createRequirement({
            command: "git cherry-pick",
            description: "Cherry-pick critical fixes",
            successMessage: "Critical fixes applied!"
        }),
        createRequirement({
            command: "git tag -a v2.1.1 -m",
            description: "Tag the emergency release",
            successMessage: "Emergency release tagged!"
        }),
        createRequirement({
            command: "git push origin --tags",
            description: "Push the emergency release tags",
            successMessage: "🎉 MASTERY ACHIEVED! You are now a Git Master!"
        })
    ],
    story: createStory({
        title: "The Ultimate Git Challenge: Black Friday Crisis",
        narrative: `🚨 BLACK FRIDAY, 2:00 AM - THE ULTIMATE TEST

You are the Senior DevOps Engineer at MegaCorp, and you're facing the perfect storm of Git challenges on the biggest shopping day of the year.

The situation:
- Production is partially broken due to a bad deployment
- Three different teams pushed hotfixes simultaneously
- The payment system is failing intermittently
- Customer support is overwhelmed
- The CEO is asking for hourly updates
- Black Friday traffic is 50x normal levels

Your CTO calls an emergency meeting:

"This is why we hired you. Everything we've built, everything we've learned, comes down to this moment. We need someone who can navigate complex Git operations under extreme pressure."

The challenge involves:
1. **Emergency Rollback**: Quickly revert the problematic deployment
2. **Selective Recovery**: Cherry-pick only the good changes
3. **Hotfix Coordination**: Merge critical fixes from multiple teams
4. **Release Management**: Create and deploy emergency patches
5. **Team Communication**: Coordinate across development, QA, and operations

You must use every Git technique in your arsenal:
- \`git rebase -i\` to clean up messy commits
- \`git cherry-pick\` to select only working features
- Advanced merging with \`git merge\` to combine team efforts
- \`git bisect\` to find the exact problem commit
- \`git reflog\` to recover from mistakes
- \`git tag\` and branches for release management

This isn't just about Git commands - it's about leadership, decision-making under pressure, and the ability to think systematically when everything is on fire.

The company's Black Friday revenue depends on you. Millions of customers are waiting. Your team is looking to you for guidance.

This is your moment. Show them what a Git Master can do.

Ready to prove your mastery? The clock is ticking...`,
        realWorldContext: "Real-world Git mastery involves orchestrating complex operations under pressure, managing multiple stakeholders, and making critical decisions that affect business operations.",
        taskIntroduction: "This is the ultimate Git challenge - combine all your skills to handle a complex, high-pressure emergency scenario."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/EMERGENCY.md", "# BLACK FRIDAY EMERGENCY RESPONSE\n\n## Status: CRITICAL\n\n### Issues:\n- Payment system failing\n- Checkout process broken\n- Performance degraded\n\n### Action Required:\n- Emergency rollback\n- Selective hotfix deployment\n- Customer communication"),
            createFileStructure("/src/payments/processor.js", "// Payment processor - BROKEN VERSION\nfunction processPayment(data) {\n  // BUG: This breaks on high load\n  return processAsync(data).catch(() => null);\n}"),
            createFileStructure("/src/checkout/cart.js", "// Shopping cart - PARTIALLY WORKING\nfunction calculateTotal(items) {\n  // Good implementation\n  return items.reduce((sum, item) => sum + item.price, 0);\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "hotfix/payment-fix", "hotfix/performance", "hotfix/checkout"],
            commits: [
                {
                    message: "Working Black Friday preparation (GOOD)",
                    files: ["/src/payments/processor.js", "/src/checkout/cart.js"]
                },
                {
                    message: "Deploy performance optimizations (BROKEN)",
                    files: ["/src/payments/processor.js"]
                },
                {
                    message: "Emergency: Add monitoring and alerts",
                    files: ["/EMERGENCY.md"]
                }
            ]
        })
    })
});

export const masteryLevels = {
    1: masteryLevel1,
    2: masteryLevel2,
    3: masteryLevel3,
};
