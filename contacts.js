const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funcții pentru gestionarea contactelor
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading contacts: ${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    console.error(`Error getting contact: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  } catch (error) {
    console.error(`Error removing contact: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: contacts.length ? Math.max(contacts.map(contact => contact.id)) + 1 : 1,
      name,
      email,
      phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(`Error adding contact: ${error}`);
  }
}

// Exportă funcțiile
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
