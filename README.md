## Q-EDITOR Radio Button Matrix

Features involved:
- Adding columns and rows;
- Deleting columns and rows;
- Editing each of the rows and columns labels;
- Individual radio button groups based on rows;
- Statistics panel on the right including:
- Amount of rows;
- Amount of columns;
- Longest label;
- Shortest label;
- Stores the columns and rows with their labels into the database;
- Image thumbnail for each row and column with an ability to select images from the hard drive;
- Row/Column animations add add and delete events;

1. Clone the repository

```bash
git clone https://github.com/rubencarvalho/q-editor.git
cd q-editor/
```

### Server

1. Make sure you have MongoDB installed and running

```bash
mongod
```

2. Install server dependencies

```bash
cd server/
npm install

# Start the server (nodemon)
npm start
```

### Client

2. Install client dependencies

```bash
cd client/
npm install

# Start the client App
npm start
```
