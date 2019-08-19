import React, { PureComponent } from 'react';

export class PageSection extends PureComponent {
  static defaultProps = {
    customClasses: [],
  };

  render() {
    const { children, customClasses } = this.props;
    const extraClasses = customClasses.join(' ');

    return (
      <section className={`page-section ${extraClasses}`}>
        { children }
      </section>
    );
  }
}
