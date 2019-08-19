import React, { PureComponent, Fragment } from 'react';
import { PageSection } from 'src/frontend/components/page_sectioning';
import FormSelect from 'src/frontend/components/form_select';
import Button from 'src/frontend/components/buttons';

const CAROUSEL_MODE__VIEW = 'View';
const CAROUSEL_MODE__EDIT = 'Edit';

export default class Carousel extends PureComponent {
  static defaultProps = {
    images: [],
  };

  state = {
    numberOfImagesToRender: 5,
    offsetPoint: 0,
    animatorClass: '',
    leftPosition: 0,
    selectedImages: {},
    mode: CAROUSEL_MODE__VIEW,
    totalOverRender: '',
    numberOfImageSets: '',
  };

  componentDidMount() {
    this.updateNumberOfImageSets();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateNumberOfImageSets();

    const oldNumImgsRender = prevState.numberOfImagesToRender;
    const newNumImgsRender = this.state.numberOfImagesToRender;
    const oldImgsNum = prevProps.images.length;
    const newImgsNum = this.props.images.length;

    if (oldImgsNum !== newImgsNum || oldNumImgsRender !== newNumImgsRender) {
      this.resetCarousel(prevState);
    }
  }

  resetCarousel(prevState) {
    const { animatorClass } = prevState;
    this.setState({
      offsetPoint: 0,
      animatorClass: animatorClass ? '' : 'animator',
      leftPosition: 0,
    });
  }

  updateNumberOfImageSets() {
    this.setState(prevState => {
      const { images } = this.props;
      const { numberOfImagesToRender } = prevState;
      const totalNumberOfImages = images.length;

      const totalOverRender = totalNumberOfImages / numberOfImagesToRender;
      const numberOfImageSets = Math.ceil(totalOverRender);

      return { totalOverRender, numberOfImageSets };
    });
  }

  // - selected is the current selection state,
  // - so the logic should be:
  //   if im currently selected, unselect me
  //   else select me
  updateImageSelection = (image, selected) => {
    this.setState(prevState => {
      const newState = { ...prevState.selectedImages };

      if (!selected) newState[image.imageName] = image;
      else delete newState[image.imageName];

      return { selectedImages: newState };
    });
  };

  selectImage = (image) => {
    this.setState({ selectedImages: { [image.imageName]: image } });
  };

  deleteImages = () => {
    if (this.state.mode === CAROUSEL_MODE__VIEW) return;
    const { selectedImages } = this.state;
    const { addImagesToPreviews } = this.props;
    addImagesToPreviews(Object.values(selectedImages));
    this.setState({ selectedImages: {} });
  };

  get imageWidth() {
    const { numberOfImagesToRender } = this.state;
    const percent = 100 / numberOfImagesToRender;
    return `${percent}%`;
  }

  get images() {
    const { images } = this.props;
    const { selectedImages, mode } = this.state;
    const handleClick = mode === CAROUSEL_MODE__VIEW ?
      this.selectImage : this.updateImageSelection;

    return images.map((image, i) => {
      return (<CarouselImage
        key={image.imageName}
        index={i}
        width={this.imageWidth}
        image={image}
        selected={!!selectedImages[image.imageName]}
        handleClick={handleClick}
      />);
    });
  }

  handleLeftNavClick = () => {
    this.setState((prevState) => {
      const { offsetPoint, leftPosition, animatorClass } = prevState;
      if (offsetPoint === 0) return;
      return {
        offsetPoint: offsetPoint - 1,
        animatorClass: animatorClass ? '' : 'animator',
        leftPosition: this.calculateLeftPositionLeftClick(leftPosition),
      };
    });
  }

  handleRightNavClick = () => {
    this.setState((prevState) => {
      const { offsetPoint, leftPosition, animatorClass, numberOfImageSets } = this.state;
      if (offsetPoint === numberOfImageSets - 1) return;
      return {
        offsetPoint: offsetPoint + 1,
        animatorClass: animatorClass ? '' : 'animator',
        leftPosition: this.calculateLeftPositionRightClick(leftPosition, offsetPoint),
      };
    });
  }

  // - this is based off the previous left position
  calculateLeftPositionLeftClick(leftPosition) {
    let left = leftPosition + 100;
    if (left > 0) return 0;
    return left;
  }

  // - this is based off the previous left position and previous offsetPoint
  calculateLeftPositionRightClick(leftPosition, offsetPoint) {
    const { images } = this.props;
    const { numberOfImagesToRender, totalOverRender, numberOfImageSets } = this.state;
    const totalNumberOfImages = images.length;

    const remainder = totalNumberOfImages % numberOfImagesToRender;
    if (offsetPoint === numberOfImageSets - 2 && remainder !== 0) {
      const fractionOfPercentage = totalOverRender - Math.floor(totalOverRender);
      return leftPosition - (fractionOfPercentage * 100);
    }

    return leftPosition - 100;
  }

  updateNumberOfImagesToRender = ({ value }) => {
    this.setState({ numberOfImagesToRender: value });
  }

  toggleMode = () => {
    this.setState(prevState => {
      const { mode } = prevState;
      const newState = { selectedImages: {} };

      if (mode === CAROUSEL_MODE__VIEW) newState.mode = CAROUSEL_MODE__EDIT;
      else newState.mode = CAROUSEL_MODE__VIEW;

      return newState;
    });
  }

  render() {
    const {
      leftPosition,
      numberOfImagesToRender,
      imageForViewer,
      mode,
      selectedImages,
      offsetPoint,
      numberOfImageSets,
    } = this.state;
    const images = this.images;

    return (
      <PageSection>
        <CarouselOptions
          numberOfImagesToRender={numberOfImagesToRender}
          updateNumberOfImagesToRender={this.updateNumberOfImagesToRender}
          deleteImages={this.deleteImages}
          toggleMode={this.toggleMode}
          mode={mode}
          selectedImages={selectedImages}
        />
        <div className='carousel-container'>
          <CarouselNavButton
            handleClick={this.handleLeftNavClick}
            offsetPoint={offsetPoint}
            numberOfImageSets={numberOfImageSets}
          />
          <CarouselNavButton
            direction='right'
            handleClick={this.handleRightNavClick}
            offsetPoint={offsetPoint}
            numberOfImageSets={numberOfImageSets}
          />
          {
            images.length > 0 ? (
              <Fragment>
                <section className='carousel'>
                  <div
                    className={`images-container ${this.animatorClass}`}
                    style={{ left: `${leftPosition}%` }}
                  >
                    { this.images }
                  </div>
                </section>
                <CarouselImageSetDots
                  numberOfImageSets={numberOfImageSets}
                  offsetPoint={offsetPoint}
                />
              </Fragment>
            ) : (<EmptyCarouselMessage />)
          }
        </div>
        {
          mode === CAROUSEL_MODE__VIEW && (
            <ImageViewer image={Object.values(selectedImages)[0]} />
          )
        }
      </PageSection>
    );
  }
}

class CarouselImageSetDots extends PureComponent {
  get dots() {
    const { offsetPoint, numberOfImageSets } = this.props;
    const dots = [];
    for (let i = 0; i < numberOfImageSets; i++) {
      let klass = 'dot';
      if (offsetPoint === i) klass += ' selected';
      dots.push(<div key={i} className={klass} />);
    }
    return dots;
  }

  render() {
    const { offsetPoint, numberOfImageSets } = this.props;
    return (
      <section className='carousel-image-set-dots'>
        { this.dots }
      </section>
    );
  }
}

class CarouselNavButton extends PureComponent {
  static defaultProps = {
    direction: 'left',
  };

  get buttonCaret() {
    const { direction } = this.props;
    return (<i className={`fas fa-angle-${direction}`} />);
  }

  get disabled() {
    const { direction, offsetPoint, numberOfImageSets } = this.props;
    if (!numberOfImageSets) return 'disabled';
    else if (direction === 'left' && offsetPoint === 0) return 'disabled';
    else if (direction === 'right' && offsetPoint === numberOfImageSets - 1) return 'disabled';
    return '';
  }

  render() {
    const { handleClick, direction } = this.props;
    return (
      <div
        className={`carousel-nav-button ${direction} ${this.disabled}`}
        onClick={handleClick}
      >
        { this.buttonCaret }
      </div>
    );
  }
}

class CarouselOptions extends PureComponent {
  static defaultProps = {
    mode: CAROUSEL_MODE__VIEW,
  };

  get editViewButtonText() {
    const { mode } = this.props;
    if (mode === CAROUSEL_MODE__VIEW) return CAROUSEL_MODE__EDIT;
    else return CAROUSEL_MODE__VIEW;
  }

  get deleteButtonDisabled() {
    const { mode, selectedImages } = this.props;
    if (mode === CAROUSEL_MODE__VIEW) return true;
    return !Object.keys(selectedImages).length > 0;
  }

  render() {
    const {
      numberOfImagesToRender,
      updateNumberOfImagesToRender,
      deleteImages,
      toggleMode,
    } = this.props;

    return (
      <section className='carousel-options'>
        <Button
          text={this.editViewButtonText}
          handleClick={toggleMode}
        />
        <FormSelect
          isClearable={false}
          value={numberOfImagesToRender}
          labelText='How Many Pictures to Show'
          options={[
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
          ]}
          onChange={updateNumberOfImagesToRender}
        />
        <Button
          text='Delete'
          tooltipText='First click on pictures in the carousel to select them (Edit Mode)'
          disabled={this.deleteButtonDisabled}
          handleClick={deleteImages}
        />
      </section>
    );
  }
}

// - this can re-use or be composed of the same comopnent to handle
//   selectibility on images, but keeping them separate for ease at this point
export class CarouselImage extends PureComponent {
  toggleSelection = () => {
    const { handleClick, image, selected } = this.props;
    handleClick(image, selected);
  };

  get className() {
    const { selected } = this.props;
    const baseClass = 'carousel-image';

    if (!selected) return baseClass;
    else return `${baseClass} selected`;
  }

  render() {
    const { width, image, index } = this.props;
    return (
      <div className={this.className} style={{ width }} onClick={this.toggleSelection}>
        <div className='carousel-image__image-container'>
          <img
            src={`/images/${image.imageName}`}
            className='carousel-image__image'
          />
          <section className='carousel-image__caption'>
            { image.imageCaption }
          </section>
        </div>
      </div>
    );
  }
}

export class ImageViewer extends PureComponent {
  render() {
    const { image } = this.props;
    if (!image) {
      return (
        <EmptyCarouselMessage
          message='Click on a picture in the carousel to see it here.'
          customClass='empty-image-viewer-message'
        />
      );
    }

    return (
      <section className='image-viewer'>
        <img
          src={`/images/${image.imageName}`}
          className='image-viewer__image'
        />
        <section className='image-viewer__caption'>
          { image.imageCaption }
        </section>
      </section>
    );
  }
}

export class EmptyCarouselMessage extends PureComponent {
  static defaultProps = {
    customClass: '',
    message: 'Select pictures from the top to add them to the carousel.',
  };

  render() {
    const { message, customClass } = this.props;
    return (
      <div className={`empty-carousel-message ${customClass}`}>
        <p>
          { message }
        </p>
      </div>
    )
  }
}
