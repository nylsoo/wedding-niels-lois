import React from 'react';
import styles from './styles.scss';

class RSVP extends React.Component {
  constructor(props) {
    super(props);

    this.handleGuestChange = this.handleGuestChange.bind(this);

    this.state = {
      open: false,
      guests: [],
      total: 1,
      inputs: [
        <input key={0} type="text" id="guests" name="guests" onChange={this.handleGuestChange} data-nth={0}/>,
        <input key={1} type="text" id="guests" name="guests" onChange={this.handleGuestChange} data-nth={1}/>
      ],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addGuestInput = this.addGuestInput.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleGuestChange(e) {
    const target = e.target;
    const value = target.value;
    const nth = target.dataset.nth;

    const guests = this.state.guests;
    guests[nth] = value;

    let total = this.state.total;

    if (nth >= total) {
      this.addGuestInput(nth);
      total++;
    }

    this.setState({
      guests,
      total
    });
  }

  addGuestInput(nth) {
    const inputs = this.state.inputs;
    nth++;
    inputs.push(<input key={nth} type="text" id="guests" name="guests" onChange={this.handleGuestChange} data-nth={nth}/>);
    this.setState({
      inputs
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let stateWithoutInputs = Object.assign({}, this.state);
    stateWithoutInputs.inputs = undefined;

    const conf = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(stateWithoutInputs)
    };

    fetch('/addRSVP', conf)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        if (json.success === false) {
          let i = 12312;

          this.setState({
            errors: Object.keys(json.err.errors).map(error => {
              i++;
              return <li key={i} className={styles['error']}>{json.err.errors[error].message}</li>
            })
          });
        } else {
          this.setState({
            errors: []
          })
        }
      });
  }

  render() {
    return(
      <section className={styles['rsvp']}>
        <div className={styles['container']}>
          <h2>Meld je aan</h2>
          <ul className={styles['errors']}>
            {this.state.errors.map(error => (error))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={this.handleChange}/>
            <label htmlFor="guests">Namen:</label>
            <div className={styles['guests']}>
              {this.state.inputs.map(input => (input))}
            </div>
            <input className={styles['submit']} type="submit" value="Voeg toe"/>
          </form>
        </div>
      </section>
    );
  }
}

export default RSVP;