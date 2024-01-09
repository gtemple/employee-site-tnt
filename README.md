# Employee Management site

Built for tourism, this app allows you to manage tours, employees, sites, etc. for better organization and tour management.

## Admin Privledges
!["Admin Home."](https://github.com/gtemple/employee-site-tnt/blob/main/docs/admin-home.png)

Accounts designated with admin priviledges are top-level users that have full access to view and edit any other user. The Admin button will only appear in the main navigation bar to users with Admin privledges

- Admins can add/remove Admin priveledges from other users.
- Admins can add/remove Moderator priviledges from other users.
- Admins can activate or deactivate accounts. (For more information, continue to the Activated status section)

## Moderator Privledges
!["Moderator Home."](https://github.com/gtemple/employee-site-tnt/blob/main/docs/moderator-home.png)

Moderators are second-level users and have access to the most extensive toolset of any designation.  Users can only be given Moderator priveledges by Admins.

- Moderators can add, delete, or edit data that can later be viewed including:
  - Sites
  - Restaurants
  - Hotels
  - Schools
  - Destinations
  - Tours (for more details, refer to the 'Creating a Tour' section)

## Creating a Tour
to be written

## Active Accounts – including requesting a tour
to be written


## Known issues:

- Cookies need to be consolidated to a single function. Currently they are being declared separately in multiple parts of the app which causes issues when attempting to statically render a page. A short-term patch has been implemented but will ultimately need to re-configure user authentication to improve app performance.


## Features to be implemented:

- Detailed site information including maps integration and Activity director speeches so that it's easily accessible while on tour
