// const contacts = require('./contacts');

// // Test listContacts
// contacts.listContacts().then(console.log);

// // Test getContactById
// contacts.getContactById(1).then(console.log);

// // Test removeContact
// contacts.removeContact(1).then(console.log);

// // Test addContact
// contacts.addContact('John Doe', 'john.doe@example.com', '123-456-7890').then(console.log);

// const contacts = require('./contacts');

// // Test listContacts
// contacts.listContacts().then(contactsList => {
//   console.log("Lista de contacte:");
//   console.log(contactsList);
// }).catch(error => console.error(error));

// // Test getContactById
// const contactIdToFind = 1;
// contacts.getContactById(contactIdToFind).then(foundContact => {
//   console.log(`Contactul cu ID-ul ${contactIdToFind}:`);
//   console.log(foundContact);
// }).catch(error => console.error(error));

// // Test removeContact
// const contactIdToRemove = 1;
// contacts.removeContact(contactIdToRemove).then(remainingContacts => {
//   console.log(`Contactul cu ID-ul ${contactIdToRemove} a fost eliminat.`);
//   console.log("Lista actualizată de contacte:");
//   console.log(remainingContacts);
// }).catch(error => console.error(error));

// // Test addContact
// const newContact = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   phone: '123-456-7890'
// };
// contacts.addContact(newContact.name, newContact.email, newContact.phone).then(addedContact => {
//   console.log("Contactul nou adăugat:");
//   console.log(addedContact);
// }).catch(error => console.error(error));

const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then(contactsList => {
        console.log("Lista de contacte:");
        console.log(contactsList);
      }).catch(error => console.error(error));
      break;

    case "get":
      contacts.getContactById(id).then(foundContact => {
        console.log(`Contactul cu ID-ul ${id}:`);
        console.log(foundContact);
      }).catch(error => console.error(error));
      break;

    case "add":
      contacts.addContact(name, email, phone).then(addedContact => {
        console.log("Contactul nou adăugat:");
        console.log(addedContact);
      }).catch(error => console.error(error));
      break;

    case "remove":
      contacts.removeContact(id).then(remainingContacts => {
        console.log(`Contactul cu ID-ul ${id} a fost eliminat.`);
        console.log("Lista actualizată de contacte:");
        console.log(remainingContacts);
      }).catch(error => console.error(error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
