const fs = require("node:fs/promises");

const path = require("node:path");

const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
}

async function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const contacts = await read();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await read();

  return contacts.find((contact) => contact.id === contactId);
}

async function addContact(name, email, phone) {
  const contacts = await read();

  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);
  await write(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await read();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await write(updatedContacts);
  return contacts[index];
}

module.exports = { listContacts, getContactById, addContact, removeContact };
