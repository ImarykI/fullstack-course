0.4: New note diagram

```mermaid
sequenceDiagram
participant user
participant browser
participant server



    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

user ->>browser: User writes on the text field
user->>browser: User presses the Save button
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
Note right of browser: Server saves the input in form of string in data.json array
server-->>browser: Status: 302 Found
deactivate server
Note right of browser: The server asks the browser to perform a new GET request
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->>browser: loads the HTML document and returns 200
Note right of browser: Then the server fulfills all of the request in order as it did above.
deactivate server
Note right of browser: The JS code loads again all of the messages plus the new one at the end of the array
```

0.5: Single page app diagram

```mermaid
sequenceDiagram
participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server-->>browser: spa.html document
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server-->>browser: main.css file
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate server
server-->>browser: spa.js file
deactivate server
Note right of browser: The script initiates the fetch of the json file

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server-->>browser: data.json
deactivate server
Note right of browser: The browser renders the notes.

Note right of browser: This element is not in the example but my browser is requesting a favicon
browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
activate server
server->>browser: Status 404 Not Found the server could not found the requested resource
deactivate server
```

0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
participant server
participant browser
participant jscode

browser->>jscode: Sending the input immediately calls the event handler that prevents the GET request of the browser
jscode-->>browser: The input is formatted into a new note and pushed/added to the nodes list
Note right of browser: Also the script calls redrawNotes() to redraw the notes on the page, and sendToServer(note) to initiate a POST

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of browser: the new note is Posted as json data
activate server
server-->>browser: Status 201 and json: message:	"note created"
deactivate server
