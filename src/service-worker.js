importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {
  if (event.tag === 'post-data') {
    event.waitUntil(handleSyncEvent());
  }
});

async function handleSyncEvent() {
  try {
    const db = await openIndexedDB();
    const userName = await getData(db);
    await addData(userName);
    db.close();
  } catch (error) {
    console.error('Error during sync event:', error);
  }
}

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('my-db', 1); // Increment the version if schema changes
    request.onerror = (event) => reject('Error opening IndexedDB');
    request.onsuccess = (event) => resolve(event.target.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('user-store')) {
        db.createObjectStore('user-store', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function getData(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['user-store'], 'readonly');
    const objectStore = transaction.objectStore('user-store');
    const request = objectStore.get('name');
    request.onerror = (event) => reject('Error getting data from IndexedDB');
    request.onsuccess = (event) => {
      const userName = request.result && request.result.name;
      console.log('Name of the user is ' + userName);
      resolve(userName);
    };
  });
}

function addData(userName) {
  let obj = {
    name: userName,
  };
  return fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
}
