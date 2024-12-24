# material-ui-vite-ts-demo
Demo of Vite with TypeScript and Material UI

# Dev Notes
- The docker-compose.yml sets the NODE_ENV variable to "production" so if you want to build the app
with this setting, use `npm install --production=false` so that dev dependencies are also installed.

Then run `npm run build`.  The content of the `dist` directory can then be deployed to the desired environment.

For local dev work, use `npm run preview -- --host` or `npm run dev -- --host`.

To run tests: `npm run test` (make sure your test file names have ".spec." or ".test.", ie `sanityCheck.spec.js`).

Pay attention to the port number in the output, you'll need that to access the dev or preview build from
your host machine's browser.

As per Microsoft documentation:
WSL shares the IP address of Windows, as it is running on Windows. As such you can access any ports on localhost e.g. if you had web content on port 1234 you could https://localhost:1234 into your Windows browser.

Source: https://learn.microsoft.com/en-us/windows/wsl/faq#how-do-i-access-a-port-from-wsl-in-windows-