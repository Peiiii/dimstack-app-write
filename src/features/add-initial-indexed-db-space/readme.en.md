### **Markdown Introduction and Tutorial Outline**

---

#### 1. **Markdown Introduction**

- Markdown is a lightweight markup language that uses simple syntax for text formatting, allowing document writers to focus on content rather than format. It is particularly suitable for technical documentation, notes, and blog writing.

#### 2. **Markdown Basic Syntax**

- **Headers**

  - Example:

    ```markdown
    # Level 1 Header
    ## Level 2 Header
    ### Level 3 Header
    ```

  - Rendering result:

  ---

# Level 1 Header

## Level 2 Header

### Level 3 Header

- **Paragraphs and Line Breaks**

  - Example:

    ```markdown
    This is a paragraph.  
    This is the next line of the same paragraph.  
    ```

  - Rendering result: This is a paragraph.\
    This is the next line of the same paragraph.

- **Emphasis**

  - Example:

    ```markdown
    *Italic* and **Bold** and _Underline_
    ```

  - Rendering result: *Italic* and **Bold** and *Underline*

- **Strikethrough**

  - Example:

    ```markdown
    ~~Strikethrough~~
    ```

  - Rendering result: ~~Strikethrough~~

- **Lists**

  - Example:

    ```markdown
    - Unordered list item 1
    - Unordered list item 2
    
    1. Ordered list item 1
    2. Ordered list item 2
    ```

  - Rendering result:

    - Unordered list item 1

    - Unordered list item 2

      1. Ordered list item 1
      2. Ordered list item 2

- **Links and Images**

  - Example:

    ```markdown
    [Link text](https://www.example.com)
    ![Image description](https://media.istockphoto.com/id/1845512061/photo/cute-domestic-cats-and-dogs-of-various-colors-run-through-a-summer-sunny-meadow.webp?b=1&s=612x612&w=0&k=20&c=_T6TSIRrqjfMbeQv9hrJafXpoj3zI3fgS_hQbg2acs4=)
    ```

  - Rendering result: [Link text](https://example.com)\
    ![Image description](https://media.istockphoto.com/id/1845512061/photo/cute-domestic-cats-and-dogs-of-various-colors-run-through-a-summer-sunny-meadow.webp?b=1&s=612x612&w=0&k=20&c=_T6TSIRrqjfMbeQv9hrJafXpoj3zI3fgS_hQbg2acs4=)

- **Blockquotes**

  - Example:

    ```markdown
    > This is a blockquote.
    ```

  - Rendering result:

    > This is a blockquote.

- **Code Blocks**

  - Example:

    ```markdown
    `Inline code`
    
    \```javascript
    // Multi-line code block
    console.log("Hello, World!");
    \```
    ```

  - Rendering result: `Inline code`

    ```javascript
    // Multi-line code block
    console.log("Hello, World!");
    ```

- **Horizontal Rule**

  - Example:

    ```markdown
    ---
    ```

  - Rendering result

#### 3. **Markdown Advanced Syntax**

- **Tables**

  - Example:

    ```markdown
    | Header 1 | Header 2 | Header 3 |
    |----------|----------|----------|
    | Cell 1   | Cell 2   | Cell 3   |
    | Cell 4   | Cell 5   | Cell 6   |
    ```

  - Rendering result:

    | Header 1 | Header 2 | Header 3 |
    |----------|----------|----------|
    | Cell 1   | Cell 2   | Cell 3   |
    | Cell 4   | Cell 5   | Cell 6   |

- **Task Lists**

  - Example:

    ```markdown
    - [x] Completed task
    - [ ] Incomplete task
    ```

  - Rendering result:

    - [x] Completed task

    - [ ] Incomplete task

- **Math Formulas**

  - Example:

    ```markdown
    Inline formula: $E = mc^2$
    
    Block formula:
    $$
    \sum_{i=1}^{n} a_i^2
    $$
    ```

Rendering result: Inline formula: $E = mc^2$

Block formula:


$$
\sum_{i=1}^{n} a_i^2
$$

- **Mermaid Diagrams**

  - Our editor supports Mermaid diagrams, allowing you to create flowcharts, sequence diagrams, Gantt charts, and many other diagram types.

  - Flowchart example:

    ```mermaid
    flowchart TD
        A[Start] --> B{Decision}
        B -->|Yes| C[Action 1]
        B -->|No| D[Action 2]
        C --> E[End]
        D --> E
    ```

  - Sequence diagram example:

    ```mermaid
    sequenceDiagram
        participant User
        participant Frontend
        participant Backend
        participant Database
        
        User->>Frontend: Send Request
        Frontend->>Backend: Process Request
        Backend->>Database: Query Data
        Database-->>Backend: Return Results
        Backend-->>Frontend: Return Data
        Frontend-->>User: Display Results
    ```

  - Gantt chart example:

    ```mermaid
    gantt
        title Project Development Plan
        dateFormat YYYY-MM-DD
        section Design Phase
        Requirements Analysis :done, des1, 2024-01-01, 2024-01-05
        Prototype Design :active, des2, 2024-01-06, 2024-01-10
        section Development Phase
        Frontend Development :dev1, 2024-01-11, 2024-01-20
        Backend Development :dev2, 2024-01-11, 2024-01-20
        section Testing Phase
        Functional Testing :test1, 2024-01-21, 2024-01-25
    ```

  - Class diagram example:

    ```mermaid
    classDiagram
        class User {
            +String name
            +String email
            +login()
            +logout()
        }
        class Article {
            +String title
            +String content
            +publish()
            +edit()
        }
        User "1" --> "*" Article : creates
    ```

  - State diagram example:

    ```mermaid
    stateDiagram-v2
        [*] --> Pending
        Pending --> InProgress: Start Processing
        InProgress --> Completed: Complete Task
        InProgress --> Pending: Pause
        Completed --> [*]
    ```

---

