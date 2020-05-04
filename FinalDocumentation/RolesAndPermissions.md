# Roles and Permissions

This document gives an overview of the roles and permissions in the app.

## User Permission Matrix

The following table contains the User Permission Matrix for the [Strapi backend API endpoints](https://strapi.io/documentation/3.0.0-beta.x/content-api/api-endpoints.html#endpoints).

Some things to note:

- There are some missing permissions that are currently unused. Please refer to the Strapi panel for the full list.
- When giving a permission to a role, you _MUST_ provide a defensible use case for why that role needs that permission.
- Take extra precaution when updating the Public role as it is the most vulnerable with regards to security.
- For role descriptions, see the [Vision Document](Vision Document#user-descriptions).
- When making edits, it's advisable to copy this text to another text editor to avoid the word-wrap confusion.

| Permissions\Roles             | Public | Sponsor | Student | TeachingAssistant | Professor | Marketing | Admin |
| ----------------------------- | :----: | :-----: | :-----: | :---------------: | :-------: | :-------: | :---: |
| CapstonesCount                |   ✔    |    ✔    |    ✔   |         ✔         |     ✔     |     ✔     |   ✔   |
| CapstonesCreate               |        |         |         |         ✔         |     ✔     |           |   ✔   |
| CapstonesDelete               |        |         |         |         ✔         |     ✔     |           |   ✔   |
| CapstonesFind                 |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| CapstonesUpdate               |        |         |         |         ✔         |     ✔     |           |   ✔   |
| DepartmentsCount              |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| DepartmentsCreate             |        |         |         |                   |           |           |   ✔   |
| DepartmentsDelete             |        |         |         |                   |           |           |   ✔   |
| DepartmentsFind               |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| DepartmentsUpdate             |        |         |         |                   |     ✔     |     ✔     |   ✔   |
| ProposalsCount                |        |    ✔    |         |                   |     ✔     |           |   ✔   |
| ProposalsCreate               |        |    ✔    |         |                   |           |           |   ✔   |
| ProposalsDelete               |        |         |         |                   |           |           |   ✔   |
| ProposalsFind                 |        |    ✔    |         |                   |     ✔     |     ✔     |   ✔   |
| ProposalsUpdate               |        |    ✔    |         |                   |           |           |   ✔   |
| SponsorPageDelete             |        |         |         |                   |           |           |   ✔   |
| SponsorPageFind               |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| SponsorPageUpdate             |        |         |         |                   |           |     ✔     |   ✔   |
| ThemeDelete                   |        |         |         |                   |           |           |   ✔   |
| ThemeFind                     |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| ThemeUpdate                   |        |         |         |                   |           |     ✔     |   ✔   |
| AboutPageDelete               |        |         |         |                   |           |           |   ✔   |
| AboutPageFind                 |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AboutPageUpdate               |        |         |         |                   |           |     ✔     |   ✔   |
| HomePageDelete                |        |         |         |                   |           |           |   ✔   |
| HomePageFind                  |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| HomePageUpdate                |        |         |         |                   |           |     ✔     |   ✔   |
| ProposalApprovalDelete        |        |         |         |                   |       ✔   |    ✔      |   ✔   |
| ProposalApprovalFind          |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| ProposalApprovalUpdate        |        |         |         |                   |       ✔   |     ✔     |   ✔   |
| FaqsCount                     |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| FaqsCreate                    |        |         |         |                   |           |     ✔     |   ✔   |
| FaqsDelete                    |        |         |         |                   |           |     ✔     |   ✔   |
| FaqsFind                      |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| FaqsUpdate                    |        |         |         |                   |           |     ✔     |   ✔   |
| SponsorsCount                 |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| SponsorsCreate                |        |    ✔    |         |                   |           |           |   ✔   |
| SponsorsDelete                |        |         |         |                   |           |           |   ✔   |
| SponsorsFind                  |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| SponsorsUpdate                |        |    ✔    |         |                   |           |     ✔     |   ✔   |
| ContentTypesFindContentType   |        |         |         |                   |           |           |   ✔   |
| ContentTypesListContentTypes  |        |         |         |                   |           |           |   ✔   |
| ContentTypesUpdateContentType |        |         |         |                   |           |           |   ✔   |
| EmailGetEnvironments          |        |         |         |                   |           |           |   ✔   |
| EmailGetSettings              |        |         |         |                   |           |           |   ✔   |
| EmailSend                     |        |         |         |                   |           |           |   ✔   |
| EmailUpdateSettings           |        |         |         |                   |           |           |   ✔   |
| UploadCount                   |        |         |         |                   |           |           |   ✔   |
| UploadDestory                 |        |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UploadFind                    |        |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UploadGetEnvironments         |        |         |         |                   |           |           |   ✔   |
| UploadGetSettings             |        |         |         |                   |           |           |   ✔   |
| UploadSearch                  |        |         |         |                   |           |           |   ✔   |
| UploadUpdateSettings          |        |         |         |                   |           |           |   ✔   |
| UploadUpload                  |        |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AuthCallback                  |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AuthChangePassword            |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AuthConnect                   |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AuthEmailConfirmation         |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AuthForgotPassword            |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| AuthRegister                  |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |    ✔      |   ✔   |
| AuthSendEmailConfirmation     |   ✔    |    ✔    |    ✔    |        ✔          |     ✔     |     ✔     |   ✔   |
| UserCreate                    |        |         |         |         ✔         |     ✔     |           |   ✔   |
| UserDestroy                   |        |         |         |                   |           |           |   ✔   |
| UserDestroyAll                |        |         |         |                   |           |           |   ✔   |
| UserFind                      |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UserMe                        |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UserUpdate                    |        |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UserspermissionsGetRoles      |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UserspermissionsGetRole       |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |
| UserspermissionsInit          |   ✔    |    ✔    |    ✔    |         ✔         |     ✔     |     ✔     |   ✔   |

[1] To remake the table, use [this generator](https://www.tablesgenerator.com/markdown_tables)
