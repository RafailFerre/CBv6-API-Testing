const { execSync } = require('child_process');

const runTests = (times) => {
  for (let i = 1; i <= times; i++) {
    console.log(`Run #${i}`);
    try {
      execSync('npx mocha -- test/**', { stdio: 'inherit' });
    } catch (err) {
      console.error(`Error during run #${i}:`, err);
      // process.exit(1); // Exit if a test run fails
    }
  }
};

runTests(5);
