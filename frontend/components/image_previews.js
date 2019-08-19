import React, { PureComponent } from 'react';
import { PageSection } from 'src/frontend/components/page_sectioning';
import Button from 'src/frontend/components/buttons';

export default class ImagePreviews extends PureComponent {
  state = {
    selectedImages: {},
  };

  updateImageSelection = (image, selected) => {
    this.setState(prevState => {
      const newState = { ...prevState.selectedImages };

      if (selected) newState[image.imageName] = image;
      else delete newState[image.imageName];

      return { selectedImages: newState };
    });
  };

  addImages = () => {
    const { selectedImages } = this.state;
    const { addImagesToCarousel } = this.props;
    addImagesToCarousel(Object.values(selectedImages));
    this.setState({ selectedImages: {} });
  };

  get images() {
    const { images } = this.props;
    return images.map((img, i) =>
      <ImagePreview
        key={img.imageName}
        image={img}
        updateImageSelection={this.updateImageSelection}
      />
    );
  }

  render() {
    const { selectedImages } = this.state;

    return (
      <PageSection customClasses={['image-previews']}>
        <section className='image-previews__images'>
          { this.images }
        </section>
        <SelectedImageManager
          selectedImages={selectedImages}
          addImages={this.addImages}
          disabled={!!selectedImages.length}
        />
      </PageSection>
    );
  }
}

export class ImagePreview extends PureComponent {
  state = { selected: false };

  toggleSelection = () => {
    this.setState(prevState => {
      const { selected } = prevState;
      return { selected: !selected };
    }, () => {
      const { selected } = this.state;
      const { updateImageSelection, image } = this.props;
      updateImageSelection(image, selected);
    });
  };

  get className() {
    const { selected } = this.state;
    const baseClass = 'image-preview';

    if (!selected) return baseClass;
    else return `${baseClass} selected`;
  }

  render() {
    const { imageName, imageCaption } = this.props.image;

    return (
      <div className={this.className} onClick={this.toggleSelection}>
        <img
          src={`/images/${imageName}`}
          alt={imageCaption}
          className='image-preview__image'
        />
        <span className='image-preview__label'>
          { imageCaption }
        </span>
      </div>
    );
  }
}

export class SelectedImageManager extends PureComponent {
  get addButtonDisabled() {
    const { selectedImages } = this.props;
    return !Object.keys(selectedImages).length > 0;
  }

  render() {
    const { addImages } = this.props;

    return (
      <section className='selected-image-manager'>
        <div className='selected-image-manager__content'>
          <h3 className='selected-image-manager__title'>
            Click the "Add" button to move the pictures you picked to the carousel.
          </h3>
          <Button
            text='Add'
            tooltipText='First click on pictures on the left to select them'
            disabled={this.addButtonDisabled}
            fullWidth
            handleClick={addImages}
            customClass='add-images-to-carousel-button'
          />
        </div>
      </section>
    )
  }
}
