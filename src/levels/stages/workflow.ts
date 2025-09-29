import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const workflowLevel1 = createLevel({
    id: 1,
    name: "Feature Branch Workflow",
    description: "Learn the industry-standard feature branch workflow used by teams worldwide",
    objectives: [
        "Create a feature branch from main",
        "Make commits with descriptive messages",
        "Push your feature branch to remote",
        "Create a pull request simulation"
    ],
    hints: [
        "Always branch from the latest main branch",
        "Use descriptive branch names like 'feature/user-authentication'",
        "Make atomic commits that represent single logical changes",
        "Write commit messages that explain the 'why', not just the 'what'"
    ],
    requirements: [
        createRequirement({
            command: "git checkout -b feature/user-auth",
            description: "Create a new feature branch for user authentication",
            successMessage: "Feature branch created successfully!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage your changes",
            successMessage: "Changes staged!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit your changes with a descriptive message",
            successMessage: "Changes committed!"
        })
    ],
    story: createStory({
        title: "The Feature Factory",
        narrative: `You're a developer at TechCorp, and the team follows strict Git workflows. Your manager Sarah just assigned you a new feature: implementing user authentication.

"Remember," Sarah says, "we never commit directly to main. Always use feature branches, and make sure your commits tell a story."

You need to:
1. Create a feature branch with \`git checkout -b feature/user-auth\`
2. Implement the feature with meaningful commits using \`git commit -m "descriptive message"\`
3. Push to remote for code review with \`git push origin feature/user-auth\`
4. Prepare for merge back to main

This is how real software teams work - let's master it!`,
        realWorldContext: "Feature branch workflow is the industry standard for team collaboration, allowing developers to work on features in isolation before merging.",
        taskIntroduction: "Learn to create feature branches and follow professional Git workflows."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# TechCorp Project\n\nA cutting-edge web application."),
            createFileStructure("/src/app.js", "// Main application file\nconsole.log('App starting...');"),
            createFileStructure("/package.json", '{\n  "name": "techcorp-app",\n  "version": "1.0.0"\n}')
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project setup",
                    files: ["/README.md", "/src/app.js", "/package.json"]
                }
            ]
        })
    })
});

const workflowLevel2 = createLevel({
    id: 2,
    name: "Hotfix Workflow",
    description: "Handle urgent production fixes with the hotfix workflow",
    objectives: [
        "Create a hotfix branch from main",
        "Fix a critical bug",
        "Merge hotfix back to main and develop",
        "Tag the hotfix release"
    ],
    hints: [
        "Hotfixes branch directly from main/master",
        "Use descriptive hotfix names like 'hotfix/critical-security-patch'",
        "Hotfixes should be merged back to both main and develop branches",
        "Always tag hotfix releases for tracking"
    ],
    requirements: [
        createRequirement({
            command: "git checkout -b hotfix/security-patch",
            description: "Create a hotfix branch for the security issue",
            successMessage: "Hotfix branch created!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage your security fixes",
            successMessage: "Security fixes staged!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit the critical security patch",
            successMessage: "Security patch committed!"
        }),
        createRequirement({
            command: "git checkout main",
            description: "Switch back to main branch",
            successMessage: "Switched to main branch!"
        }),
        createRequirement({
            command: "git merge hotfix/security-patch",
            description: "Merge the hotfix into main",
            successMessage: "Hotfix merged successfully!"
        })
    ],
    story: createStory({
        title: "Code Red: Production Emergency",
        narrative: `🚨 URGENT: Production is down! 🚨

At 2:47 AM, your phone buzzes with alerts. The payment system is failing, and customers can't complete purchases. The bug tracker shows a critical security vulnerability was introduced in the latest release.

As the on-call developer, you need to:
1. Immediately create a hotfix branch with \`git checkout -b hotfix/security-patch\`
2. Fix the critical security issue
3. Deploy the fix ASAP
4. Merge back to both main and develop using \`git merge hotfix/security-patch\`
5. Tag the emergency release with \`git tag v1.0.1\`

Every minute costs the company thousands. This is what separates junior developers from senior ones - grace under pressure and knowing the right Git workflows.

Time is money. Let's fix this!`,
        realWorldContext: "Production hotfixes are critical for maintaining system stability and require immediate, focused workflow execution.",
        taskIntroduction: "Master the hotfix workflow for emergency production fixes."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/payment.js", "// Payment processing\nfunction processPayment(data) {\n  // SECURITY BUG: No input validation!\n  return database.insert(data);\n}"),
            createFileStructure("/src/security.js", "// Security utilities\nfunction validateInput(input) {\n  // TODO: Implement validation\n  return true;\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "develop"],
            commits: [
                {
                    message: "Add payment system",
                    files: ["/src/payment.js", "/src/security.js"]
                }
            ]
        })
    })
});

const workflowLevel3 = createLevel({
    id: 3,
    name: "Git Flow Mastery",
    description: "Master the complete Git Flow workflow with release branches",
    objectives: [
        "Create and manage release branches",
        "Handle multiple feature branches",
        "Perform release preparation",
        "Master the complete Git Flow cycle"
    ],
    hints: [
        "Release branches are created from develop",
        "Only bug fixes go into release branches",
        "Release branches merge to both main and develop",
        "Use semantic versioning for releases"
    ],
    requirements: [
        createRequirement({
            command: "git checkout -b release/2.0.0",
            description: "Create a release branch for version 2.0.0",
            successMessage: "Release branch created!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage release preparation changes",
            successMessage: "Release changes staged!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit release preparation",
            successMessage: "Release preparation committed!"
        }),
        createRequirement({
            command: "git checkout main",
            description: "Switch to main branch for release",
            successMessage: "Switched to main!"
        }),
        createRequirement({
            command: "git merge release/2.0.0",
            description: "Merge release into main",
            successMessage: "Release merged to main!"
        })
    ],
    story: createStory({
        title: "The Release Manager",
        narrative: `Congratulations! You've been promoted to Release Manager at GitFlow Inc., a company that ships software every two weeks like clockwork.

Your job is to orchestrate the release of version 2.0, which includes:
- Three new features from different teams
- Two critical bug fixes
- Performance improvements
- Updated documentation

You must:
1. Create a release branch from develop with \`git checkout -b release/2.0.0\`
2. Perform final testing and bug fixes
3. Prepare release notes
4. Merge to main with \`git merge release/2.0.0\` and tag the release with \`git tag v2.0.0\`
5. Merge back to develop

This is enterprise-level Git management. Welcome to the big leagues!`,
        realWorldContext: "Release management is crucial for coordinating team efforts and ensuring stable software deployments.",
        taskIntroduction: "Learn to manage complex release workflows with multiple teams and features."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/CHANGELOG.md", "# Changelog\n\n## v1.9.0\n- Initial release"),
            createFileStructure("/src/features/feature1.js", "// New feature 1"),
            createFileStructure("/src/features/feature2.js", "// New feature 2")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "develop",
            branches: ["main", "develop", "feature/new-ui", "feature/api-integration"],
            commits: [
                {
                    message: "Prepare for v2.0 release",
                    files: ["/CHANGELOG.md", "/src/features/feature1.js"]
                }
            ]
        })
    })
});

export const workflowLevels = {
    1: workflowLevel1,
    2: workflowLevel2,
    3: workflowLevel3,
};
