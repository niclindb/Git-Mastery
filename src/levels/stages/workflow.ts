import {
    createLevel,
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
        "Merge your feature branch back to main"
    ],
    hints: [
        "Start by creating a feature branch: 'git switch -c feature/user-auth'",
        "Modify the auth.js file, then use 'git add' to stage your changes",
        "Commit with: 'git commit'",
        "Push to remote: 'git push origin feature/user-auth'",
        "Switch back to main: 'git switch main'",
        "Finally merge: 'git merge feature/user-auth'"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-feature-branch",
            command: "git switch -c",
            alternativeCommands: ["git checkout -b"],
            description: "Create a new feature branch with 'git switch -c <branch>'",
            successMessage: "Feature branch created successfully!"
        },
        {
            id: "stage-changes",
            command: "git add",
            description: "Stage your changes (modify a file first!)",
            successMessage: "Changes staged!"
        },
        {
            id: "commit-changes",
            command: "git commit",
            requiresArgs: ["any"],
            description: "Commit your changes with a descriptive message",
            successMessage: "Changes committed!"
        },
        {
            id: "push-feature",
            command: "git push",
            requiresArgs: ["origin"],
            description: "Push your feature branch to remote (git push origin <your-branch>)",
            successMessage: "Feature branch pushed to remote!"
        },
        {
            id: "switch-to-main",
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "Switch back to main branch with 'git switch main'",
            successMessage: "Switched to main branch!"
        },
        {
            id: "merge-feature",
            command: "git merge",
            description: "Merge your feature branch into main",
            successMessage: "Feature successfully merged! This is how real teams integrate new features."
        }
    ],
    story: createStory({
        title: "The Feature Factory",
        narrative: `You're a developer at TechCorp, and the team follows strict Git workflows. Your manager Sarah just assigned you a new feature: implementing user authentication.

"Remember," Sarah says, "we never commit directly to main. Always use feature branches, and make sure your commits tell a story."

**What's a Feature Branch?**
A feature branch is a separate branch where you develop a new feature in isolation. This allows you to:
- Work without affecting the stable main branch
- Get code reviewed before merging
- Easily abandon or modify work without impacting others

**The Complete Workflow:**
1. Create a feature branch from main: \`git switch -c feature/user-auth\`
2. Make changes to files and stage them with \`git add\`
3. Commit changes with descriptive messages
4. Push your branch to remote: \`git push origin feature/user-auth\`
5. Switch back to main: \`git switch main\`
6. Merge the feature: \`git merge feature/user-auth\`

**What are Pull Requests (PRs)?**
In real teams, after step 4 (pushing your branch), you'd create a **Pull Request** on GitHub/GitLab instead of merging directly:

**Pull Request Workflow:**
1. You push your feature branch to the remote repository
2. On GitHub/GitLab, you open a Pull Request from \`feature/user-auth\` to \`main\`
3. Your teammates receive a notification
4. They review your code, leave comments, and suggest improvements
5. You make changes based on feedback and push again
6. Once approved, someone merges the PR into main
7. Your feature is now part of the main codebase!

**Why Pull Requests Matter:**
- **Code Quality**: Multiple eyes catch bugs and suggest improvements
- **Knowledge Sharing**: Team learns about changes before they go live
- **Documentation**: PR descriptions explain WHY changes were made
- **Discussion**: Complex decisions are discussed and recorded
- **Safety**: Prevents broken code from reaching production

In this level, we're simulating the workflow by having you push and merge directly to learn the Git commands. In real projects, you'd always use Pull Requests for team collaboration!`,
        realWorldContext: "Feature branch workflow is the industry standard. Developers create isolated branches, push them to remote repos (GitHub/GitLab), create Pull Requests for code review, and merge after approval. This collaborative approach prevents unstable code from reaching production and improves code quality through peer review.",
        taskIntroduction: "Master the complete feature branch workflow: create, commit, push, and merge. This is how professional teams ship features every day."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# TechCorp Project\n\nA cutting-edge web application."),
            createFileStructure("/src/app.js", "// Main application file\nconsole.log('App starting...');"),
            createFileStructure("/src/auth.js", "// TODO: Add user authentication"),
            createFileStructure("/package.json", '{\n  "name": "techcorp-app",\n  "version": "1.0.0"\n}')
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project setup",
                    files: ["/README.md", "/src/app.js", "/src/auth.js", "/package.json"]
                }
            ],
            fileChanges: [
                {
                    path: "/src/auth.js",
                    status: "modified",
                    content: "// User authentication module\nfunction login(username, password) {\n  // Authentication logic here\n  return true;\n}"
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
    requirementLogic: "all",
    requirements: [
        {
            id: "create-hotfix-branch",
            command: "git switch -c",
            alternativeCommands: ["git checkout -b"],
            requiresArgs: ["any"],
            description: "Create a hotfix branch for the security issue",
            successMessage: "Hotfix branch created!"
        },
        {
            id: "stage-fixes",
            command: "git add",
            description: "Stage your security fixes",
            successMessage: "Security fixes staged!"
        },
        {
            id: "commit-fixes",
            command: "git commit",
            requiresArgs: ["any"],
            description: "Commit the critical security patch",
            successMessage: "Security patch committed!"
        },
        {
            id: "switch-to-main",
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "Switch back to main branch",
            successMessage: "Switched to main branch!"
        },
        {
            id: "merge-hotfix",
            command: "git merge",
            requiresArgs: ["any"],
            description: "Merge the hotfix into main",
            successMessage: "Hotfix merged successfully!"
        }
    ],
    story: createStory({
        title: "Code Red: Production Emergency",
        narrative: `🚨 URGENT: Production is down! 🚨

At 2:47 AM, your phone buzzes with alerts. The payment system is failing, and customers can't complete purchases. The bug tracker shows a critical security vulnerability was introduced in the latest release.

As the on-call developer, you need to:
1. Immediately create a hotfix branch: \`git switch -c hotfix/security-patch\`
2. Fix the critical security issue in the code
3. Stage and commit your fixes
4. Switch back to main: \`git switch main\`
5. Merge the hotfix: \`git merge hotfix/security-patch\`

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
        "Create a release branch from develop",
        "Prepare and commit release changes",
        "Merge release to main",
        "Tag the release version"
    ],
    hints: [
        "Start on develop and create release branch: 'git switch -c release/2.0.0'",
        "Make final adjustments and commit your release preparation",
        "Switch to main: 'git switch main'",
        "Merge the release: 'git merge release/2.0.0'",
        "Tag the release: 'git tag v2.0.0'",
        "In real projects, you'd also merge back to develop"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-release-branch",
            command: "git switch -c",
            alternativeCommands: ["git checkout -b"],
            requiresArgs: ["any"],
            description: "Create a release branch (e.g., 'release/2.0.0')",
            successMessage: "Release branch created!"
        },
        {
            id: "stage-release-changes",
            command: "git add",
            description: "Stage your release preparation changes",
            successMessage: "Release changes staged!"
        },
        {
            id: "commit-release",
            command: "git commit",
            requiresArgs: ["any"],
            description: "Commit release preparation with a clear message",
            successMessage: "Release preparation committed!"
        },
        {
            id: "switch-to-main-for-release",
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "Switch to main branch to prepare for release merge",
            successMessage: "Switched to main!"
        },
        {
            id: "merge-release",
            command: "git merge",
            requiresArgs: ["any"],
            description: "Merge your release branch into main",
            successMessage: "Release merged to main!"
        },
        {
            id: "tag-release",
            command: "git tag",
            requiresArgs: ["any"],
            description: "Tag the release with version number (e.g., 'v2.0.0')",
            successMessage: "Release tagged! Version 2.0.0 is now live in production!"
        }
    ],
    story: createStory({
        title: "The Release Manager",
        narrative: `Congratulations! You've been promoted to Release Manager at GitFlow Inc., a company that ships software every two weeks like clockwork.

Your job is to orchestrate the release of version 2.0, which includes:
- Three new features from different teams
- Two critical bug fixes
- Performance improvements
- Updated documentation

**The Release Workflow:**

1. **Create Release Branch**: Start from develop and create a release branch
   \`git switch -c release/2.0.0\`

2. **Final Preparations**: Update version numbers, CHANGELOG, etc.
   - Edit files as needed
   - \`git add .\`
   - \`git commit -m "Prepare release 2.0.0"\`

3. **Merge to Main**: Deploy to production
   - \`git switch main\`
   - \`git merge release/2.0.0\`

4. **Tag the Release**: Mark this version in history
   \`git tag v2.0.0\`

This creates a permanent marker for this release. In real projects, you'd also:
- Merge back to develop to keep it in sync
- Delete the release branch
- Push everything to remote
- Deploy to production

This is enterprise-level Git management. Welcome to the big leagues!`,
        realWorldContext: "Release branches are used in Git Flow to prepare production releases. They allow final bug fixes and documentation updates without blocking ongoing development. The release is tagged for easy reference and rollback if needed.",
        taskIntroduction: "Learn the professional release workflow: branch, prepare, merge, and tag. This is how teams ship stable software to production."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/CHANGELOG.md", "# Changelog\n\n## v1.9.0\n- Initial release"),
            createFileStructure("/package.json", '{\n  "name": "gitflow-app",\n  "version": "1.9.0",\n  "description": "Enterprise application"\n}'),
            createFileStructure("/src/features/feature1.js", "// New feature 1\nfunction newFeature1() {\n  return 'Feature 1';\n}"),
            createFileStructure("/src/features/feature2.js", "// New feature 2\nfunction newFeature2() {\n  return 'Feature 2';\n}"),
            createFileStructure("/README.md", "# GitFlow App v1.9.0\n\nEnterprise Git workflow demonstration.")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "develop",
            branches: ["main", "develop", "feature/new-ui", "feature/api-integration"],
            commits: [
                {
                    message: "Add new features to develop",
                    files: ["/CHANGELOG.md", "/src/features/feature1.js", "/src/features/feature2.js", "/package.json", "/README.md"],
                    branch: "develop"
                }
            ],
            fileChanges: [
                {
                    path: "/CHANGELOG.md",
                    status: "modified",
                    content: "# Changelog\n\n## v2.0.0\n- New UI improvements\n- API integration complete\n- Performance optimizations\n\n## v1.9.0\n- Initial release"
                },
                {
                    path: "/package.json",
                    status: "modified",
                    content: '{\n  "name": "gitflow-app",\n  "version": "2.0.0",\n  "description": "Enterprise application with major updates"\n}'
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
