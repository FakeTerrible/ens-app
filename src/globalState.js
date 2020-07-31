import React, { createContext, Component } from 'react'

const filters = {
  searchDomains: ['top', 'sub'],
  unavailableNames: true,
  price: 'all'
}

const GlobalState = createContext({
  filters
})

export default GlobalState

export class GlobalStateProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filters,
      currentModal: null,
      account: null,
      toggleModal: this.toggleModal,
      actions: {
        toggleUnavailableNames: this.toggleUnavailableNames,
        togglePriceFilter: this.togglePriceFilter,
        updateSearchDomains: this.updateSearchDomains,
        connect: this.connect,
        disconnect: this.disconnect
      }
    }
  }

  showModal = modal => {
    this.setState({
      currentModal: modal
    })
  }

  disconnect = () => {
    this.setState({
      account: null
    })
  }

  connect = account => {
    this.setState({
      account
    })
  }

  toggleModal = modal => {
    this.setState(state =>
      state.currentModal && state.currentModal.name === modal.name
        ? { currentModal: null }
        : { currentModal: modal }
    )
  }

  toggleUnavailableNames() {
    this.setState(state => ({
      unavailableNames: !state.unavailableNames
    }))
  }

  updateSearchDomains(list = filters.searchDomains) {
    this.setState(() => ({
      unavailableNames: list
    }))
  }

  togglePriceFilter() {
    this.setState(state => ({
      unavailableNames: state.price === 'all' ? 'free' : 'all'
    }))
  }

  render() {
    return (
      <GlobalState.Provider value={this.state}>
        {this.props.children}
      </GlobalState.Provider>
    )
  }
}
