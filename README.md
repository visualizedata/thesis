# How to contribute updates to this repository

It is recommended to follow the best practices detailed in the MS Data Visualization GitHub workflow document found at https://github.com/visualizedata/github-workflow

---

Please be mindful of keeping your project links active. Please submit a pull request with your new project URL if you relocate your work to a different domain name or hosting provider.

---

### WIP

The project vues and data are currently pulling from script.js - it will eventually be pulling from json/project.json. Cleaned JSON in stored in json/cleaned.json. Some additional notes:

- Intro text is currently broken into two parts in data.json and should be pulled in dynamically in future iterations
- Additional scripts managing the UI componenets can be found in into.js.
- The student github and video links are currently conditionally rendered v-if and v-show in index.html
- The data connected to student projects is handled with v-bind 
- Json data should eventually be passed in as a json object as with the other thesis microsites.

### Data

Project data is stored in the [./data/data.json](./data/data.json) file. It is currently manually pulled into the script.js as an array.

The JSON object contains two arrays: "projects" and "students"

Projects follow this template:

```
{
    "name": "Student Name",
    "githublink": "<https://github.com/github/repo>",
    "title": "Project Title",
    "projectlink": "<PROJECT LINK>",
    "year": "#YYYY",
    "previews": "<static/preview-YYYY/name.png>",
    "intro": "Lorem ipsum",
    "videolink": "<https://github.com/videolink/demo.m4v?raw=true>",
    "hashtag_1": "#data",
    "hashtag_2": "#policy"
}
```

---

### Workflow for contributing to MS Data Visualization repositories

1. Initial setup:

   - [Fork a repository, create a local clone of your fork, and configure Git to sync your fork with the original repository](https://help.github.com/articles/fork-a-repo/)

2. In the local clone of your fork, [create a branch for your edits](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).  
   `git branch mybranch` creates a branch named _mybranch_  
   `git checkout mybranch` switches to the branch _mybranch_

   - Do all your work in this branch.
   - [Push your branch](https://help.github.com/articles/pushing-to-a-remote/) to the forked repo early and often.
   - Never work in the `main` branch!
   - gh-pages will publish *directly to the live site* (it takes about 5 minutes to update)

3. [Pull in changes often from the `upstream main` to keep it synced](https://help.github.com/articles/syncing-a-fork/) so that when you prepare your pull request, merge conflicts will be less likely. Again, never work in the `main` branch!

4. [Merge the fork main into the fork branch](https://stackoverflow.com/a/16957483) and, if applicable, [resolve any merge conflicts](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/).  
   `git merge <branch>` merges the specified branch into the current branch.

5. When you are ready for your contributions to be considered, open a [Pull Request](https://help.github.com/articles/creating-a-pull-request/) in GitHub. The Pull Request should be for the up-to-date **branch** of your fork. Prior to submitting the Pull Request, make sure you have:
   - Synced the fork main with the latest version of the upstream main (#3).
   - Merged the fork main to the fork branch and resolved any merge conflicts (#4).


### Tips

Use [GitHub issues](https://guides.github.com/features/issues/) to log problems and communicate.

Sometimes, you mess up and need to go back to a previous commit. [Use `revert`](https://www.atlassian.com/git/tutorials/undoing-changes/git-checkout). Do not use `reset`! Here's a helpful [Stack Overflow answer](http://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit).

### Helpful resources

- [Introduction to GitHub Flow](https://guides.github.com/introduction/flow/)
- [GitHub Help: Collaborating on projects using issues and pull requests](https://help.github.com/categories/collaborating-on-projects-using-issues-and-pull-requests/)
- [GitHub Guides: contributing to open source](https://guides.github.com/activities/contributing-to-open-source/)


