# Use Cases

## 01: View and Search Capstones

Summary: Ability for all users to see capstones and filter capstone content on the search page  
Actors: General User  
Preconditions: User lands on the homepage  
Flow:

1. User navigates to the project page via drop down menu, project button, or view more projects link.
1. On the project page, user can search for a desired project by filtering by department, date, or searching for key words.
1. User clicks on a project to view all information on a new page.

Postconditions: User is able to freely explore capstone projects.

## 02: New Sponsor Sign Up

Summary: Ability for a potential sponsor to sign up so they can manage projects and project proposals  
Actors: Potential Sponsor  
Preconditions: None  
Flow:

1. Sponsor navigates to sign up page by clicking account button in top menu bar.
1. Sponsor selects tab sign up.
1. Sponsor enters email, password and selects submit.
1. Sponsor is prompted to complete registration and select company to associate with.

Alternative Flow:

3a. If email entered is already in use, error message is displayed and user is prompted to enter a different email.
4a. If user chooses not to enter more information at this time they will be prompted to do so next time they sign in.

Postconditions: Sponsor is now logged in, Sponsor is able to sign out and log in in the the future

## 03: New Project Proposal

Summary: Ability for a signed in sponsor to request a project proposal  
Actors: Sponsor, Admin  
Preconditions: Sponsor has logged in  
Flow:

1. Sponsor selects "New Proposal" from their dashboard.
1. Sponsor is prompted to enter contact information, project information, financial information, and project use.
1. Sponsor selects "Submit".
1. Proposal is sent to Admin for approval.

Alternate Flows:  
3a. Sponsors selects "Save".  
b. Sponsor is returned to dashboard and can view the saved Proposal.  
1a. Sponsor selects "Edit" next to an existing proposal.  
b. Sponsor can make changes to any fields in the proposal.

Postconditions: Sponsor can view submitted proposals and edit saved proposals, Admin can view pending proposals

## 04: Create Capstone

Summary: Ability for a professor or admin to create a capstone project
Actors: Professor or admin  
Preconditions: User is signed in  
Flow:

1. User selects "Create New Capstone" from the menu.
1. User is prompted to enter contact information, project information, participant information, dates, and photos related to the project.
1. User selects "Create".

Postconditions: New capstone can now be viewed from projects page, and can be edited by team members

## 05: Edit Capstone

Summary: Ability for a participant in a capstone  
Actors: Student, Professor or admin
Preconditions: All users have logged in  
Flow:

1. Student selects "View your Capstones" from the menu.
1. Student clicks "Edit" next to a capstone.
1. Student edits any desired fields in the capstone including name and description
1. Student clicks "Save".
1. Professor navigates to pending edits.
1. Professor clicks "Review".
1. Professor Clicks "Approve" after viewing requested edits.

Alternative Flow:

7a. Professor selects "Deny".  
7b. Student is notified that their change was not approved.

Postconditions: If change was approved, it appears on the view project page.

## 06: Import users

Summary: Ability for an admin to add users  
Actors: admin  
Preconditions: Admin has logged in  
Flow:

1. User selects "Import Users" from the their dashboard.
1. User inputs required fields.
1. User selects "Import".

Alternative flow:
2a. User uploads a file of student names
3a. User email is already in the system, so the Admin is notified.

Postconditions: Imported users are notified to complete their account and can log in

## 07: User Complete Sign Up

Summary: Ability for a new user to complete registration
Actors: Student or professor or other user  
Preconditions: Admin has already imported the user, user has received email  
Flow:

1. User navigates to sign in.
1. User signs in from email instructions.
1. User is prompted to enter remaining profile information.

Postconditions: User can sign in and edit profile

## 08: Change Dynamic Content

Summary: Ability for an admin to change text, photos and dynamic content  
Actors: Admin  
Preconditions: Admin has logged in  
Flow:

1. Admin navigates to edit dynamic content page.
1. Admin completes desired fields, including colors and images.
1. Admin is able to input text for each page.
1. Admin selects submit.

Postconditions: Content is displayed on the site.
