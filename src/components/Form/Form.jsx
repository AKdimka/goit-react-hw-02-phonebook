import { Component } from "react";
import { Label, Button, Input } from "./Form.styled";
import PropTypes from "prop-types";

export class Form extends Component {
	static propTypes = {
		onFormSubmit: PropTypes.func.isRequired,
	}

	state = {
		name: "",
		number: "",
	}

	formChange = e => {
		const { name, value } = e.currentTarget;

		this.setState({
			[name]: value.trim(),
		})
	}

	onSubmitClick = (e) => {
		e.preventDefault();

		this.props.onFormSubmit(this.state)

		this.setState({ name: "", number: "" })
	}

	render() {
		return (
			<form onSubmit={this.onSubmitClick} >
				<Label>
					Name
					<Input
						value={this.state.name}
						type="text"
						name="name"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
						onChange={this.formChange}
					/>
				</Label>
				<Label>
					Number
					<Input
						value={this.state.number}
						type="tel"
						name="number"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
						onChange={this.formChange}
					/>
				</Label>
				<Button type="submit">Add contact</Button>
			</form>)
	}
}