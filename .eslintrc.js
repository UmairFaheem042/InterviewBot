module.exports = {
  extends: ["next", "next/core-web-vitals"],
  rules: {
    // Disable specific rules
    "react/no-unescaped-entities": "off", // Example rule you might disable
    "no-console": "warn", // Change console log errors to warnings
    // Add other custom rules as needed
  },
};
