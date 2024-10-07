import subprocess
import random
from datetime import datetime, timedelta

def reset_git_repo():
    try:
        # Initialize the git repository if not already initialized
        subprocess.run(["git", "init"], check=True)

        # Remove any existing commits by resetting the repository to an empty state
        subprocess.run(["git", "checkout", "--orphan", "temp_branch"], check=True)
        subprocess.run(["git", "rm", "-rf", "."], check=True)  # Remove all tracked files
        subprocess.run(["git", "commit", "--allow-empty", "-m", "Initial empty commit"], check=True)
        subprocess.run(["git", "branch", "-D", "main"], check=True)  # Delete the 'main' branch
        subprocess.run(["git", "branch", "-m", "main"], check=True)  # Rename 'temp_branch' to 'main'

        print("Git repo reset, no commits left on the main branch.")
    except subprocess.CalledProcessError as e:
        print(f"Error resetting repo: {e}")

def generate_random_commit_message():
    messages = [
        "Fix bug in module",
        "Update documentation",
        "Refactor code",
        "Improve performance",
        "Add feature X",
        "Remove deprecated code",
        "Optimize function Y"
    ]
    return random.choice(messages)

def create_random_commits(days=5, num_commits=5):
    today = datetime.today()

    try:
        for _ in range(num_commits):
            # Generate a random number of days and time for the commit
            random_days_ago = random.randint(0, days - 1)
            random_time = random.randint(0, 23*60*60)  # Random seconds in a day

            # Calculate the commit date
            commit_date = today - timedelta(days=random_days_ago, seconds=random_time)
            commit_date_str = commit_date.strftime('%Y-%m-%dT%H:%M:%S')

            # Generate a random commit message
            commit_message = generate_random_commit_message()

            # Use GIT_AUTHOR_DATE and GIT_COMMITTER_DATE to set commit time
            env = {
                'GIT_AUTHOR_DATE': commit_date_str,
                'GIT_COMMITTER_DATE': commit_date_str
            }

            # Make an empty commit with the random date
            subprocess.run(
                ["git", "commit", "--allow-empty", "-m", commit_message],
                check=True, env=env
            )
            print(f"Created commit '{commit_message}' on {commit_date_str}")
        
        print(f"{num_commits} random commits created over the last {days} days.")
    except subprocess.CalledProcessError as e:
        print(f"Error creating commits: {e}")

if __name__ == "__main__":
    # Step 1: Reset the git repository to remove all commits
    reset_git_repo()

    # Step 2: Create random commits over the past 5 days
    create_random_commits(days=5, num_commits=5)
