import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const teamworkLevel1 = createLevel({
    id: 1,
    name: "Team Collaboration Basics",
    description: "Learn how to work effectively with a team using Git",
    objectives: [
        "Clone a team repository",
        "Set up your local development environment",
        "Make your first team contribution",
        "Push changes to shared repository"
    ],
    hints: [
        "Always pull latest changes before starting work",
        "Use descriptive commit messages for team visibility",
        "Communicate with your team about what you're working on",
        "Follow the team's branching strategy"
    ],
    requirements: [
        createRequirement({
            command: "git pull origin main",
            description: "Pull the latest changes from the team repository",
            successMessage: "Latest changes pulled successfully!"
        }),
        createRequirement({
            command: "git checkout -b feature/team-profile",
            description: "Create your feature branch for team profile",
            successMessage: "Feature branch created!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage your team profile changes",
            successMessage: "Changes staged!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit your team profile with a descriptive message",
            successMessage: "Team profile committed!"
        })
    ],
    story: createStory({
        title: "Welcome to the Dev Team",
        narrative: `🎉 Congratulations! You've just been hired as a developer at InnovateCorp, a fast-growing tech startup.

Your team lead, Alex, walks you through your first day:

"Welcome to the team! We use Git for everything here. The codebase is our shared workspace, and everyone contributes to it daily. Your first task is simple but important - add your profile to our team page."

"Remember," Alex continues, "we have 12 developers working on this project. Everyone needs to stay synchronized. Always \`git pull\` before you push, and make sure your commit messages are clear so the rest of us know what you're working on."

Your mission:
1. Get the latest code from the team repository with \`git pull origin main\`
2. Create your feature branch with \`git checkout -b feature/team-profile\`
3. Add your developer profile
4. Commit and push your changes with \`git commit -m "Add my profile"\`

This is real-world team development. Let's make your first contribution!`,
        realWorldContext: "Team collaboration is the heart of software development. Learning to work with shared repositories is essential for any developer.",
        taskIntroduction: "Learn the fundamentals of team-based Git workflow and make your first collaborative contribution."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/team.md", "# Development Team\n\n## Team Members\n- Alex Chen - Team Lead\n- Sarah Miller - Senior Developer\n- Mike Johnson - Frontend Developer\n\n## Add your profile here!"),
            createFileStructure("/src/components/TeamPage.jsx", "// Team page component\nexport function TeamPage() {\n  return <div>Team profiles coming soon...</div>;\n}"),
            createFileStructure("/README.md", "# InnovateCorp Project\n\nA collaborative development environment.")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial team structure setup",
                    files: ["/team.md", "/src/components/TeamPage.jsx", "/README.md"]
                }
            ]
        })
    })
});

const teamworkLevel2 = createLevel({
    id: 2,
    name: "Handling Merge Conflicts in Teams",
    description: "Resolve merge conflicts that occur when multiple developers work on the same files",
    objectives: [
        "Understand how merge conflicts occur",
        "Pull changes that conflict with your work",
        "Resolve merge conflicts manually",
        "Complete the merge process"
    ],
    hints: [
        "Merge conflicts happen when two people edit the same lines",
        "Look for conflict markers: <<<<<<<, =======, >>>>>>>",
        "Communicate with teammates when resolving conflicts",
        "Test your code after resolving conflicts"
    ],
    requirements: [
        createRequirement({
            command: "git pull origin main",
            description: "Pull changes that will create a merge conflict",
            successMessage: "Conflicting changes pulled!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage the resolved conflict",
            successMessage: "Conflict resolution staged!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit the merge resolution",
            successMessage: "Merge conflict resolved!"
        })
    ],
    story: createStory({
        title: "The Great Merge Conflict Crisis",
        narrative: `⚠️ Uh oh! You've just encountered your first merge conflict.

You've been working on the user authentication system all morning. You're feeling great about your progress - clean code, good tests, everything looks perfect.

But when you try to pull the latest changes from your teammate Sarah with \`git pull origin main\`, Git throws an error:

"CONFLICT (content): Merge conflict in src/auth/login.js"
"Automatic merge failed; fix conflicts and then commit the result."

Your heart skips a beat. What happened?

It turns out Sarah was also working on the authentication system. She pushed her changes while you were working, and now both of your changes are trying to modify the same lines of code.

This is completely normal in team development! Merge conflicts are a fact of life when multiple developers collaborate. The key is knowing how to resolve them properly.

Your mission:
1. Examine the conflict markers in the code (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`)
2. Decide which changes to keep
3. Remove the conflict markers
4. Test that everything still works
5. Commit the resolution with \`git add .\` and \`git commit -m "Resolve merge conflict"\`

Remember: When in doubt, talk to your teammate! Sarah is probably just a Slack message away.`,
        realWorldContext: "Merge conflicts are inevitable in team development. Learning to resolve them quickly and correctly is a crucial skill.",
        taskIntroduction: "Master merge conflict resolution to become a confident team collaborator."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/auth/login.js", "// Authentication module\nfunction validateLogin(username, password) {\n  // Your implementation\n  return username.length > 0 && password.length >= 6;\n}"),
            createFileStructure("/src/auth/signup.js", "// User registration\nfunction createUser(userData) {\n  return database.users.create(userData);\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Add authentication foundation",
                    files: ["/src/auth/login.js", "/src/auth/signup.js"]
                }
            ],
            mergeConflicts: [
                {
                    file: "/src/auth/login.js",
                    content: `// Authentication module
function validateLogin(username, password) {
<<<<<<< HEAD
  // Your implementation
  return username.length > 0 && password.length >= 6;
=======
  // Sarah's implementation
  if (!username || !password) return false;
  return username.length >= 3 && password.length >= 8;
>>>>>>> origin/main
}`
                }
            ]
        })
    })
});

const teamworkLevel3 = createLevel({
    id: 3,
    name: "Code Review Workflow",
    description: "Learn to participate in code reviews and collaborate through pull requests",
    objectives: [
        "Prepare code for review",
        "Create a pull request",
        "Address review feedback",
        "Merge approved changes"
    ],
    hints: [
        "Write clear pull request descriptions",
        "Make atomic commits that are easy to review",
        "Respond to feedback professionally",
        "Test thoroughly before requesting review"
    ],
    requirements: [
        createRequirement({
            command: "git checkout -b feature/code-review-demo",
            description: "Create a branch for code review demonstration",
            successMessage: "Review branch created!"
        }),
        createRequirement({
            command: "git add .",
            description: "Stage your code for review",
            successMessage: "Code staged for review!"
        }),
        createRequirement({
            command: "git commit -m",
            description: "Commit with a clear, reviewable message",
            successMessage: "Code committed for review!"
        }),
        createRequirement({
            command: "git push origin feature/code-review-demo",
            description: "Push your branch for code review",
            successMessage: "Code pushed for team review!"
        })
    ],
    story: createStory({
        title: "The Code Review Culture",
        narrative: `📝 At InnovateCorp, no code goes to production without a code review. It's not about trust - it's about quality, knowledge sharing, and catching bugs before customers do.

Your team lead Alex explains the process:

"Code reviews are where we really shine as a team. Sarah might catch a bug you missed. Mike might suggest a better approach. And sometimes, you'll teach us something new!"

"The key is to write code that tells a story. Each commit should be logical. Your pull request description should explain not just what you changed, but why."

You've just finished implementing the password reset feature. It's working perfectly in your local tests, but now it needs to go through the team's review process.

The code review process:
1. Create a focused feature branch with \`git checkout -b feature/password-reset\`
2. Write clean, well-documented code
3. Push to origin with \`git push origin feature/password-reset\` and create a pull request
4. Address feedback from reviewers
5. Merge once approved

This is how professional development teams ensure code quality and share knowledge. Your code review skills are just as important as your coding skills!`,
        realWorldContext: "Code reviews are standard practice in professional development, improving code quality and fostering team knowledge sharing.",
        taskIntroduction: "Learn to participate effectively in code reviews and collaborative development workflows."
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/auth/password-reset.js", "// Password reset functionality\nfunction initiatePasswordReset(email) {\n  // TODO: Implement password reset logic\n  console.log('Password reset requested for:', email);\n}"),
            createFileStructure("/src/auth/email-service.js", "// Email service integration\nfunction sendResetEmail(email, token) {\n  // Email sending logic here\n  return true;\n}"),
            createFileStructure("/tests/password-reset.test.js", "// Tests for password reset\ntest('password reset sends email', () => {\n  // Test implementation\n});")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Add authentication system foundation",
                    files: ["/src/auth/password-reset.js", "/src/auth/email-service.js"]
                }
            ]
        })
    })
});

export const teamworkLevels = {
    1: teamworkLevel1,
    2: teamworkLevel2,
    3: teamworkLevel3,
};
