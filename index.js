const { program } = require("commander");

const contacts = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return contactsList;
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      return contact;
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return newContact;
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return removeContact;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

console.log(process.argv);

program.parse(process.argv);
const options = program.opts();
console.log(options);

invokeAction(options)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
