# QA Sample E Commerce Web App - Automation Project: Playwright + Postman (Newman)

This project uses **Playwright** for UI testing and **Newman** (Postman’s CLI) for API testing. It also includes a simple **CI/CD setup with GitHub Actions**.

---

 ### Website to be Tested
 - https://automationexercise.com/

---

## Project Structure
```
your-project/
├── tests/
│   ├── ui/
│   │   └── example.spec.ts
│   └── api/
│       └── postman_collection.json
├── package.json
├── playwright.config.ts
└── .github/
    └── workflows/
        └── test.yml
```

---

## Project Setup

1. **Initialize project and install tools**

```bash
npm init playwright@latest  # Playwright for UI tests
npm install -D newman       # Newman for API tests
```

2. **Create and Export Postman Collection**
   - Open Postman app or web.
   - Create a new collection or open an existing one.
   - Add your API requests (e.g., login, get products).
   - Click the 3-dot menu next to your collection → Export → choose Collection v2.1 → save as postman_collection.json
   - Put exported file in tests/api/
     
3. **Update package.json Scripts**
```json
"scripts": {
  "test:ui": "npx playwright test",
  "test:api": "newman run tests/api/postman_collection.json"
},
```

4. **Setup Github Actions for CI/CD**

---

## Local Test Runs

#### Run UI tests with Playwright:
```bash
npm run test:ui
```

#### Run API tests with Newma:
```bash
npm run test:ui
```
