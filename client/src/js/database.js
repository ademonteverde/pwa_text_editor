import { openDB } from 'idb';

const initDb = async () => {
  const dbName = 'jate';
  const dbVersion = 1;
  
  try {
    const db = await openDB(dbName, dbVersion, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(dbName)) {
          const store = database.createObjectStore(dbName, {
            keyPath: 'id',
            autoIncrement: true,
          });
          console.log(`${dbName} database created`);
        }
      },
    });
    
    console.log(`${dbName} database is ready`);
    return db;
  } catch (error) {
    console.error(`Error initializing ${dbName} database: ${error}`);
  }
};

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const dbName = 'jate';
  
  try {
    const db = await initDb();
    const tx = db.transaction(dbName, 'readwrite');
    const store = tx.objectStore(dbName);
    const request = store.put({ value: content });
    await tx.complete;
    console.log('Data saved to IndexedDB:', request);
  } catch (error) {
    console.error('Error saving data to IndexedDB:', error);
  }
};

// logic for a method that gets all the content from the database
export const getDb = async () => {
  const dbName = 'jate';
  
  try {
    const db = await initDb();
    const tx = db.transaction(dbName, 'readonly');
    const store = tx.objectStore(dbName);
    const request = store.get(1);
    const result = await request;
    return result?.value;
  } catch (error) {
    console.error('Error retrieving data from IndexedDB:', error);
  }
};

// Initialize the database when the module is imported
initDb();
