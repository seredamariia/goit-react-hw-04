import contactsArray from '../../contacts.json';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem('saved-contacts');
    return savedContacts ? JSON.parse(savedContacts) : contactsArray;
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <SearchBox value={search} onFilter={setSearch} />
        <ContactList contactList={filterContacts} onDelete={deleteContact} />
      </div>
    </>
  );
}

export default App;
