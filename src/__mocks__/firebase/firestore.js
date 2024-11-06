export const doc = jest.fn();
export const getDoc = jest.fn();
export const updateDoc = jest.fn();

export const initializeApp = jest.fn();

const db = {
    doc,
    getDoc,
    updateDoc
}

export const getFirestore = jest.fn(() => db);