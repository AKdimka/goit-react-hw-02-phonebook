import { Component } from "react";
import { Section } from "./Section/Section";
import { Form } from "./Form/Form"
import { Contacts } from "./Contacts/Contacts";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";
import { MainContainer } from "./App.styled";

import initialContacts from "./contacts.json";

export class App extends Component {
	state = {
		contacts: initialContacts,
		filter: "",
	}

	submitForm = (data) => {
		const contact = {
			id: nanoid(),
			...data,
		}
		if (this.chekExistContact(contact.name)) { return }

		this.setState(({ contacts }) => (
			{ contacts: [contact, ...contacts] }))
	}
	deleteContact = contactId => {
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(contact => contact.id !== contactId)
		}))
	}
	changeFilter = e => {
		const { name, value } = e.currentTarget;

		this.setState({
			[name]: value.trim(),
		})
	}
	chekExistContact(newContact) {
		if (this.state.contacts.find(({ name }) => name === newContact)) {
			alert(`Contact ${newContact} already exist`)
			return true
		}
	}

	render() {
		const { contacts, filter } = this.state;
		const normalizefFilter = filter.toLowerCase();
		const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizefFilter));

		return (
			<MainContainer>
				<Section title="Phonebook">
					<Form
						onFormSubmit={this.submitForm} />
				</Section>
				<Section title="Contacts">
					<Filter filterChange={this.changeFilter} value={filter} />
					<Contacts contacts={visibleContacts} onDeleteContact={this.deleteContact} />
				</Section>
			</MainContainer>
		);
	}
};
