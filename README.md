# Employee Management site

Built for tourism, this app allows you to manage tours, employees, sites, etc. for better organization and tour management.

## Admin Privledges
!["Admin Home."](https://github.com/gtemple/employee-site-tnt/blob/main/docs/admin-home.png)

Accounts designated with admin priviledges are top-level users that have full access to view and edit any other user.

- Admins can add/remove Admin priveledges from other users.
- Admins can add/remove Moderator priviledges from other users.
- Admins can activate or deactivate accounts. For more information, continue to the Activated status section.


## Known issues:

- Cookies need to be consolidated to a single function. Currently they are being declared separately in multiple parts of the app which causes issues when attempting to statically render a page. A short-term patch has been implemented but will ultimately need to re-configure user authentication to improve app performance.
