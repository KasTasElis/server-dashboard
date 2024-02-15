## Possible Improvements

Overall, my testing strategy was to "cast a wide net" over my code. I rely on less but higher level tests eg. integration & e2e. Gives me max return on investment in a short amount of time.

If i had a bit more time i would look at testing my useAuth hook in isolation next.

As the app would scale, a more robust form management and validation library would make sense. eg. react-hook-forms & ZOD.

Also, setting up a solid CI&CD pipeline with husky, Cypress & Vitest with code coverage reports would probably be the next step I would do for this repo.

## Login Credentials

Since credentials are not sensitive for this API I am including them in the readme for user's convenience.

- username: tesonet
- pass: partyanimal

## Live Application View

[🧑‍💻 Preview Live Application Here](https://kastaselis.github.io/server-dashboard)

## Important Commands

- `npm run dev` starts development server.
- `npm run build` runs build script.
- `npm run test` runs unit & integration test suite.
- `npm run test:coverage` runs the unit & integration test suite and generates a istanbul test coverage report.
- `npm run test:e2e` starts the server & runs the e2e test suite in headless mode. Exits when done.

## Application Screenshots

<div style="display: flex; gap: 30px;">
    <img src="./app-screenshot-1.png" alt="app preview" style="max-width: 50%;">
    <img src="./app-screenshot-2.png" alt="app preview" style="max-width: 50%;">
</div>
