# helJS
A Javascript/Node/React API interface to Redmine bugtracker and easily add issues.

| Statements                                    | Branches                                  | Functions                                   | Lines                               | Build Status                                    |
|-----------------------------------------------|-------------------------------------------|---------------------------------------------|-------------------------------------|-------------------------------------------------|
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") |

## Installation
```bash
npm -i --save @owlnext/hel-js
```

## Usage

#### Import and initialize
```typescript
import Hel from '@owlnext/hel-js';

// ...

const hel: Hel = new Hel({
    api_url: 'https://...',         // base URL for redmine api
    api_key: 'qsd5f4tye85rq...',    // api token for redmine api
    project_id: 1                   // redmine project id for issue reporting
});

```

#### Create a simple issue
```typescript
let issue: Issue;

try {
    issue = await hel.createIssue({
        subject: "Error happens",
        description: "Some issue happened...",
        reporter_identity: "Admin Istrator",
    });
} catch (error) {
    // treat errors.
}
```

#### Create an issue with a screenshot
```typescript
const screenshot_content: string = '/** the image content as base64 string **/'

let issue: Issue;

try {
    issue = await hel.createIssue({
        subject: "Error happens",
        description: "Some issue happened...",
        reporter_identity: "Admin Istrator",
        screenshots: [
            {
                name: 'screenshot_example.jpg',
                content: screenshot_content,
                content_type: 'image/jpeg'
            }
        ]
    });
} catch (error) {
    // treat errors.
}
```

#### Full example
```typescript
const screenshot_content: string = '/** the image content as base64 string **/'

let issue: Issue;

try {
    issue = await hel.createIssue({
        description: "test w screenshot",
        reporter_identity: "Obi-Wan Kenobi",
        subject: "test w screenshot",
        url: "http://localhost:8822",
        session_data: "{'session_id': 43531551}",
        stack_trace: "        at /var/www/src/hel.ts:69:23\n" +
                     "        at processTicksAndRejections (internal/process/task_queues.js:95:5)\n",
        additional_data: {
            "foo": "bar"
        },
        screenshots: [
            {
                name: 'screenshot_ex.jpg',
                content: screenshot_content,
                content_type: 'image/jpeg'
            }
        ]
    });
} catch (error) {
    // treat errors.
}
```

## License

This module is under [MIT license](./LICENSE.md).

## Naming

> Hel (Old Norse: [ˈhel]) is a female being in Norse mythology who is said to preside over an underworld realm of the same name, where she receives a portion of the dead. 
> 
> Wikipedia