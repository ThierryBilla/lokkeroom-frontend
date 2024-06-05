# Lokkeroom Front-End

Lokkeroom is a full-stack messaging app project that includes a PostgreSQL database, a Node.js/Express back-end, and a React.js front-end. The goal of this project is to enable users to sign up, log in, and participate in online chats.

## Online Demo

[Visit Lokkeroom Front-End](https://lokkeroom-frontend-24fab992f120.herokuapp.com/)

## Features

- **Sign Up and Log In**: Users can create an account and log in to access the app.
- **Chat List and Message Windows**: Displays available chat rooms and message windows for logged-in users.

## Technologies Used

- **Database**: PostgreSQL (deployed on Heroku)
- **Back-end**: Node.js with Express
- **Front-end**: React.js

## Project Status

- **Database**: Already deployed on Heroku.
- **Back-end**: Appears to be finished and works well, with potential minor adjustments needed for front-end integration.
- **Front-end**: In progress with several tasks and improvements to be made.

## Remaining Tasks and Next Steps

### Features to Develop
1. **Modals**: Develop modals for each popup instead of using browser prompts and alerts.
2. **Messages in Group Lobbies**:
   - Debug message display. Currently, sent messages always appear on top of received messages when the browser is refreshed.
   - Improve message layout (add username, date/time, position message bubbles, animations).
3. **Direct Messages (DM)**:
   - Debug the DM function (currently not fetching DMs).
   - Check for layout improvements similar to group lobby messages.
4. **Log Out Button**: Add a button to allow users to log out.
5. **Back-end Deployment**: Deploy the back-end.

### Future Improvements
- Leave a lobby.
- Invite someone to a lobby.
- Kick or ban a user from a lobby.
- Show the list of people inside a lobby.
- Block a user’s messages.
- Add a profile picture.
- Rename a lobby.
- Delete lobbies or DMs from the list.
- Responsive design.
- Send pictures.

## Local Installation and Development

To set up this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lokkeroom-frontend.git
   cd lokkeroom-frontend

2. Install dependencies:
   ```bash
   npm install

3.Start the application:
   ```bash
   npm install


## Contribution

Contributions are welcome! To propose improvements or report issues, please open an issue or submit a pull request.
