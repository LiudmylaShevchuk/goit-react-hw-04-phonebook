import { useState, useEffect } from 'react';
import { initialContacts } from 'data/initialContacts';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import {ContactList } from 'components/ContactList/ContactList';
import { Container, Title, Subtitle} from './App.styled';

const LS_KEY = 'contacts';

export const App = () => {

    const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
    const [filter, setFilter] = useState('');

    useEffect(() => { 
        localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }, [contacts]);

    const onSubmit = newContact => { 
        setContacts(prevContacts => {
            if (prevContacts.find(contact => contact.name === newContact.name)) {
                alert(`${newContact.name} is already in contacts`);
                return prevContacts;
            }
            return [newContact, ...prevContacts];
        });
    };

    const onFilter = e => { 
        setFilter(e.currentTarget.value);
    };

    const deleteContact = contactId => { 
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    };

    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
            <Container>
                <Title>Phonebook</Title>
                <ContactForm onSubmit={onSubmit} />
                <Subtitle>Contacts</Subtitle>
                <Filter value={filter} onFilter={onFilter} />
                <ContactList deleteContact={deleteContact} contacts={ filteredContacts} />
            </Container>
        );
    };





        
