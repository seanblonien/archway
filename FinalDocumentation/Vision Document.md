# Vision Document

Sean Blonien

Jack Titzman

Katy Atchison

Caleb DeHaan

Yunzhe Liu

Emily Tracey



## Introduction

##### Purpose

The purpose of this document is to define the high-level scope and purpose of the Archway Capstone Management System. This document will discuss the the problem, proposed solution, and high-level features of the project.

##### Scope

This document encompasses the entirety of the Archway project. The project will be developed by a group of six students in the *Section 02 - Pariveda 03* group at Baylor University. This project will be built off of the existing Cappy project previously developed by the *Section 02 - Group 01* group at Baylor University in Spring 2019. Archway will allow universities to showcase their capstone projects and potential sponsors to browse existing and archived projects.

##### Definitions, Acronyms, and Abbreviations

##### References

##### Overview



## Positioning

##### Business Opportunity

Many universities offer capstone programs that give upper-level students the opportunity to demonstrate and synthesize the knowledge and experience that they have gained throughout their college career. These programs can exist in many different departments. Currently, there is not a dedicated system that allows universities to showcase these capstone programs on their website.

The Archway software product will allow universities to create and edit customizable capstone project pages. Then, potential sponsors and other users will be able to search for capstones so they can express their interest in getting involved. Finally, sponsors will be able to collaborate with the university by proposing new project ideas for future capstone programs to work on.

##### Problem Statement

The lack of a capstone management system affects both universities and sponsors. The impact of the problem is that universities are missing out on possible sponsorships by failing to showcase their capstone programs. A successful solution would include the creation of a capstone management system that allows universities to showcase capstone projects in a simple, easy to use website.

##### Product Position Statement

For universities with capstone programs that currently do not have a way to showcase capstone projects, Archway is a Capstone Management System that provides universities with a centralized and configurable software solution to get their capstone projects seen by sponsors. Unlike other systems which are geared more towards a single audience, our product benefits both universities and sponsors.



## User Descriptions

*Student* - Students are part of capstone projects. They can view their capstone projects, and edit their profile.

*TA* - TAs are part of capstone projects. They can edit capstone pages.

*Professor* - Professors are part of capstone projects. They can create, edit, and delete capstone pages. They can also approve proposed capstone projects. They can also edit their department page.

*University Marketing* - University Marketing users can configure Archway to fit their university's branding. They can change the default color scheme. They can upload images to be displayed in different places on the site, and they can edit any configurable text. University Marketing users can also determine which capstone projects are featured.

*Sponsor* - Sponsors are part of capstone projects. Sponsors can edit their sponsor page or create a new sponsor page. Sponsors can propose new capstone projects.

*Admin* - Admins have complete control over the site. They can create, edit, and delete roles with varying permissions. They can assign roles to users. They can import new users. They can create, edit, and delete capstone projects and department pages.



## Product Overview

##### Product Perspective

The Archway product is intended to be used by many universities as they see fit. Some universities may choose to use Archway as a standalone application, while others may choose to integrate it into their main website.

##### Summary of Capabilities

| Customer Benefit                                             | Supporting Feature                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Universities can showcase their capstone projects            | Professors can create, edit, and delete capstone projects. University marketing can determine which projects are featured. |
| Students can gain exposure.                                  | Students can update their profile so that when sponsors are browsing capstones they can also look for potential recruits. |
| Sponsors can propose project ideas.                          | Sponsors can submit a project proposal form that will then be reviewed by the relevant professors. |
| Sponsors can contribute to projects that they are interested in. | Sponsors can browse capstone projects and choose to get involved by contacting the appropriate professor(s). |

##### Assumptions and Dependencies

* The Archway server will have the necessary ports open, and the necessary software installed to run Archway (Javascript, NodeJS, Strapi, MongoDB, Docker)
* If the admin changes the default roles/permissions, the features in this vision document may not be the same.



## Product Features

##### View and Search Capstones

Ability for all users to see capstones and filter capstone content on the search page

##### New Sponsor Sign Up

Ability for a potential sponsor to sign up so they can manage projects and project proposals

##### Project Proposal

Ability for a signed in sponsor to request a project proposal

##### Create Capstone

Ability for a professor or admin to create a capstone project Actors: Professor or admin

##### Edit Capstone

Ability for a participant in a capstone

##### Import Users

Ability for an admin to add users

##### User Complete Sign Up

Ability for a new user to complete registration

##### Change Dynamic Content

Ability for an admin to change text, photos and dynamic content



## Constraints

A major constraint might be the customizability of Archway. While it would be nice to allow users to have full customizability over the look and feel of the site, including layouts, images, markdown text, etc, it simply may not be feasible for a team of six to build in this kind of customizability in the short time frame of 4 months without detracting from the quality of the other aspects of the site. Our goal is to implement basic theming options like colors and markdown text, but we may not be able to make configurable forms.

## Quality Ranges

*Performance* - Our goal with the overall performance of the site is to have all pages and data load quickly (0-2 seconds), and components on the pages to be responsive to the actions taken on them.

*Robustness* - Our goal is to make Archway robust in the sense that the site will not break if users are not using it correctly. Of course, we would like to make the site as user-friendly as possible, but we also want to be prepared to handle malicious users.

*Usability* - Our goal is to make Archway user-friendly. The site navigation should feel natural and exploratory, and all forms should be clearly labeled and named appropriately.



## Precedence and Priority

For this project, we are using the MoSCoW method of prioritization. Each user story is reported in our GitLab backlog and assigned either a Must, Should, Could, or Won't label. We will work on completing the user stories in this order as the sprints progress. As the project advances, we will continue to reevaluate the existing user stories and may decide to change their prioritization. Our goal is to finish all of the “must haves” and as many “should haves” and “could haves” as we can by the final presentation.



## Documentation Requirements

All of the documentation for Archway, including this vision document, will be included in the team's GitLab wiki. The following documents will be included in the wiki:

##### Guides

* Installation Guide
* Programmer Guide
* Introduction to Docker
* Docker Commands
* Gitlab Markdown Guide
* User Guide
* Gitlab Review

##### Design

* Wireframes
* Brand and Logo
* Roles and Permissions

##### Software Engineering Documentation

* Planning Document
* Database Design Diagrams
* Glossary
* Use Cases
* Vision Document
* Requirements Document
* Old Documentation

##### Other

* Project Team Contact Info
* Milestone 1 Presentation
* Final Presentation



The final documentation for Archway will be in the FinalDocumentation folder in the root directory.



## Team Responsibilities

##### About Page

* Sean Blonien

##### All Departments Page

* Katy Atchison

##### API Controller

* Sean Blonien

##### Architecture Diagram

* Katy Atchison

##### Authentication

* Sean Blonien
* Caleb DeHaan

##### Burndown Chart

* Sean Blonien

##### Code Standardization/Linting

* Sean Blonien

##### Configurable Styling/Theming

* Katy Atchison (Strapi content types)
* Sean Blonien (In-app solution)

##### Create Capstone Page

* Yunzhe Liu

##### Dashboard Page

* Sean Blonien

##### Demo Data

* Katy Atchison
* Yunzhe Liu
* Jack Titzman
* Emily Tracey

##### Docker Files

* Sean Blonien

##### Domain Diagrams

* Yunzhe Liu

##### Database Import/Export Scripts

* Sean Blonien

##### Email Verification

* Caleb DeHaan

##### FAQ Page

* Emily Tracey

##### Footer

* Sean Blonien (Dynamic)
* Caleb DeHaan (Design)

##### Header

* Sean Blonien (Dynamic)
* Emily Tracey (Design)

##### Home Page

* Emily Tracey

##### Import Users Page

* Sean Blonien

##### Installation Guide

* Sean Blonien

##### Login

* Caleb DeHaan

##### Markdown Editor

* Sean Blonien

##### Professor User Guide

* Yunzhe Liu

##### Profile Page (View and Edit)

* Jack Titzman

##### Programmer Guide

* Sean Blonien

##### Project Proposals (Create and Approve)

* Emily Tracey

##### Public User Guide

* Katy Atchison

##### Registration

* Caleb DeHaan

##### Role Based Access Control (RBAC)

* Sean Blonien

##### Routing

* Sean Blonien

##### Search Results Page (Search and Filter)

* Jack Titzman

##### Single Capstone Page

* Katy Atchison

##### Single Department Page

* Katy Atchison (Design)
* Emily Tracey (Edit Department)

##### Single Sponsor Page

* Katy Atchison (Design)
* Emily Tracey (Edit Sponsor)

##### Sponsor Landing Page

* Katy Atchison

##### Snackbar Notifications

* Sean Blonien

##### Student User Guide

* Katy Atchison

##### Vision Document

* Jack Titzman

