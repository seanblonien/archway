# Gitlab Review

This reviews the general structure and function of how we use the features within Gitlab. Sections not mentioned were not relevant to our project and are not used (i.e. container registry is not used).

## Repository

When you open up our project on Gitlab, you will first see our repository. The repository is structured with the *develop* branch as the main branch that all of us develop and build our features off of. The *master* branch is only used for deploying to production.

Each feature/issue branch is made from an associated Gitlab issue that has an ID number that is used to name the branch. Each feature branch is used for its respective feature issue and eventually merged back into the develop branch using a merge request. This allows us to review code and ensure code quality in the project.

When a merge request is complete for a feature, the associated issue is automatically closed which is how our burndown chart remains accurate.

## Issues

Issues are used in this project to track User Stories and Tasks. We split up the project into 6 milestones that represents the 6 sprints that we were given for this project. Stories and tasks are created by the team and are ranked with Moscow prioritization. The top stories and tasks are then picked up for the current sprint (Gitlab milestone) and those stories and tasks become the committed work for the sprint.

Each user story is assigned a priority and Agile points weight. Agile points represent the relative time that the user story takes to complete. This is done so each team member is given an appropriate amount of work for each sprint. To break down user stories further, they are often split up into sub-tasks and linked to the parent user story with the tag *Parent #1*. This was story progress can be tracked more effectively.

Team members are assigned issues by election or delegation and are expected to complete their issues for the current milestone. Issues that were incorrectly estimated or incomplete roll into the next milestone.

## CI/CD

We currently do not have any CI/CD because our team agreed that it was a lower priority value add that didn't really progress the project in any substantial way. CI/CD would be top priority if the project is picked back up again.

## Wiki

We use the wiki to store all of our documentation including our guides, design documents, software engineering documentation, and other useful links and information. This is where all of the non-code information of the project is stored.

All specific project information will be found in the wiki and is considered to be the one-stop-shop for all of our documentation for the project.
