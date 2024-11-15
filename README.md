### Screesnshots:
![Authentication](/public/SS0.png)

<hr/>

![Dashboard](/public/SS1.png)

<hr/>

![Add Interview](/public/SS2.png)

<hr/>

![Interview Details, without camera permissions](/public/SS3.png)

<hr/>

![Interview Details, with camera permissions](/public/SS4.png)

<hr/>

![Questions Page](/public/SS5.png)

<hr/>

![Feedback Page](/public/SS6.png)

<hr/>

### Project Journey:

- Default 1st `git commit` here.
- Iniatialised new Next project.
- For Authentication used Clerk with builtIn components for SignIn and SignUp.
- For Designing Authentication Pages used HyperUi and added SignIn and SignUp component in that.
- Took Header Component from HyperUi and configured as per requirements.
- Did 2nd `git commit` here.
- SetUp Backend(DataBase) for the App with Drizzle ORM and NeonDB.
- Created Schemas and other important DB related files like `db.js`, `drizzle.config.js` and `schema.js`.
- Changed scripts in packagae.json file and added `npm run db:push` and `npm run db:studio`.
- Did 3rd `git commit` here.
- Did 4th `git commit` here (updated readme).
- Started Dashboard Section by creating a modal for taking input from user for the Interview.
- Used Shadcn/ui components like dialog box, input etc here.
- Setup Gemini Model for responding to Prompt in `PromptGeneration.js`.
- Did 5th `git commit` here.
- After generating response from Gemini save it in drizzle and saved responses can be seen on [Drizzle Studio](https://local.drizzle.studio/).
- Did 6th `git commit` here.
- Now created new route `/dashboard/interview/[interviewId]`.
- In [interviewId] folder, created page.jsx and in that fetched particular interview response from db.
- Set up camera and microphone UI and configurations.
- Did 7th `git commit` here.
- Created `/dashboard/interview/[interviewId]/start` route where questions would be displayed along with the Camera and Microphone.
- Used `react-hook-speech-to-text` for recording what user speaks and saved it in a state.
- Did 8th `git commit` here.
- Lifted the state of activeQuestionIndex from Questions.jsx.
- Used Gemini again to generate Feedback, similar to generating questions
- In RecordedAnswers.jsx recorded user response and saved it into the DB, each answer is saved corresponding to its question.
- Added buttons at the bottom for switching the questions.
- Did 9th `git commit` here.
- Created `/dashboard/interview/[interviewId]/feedback` route where user can see all Feedback of the interview.
- on `/dashboard` route to each Interview Box, added delete button and created a delete handler but it is incomplete as there is an error regarding the attribute onClick. I am in server component and using events which should be of client component.
- Did 10th `git commit` here.
- Solved Delete issue by taking delete handler to the client component(it's child).
- Added Confirm Delete Dialog Box from shadcn/ui.
- On /dashboard route, handled UI where no interviews are there by conditional rendering.
- Did 11th `git commit` here.
- Fixed the bug while Recording the answers, the bug was i was able to record answer again for same question, so i used sessionStorage to keep a track of the questions
- Another bug was that i was unable to record answer again(try again) in case the response was not saved to DB.
- Found another bug, I was fetching All Interview on /dashboard route including of other users. To solve this changed component to client component and used useUser() to get user info and based on that applied where clause while fetching.
- Did 12th `git commit` here.
- Added Loading Screen in between deletion process.
- Did 13th `git commit` here.
- Fixed mobile responsive issues where extra white space(more height) was visible, it was because of Header component.
- Did 14th `git commit` here.