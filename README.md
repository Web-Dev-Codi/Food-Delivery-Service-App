# Git Workflow Guidelines

## Branch Structure

- `main` - Production-ready code
- `development` - Integration branch for feature development
- Feature branches - Individual feature development

## Development Workflow

### 1. Creating a Feature Branch

```bash
# Ensure you're on the development branch
git checkout development

# Pull latest changes
git pull origin development

# Create and checkout your feature branch
git checkout -b feature/your-feature-name
```

### 2. Working on Your Feature

- Make regular commits with clear, descriptive messages
- Keep your feature branch updated with development

```bash
# Update your branch with latest development changes
git checkout development
git pull origin development
git checkout feature/your-feature-name
```

### 3. Creating a Pull Request

1. Push your feature branch to the remote repository

```bash
git push origin feature/your-feature-name
```

2. Go to the repository on GitHub
3. Create a new Pull Request
   - Base branch: `development`
   - Compare branch: `feature/your-feature-name`
4. Fill in the Pull Request template with:
   - Description of changes
   - Any related issues
   - Testing performed
   - Screenshots (if applicable)

## Important Notes

⚠️ **DO NOT MERGE PULL REQUESTS**

- All code reviews and merges will be handled by the project lead
- This applies to all branches, including feature branches to development
- Wait for approval and merge completion before starting dependent work

## Best Practices

1. Keep feature branches focused and small
2. Write clear commit messages
3. Test your changes thoroughly before creating a Pull Request
4. Respond promptly to review comments
5. Delete feature branches after successful merge

## Questions or Issues?

Contact the project lead for:

- Code review status
- Branch strategy questions
- Priority concerns

Following these guidelines ensures a smooth and organized development process while maintaining code quality and stability.
