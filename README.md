# helJS
A Javascript/Node/React API interface to Redmine bugtracker.

## Installation
```bash
npm -i --save @owlnext/hel-js
```

## Usage

### Import and initialize
```typescript
import Hel from '@owlnext/hel-js';

// ...

const hel = new Hel({
    api_url: 'https://...',
    api_key: 'qsd5f4tye85rq...',
    project_id: 1
});

```

### Create a simple issue

```typescript
hel.createIssue({
    subject: "Error happens",
    description: "Some issue happened...",
    reporter_identity: "Admin Istrator",
}).then((issue: Issue) => {
    // treat issue 
}).catch((error: HelException) => {
    // treat error
});
```

Create an issue with a screenshot

```typescript
const screenshot_content = '/** the image content as base64 string **/'

hel.createIssue({
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
}).then((issue: Issue) => {
    // treat issue 
}).catch((error: HelException) => {
    // treat error
});
```

Full example

```typescript
const screenshot_content = '/** the image content as base64 string **/'

await hel.createIssue({
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
}).then((issue: Issue) => {
    // treat issue 
}).catch((error: HelException) => {
    // treat error
});
```