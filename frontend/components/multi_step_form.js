import React, { PureComponent } from 'react';

export default class MultiStepForm extends PureComponent {
  state = {
    pageNumber: 1,
  };

  nextPage = () => {
    const numOfPages = this.props.pages.length;
    let pageNumber = this.state.pageNumber + 1;
    if (pageNumber > numOfPages) pageNumber = numOfPages;
    this.setState({ pageNumber });
  }

  prevPage = () => {
    const numOfPages = this.props.pages.length;
    let pageNumber = this.state.pageNumber - 1;
    if (pageNumber < 1) pageNumber = 1;
    this.setState({ pageNumber });
  }

  render() {
    const { pageNumber } = this.state;
    const { pages } = this.props;
    const { markup, title } = pages[pageNumber - 1];
    const numOfSteps = pages.length;

    return (
      <div className='multi-step-form'>
        <header className='multi-step-form__header'>
          <div className='multi-step-form-header__title'>
            { title }
          </div>
          <div className='multi-step-form-header__step-number'>
            step { pageNumber } of { numOfSteps }
          </div>
        </header>
        <div className='page-content'>
          { markup }
        </div>
        <div className='multi-step-form__navigation'>
          <button className='button' type='button' onClick={this.prevPage}>
            PREV
          </button>
          <button className='button' type='button' onClick={this.nextPage}>
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

export class MultiStepFormPage extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    )
  }
}
