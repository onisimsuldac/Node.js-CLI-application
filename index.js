
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
