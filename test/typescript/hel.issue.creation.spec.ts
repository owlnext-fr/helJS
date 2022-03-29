import Hel from "../../src";
import * as fs from "fs";
import HelException from "../../src/exception/hel-exception";

describe('Hel issue creation testing', () => {
    let hel: Hel;
    let apiKey = '04dab6140d0c772548f646369995421bd6153193';
    let apiUrl = 'http://172.122.0.1:8822';
    let project_id = 1;

    beforeEach(() => {
       hel = new Hel({
           api_key: apiKey,
           api_url: apiUrl,
           project_id: project_id
       });
    });

    test('Create simple issue', async () => {
        await hel.createIssue({
            description: "test desc",
            reporter_identity: "User testing",
            subject: "test"
        }).then(issue => {
            expect(issue).toHaveProperty('id');
        }).catch(error => {
            fail(`Oops, seems the test failed : ${error}`)
        });
    })

    test('Create incorrect issue', async () => {
        hel = new Hel({
            api_key: apiKey,
            api_url: apiUrl,
            project_id: 999
        });

        await hel.createIssue({
            description: "test desc",
            reporter_identity: "User testing",
            subject: "test"
        }).then(issue => {
            fail(`As it is an error case test, you should not be in the then() function. Result : ${JSON.stringify(issue)}`)
        }).catch(error => {
            expect(error).toBeInstanceOf(HelException);
        });
    })

    test('Create issue with screenshot', async () => {
        const screenshot_content = fs.readFileSync(__dirname + '/data/test_sample.jpg').toString('base64');

        await hel.createIssue({
            description: "test w screenshot",
            reporter_identity: "Obi-Wan Kenobi",
            subject: "test w screenshot",
            screenshots: [
                {
                    name: 'screenshot_ex.jpg',
                    content: screenshot_content,
                    content_type: 'image/jpeg'
                }
            ]
        }).then(issue => {
            expect(issue).toHaveProperty('id');
        }).catch(error => {
            fail(`Oops, seems the test failed : ${error}`)
        });
    });

    test('Create issue with invalid screenshot upload', async () => {
        const screenshot_content = fs.readFileSync(__dirname + '/data/test_sample.jpg').toString('base64');

        hel = new Hel({
            api_key: apiKey,
            api_url: 'foobarbaz',
            project_id: 999
        });

        await hel.createIssue({
            description: "test w screenshot",
            reporter_identity: "Obi-Wan Kenobi",
            subject: "test w screenshot",
            screenshots: [
                {
                    name: 'screenshot_ex.jpg',
                    content: screenshot_content,
                    content_type: 'image/jpeg'
                }
            ]
        }).then(issue => {
            fail(`As it is an error case test, you should not be in the then() function. Result : ${JSON.stringify(issue)}`)
        }).catch(error => {
            expect(error).toBeInstanceOf(HelException);
        });
    });

    test('Create issue with screenshot with data-url', async () => {
        let screenshot_content = fs.readFileSync(__dirname + '/data/test_sample.jpg').toString('base64');
        screenshot_content = `data:image/jpeg;base64,${screenshot_content}`;

        await hel.createIssue({
            description: "test w screenshot",
            reporter_identity: "Obi-Wan Kenobi",
            subject: "test w screenshot",
            screenshots: [
                {
                    name: 'screenshot_ex.jpg',
                    content: screenshot_content,
                    content_type: 'image/jpeg'
                }
            ]
        }).then(issue => {
            expect(issue).toHaveProperty('id');
        }).catch(error => {
            fail(`Oops, seems the test failed : ${error}`)
        });
    });

    test('Create full issue', async () => {
        const screenshot_content = fs.readFileSync(__dirname + '/data/test_sample.jpg').toString('base64');

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
        }).then(issue => {
            expect(issue).toHaveProperty('id');
        }).catch(error => {
            fail(`Oops, seems the test failed : ${error}`)
        });
    });

});