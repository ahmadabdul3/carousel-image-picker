import React, { Component, PureComponent, Fragment } from 'react';
import Carousel from 'src/frontend/components/carousel';
import ImagePreviews from 'src/frontend/components/image_previews';
import { alphabeticallyByCaption } from 'src/frontend/services/image_sorter';

const PREVIEWS_CATEGORY = 'previews';
const CAROUSEL_CATEGORY = 'carousel';

// - this is the global state for this application
// - redux wasn't used so as to keep development fast and easy
const allImages = getImages();

export default class HomePage extends Component {
  state = {
    previewImages: splitImagesIntoCategories().previewImages,
    carouselImages: [],
  };

  // - there are 2 functions here that both use the same 'addImagesToCategory'
  //   method for the sake of incapsulation. The outside (or child in this case)
  //   code doesn't need to know about the names of the categories defined above
  //   as constants - that's internal API for this file
  addImagesToCarousel = (images) => this.addImagesToCategory(images, CAROUSEL_CATEGORY);
  addImagesToPreviews = (images) => this.addImagesToCategory(images, PREVIEWS_CATEGORY);

  addImagesToCategory(images, category) {
    images.forEach(img => {
      allImages[img.imageName] = {
        ...img,
        belongsTo: category,
        selected: false,
      };
    });

    const { previewImages, carouselImages } = splitImagesIntoCategories();
    this.setState({ previewImages, carouselImages });
  }

  render() {
    const { previewImages, carouselImages } = this.state;
    return (
      <div className='home-page'>
        <ImagePreviews images={previewImages} addImagesToCarousel={this.addImagesToCarousel} />
        <Carousel images={carouselImages} addImagesToPreviews={this.addImagesToPreviews} />
      </div>
    );
  }
}


function splitImagesIntoCategories() {
  const previewImages = [];
  const carouselImages = [];

  Object.values(allImages).forEach(img => {
    if (img.belongsTo === PREVIEWS_CATEGORY) previewImages.push(img);
    else carouselImages.push(img);
  });

  return {
    previewImages: previewImages.sort(alphabeticallyByCaption),
    carouselImages: carouselImages.sort(alphabeticallyByCaption),
  };
}

function getImages() {
  return rawImages().reduce((acc, img) => {
    acc[img.imageName] = { ...img, belongsTo: PREVIEWS_CATEGORY };
    return acc;
  }, {});
}

function rawImages() {
  return [
    { "imageName": "letterBoardIc.jpg",   "imageCaption": "Letter Board" },
    { "imageName": "listen-hat.jpg",      "imageCaption": "Hat" },
    { "imageName": "listen-v02.jpg",      "imageCaption": "Girl" },
    { "imageName": "listeningBell.jpg",   "imageCaption": "Bell" },
    { "imageName": "listeningCap.jpg",    "imageCaption": "Cap" },
    { "imageName": "listeningCup.jpg",    "imageCaption": "Cup" },
    { "imageName": "listeningDoll.jpg",   "imageCaption": "Doll" },
    { "imageName": "matchingAbc.jpg",     "imageCaption": "ABCs" },
    { "imageName": "matchingBears.jpg",   "imageCaption": "Bears" },
    { "imageName": "matchingBirds.jpg",   "imageCaption": "Birds" },
    { "imageName": "matchingFriends.jpg", "imageCaption": "Friends" },
    { "imageName": "matchingZoo.jpg",     "imageCaption": "Zoo" },
    { "imageName": "orderItCake.jpg",     "imageCaption": "Cake" },
    { "imageName": "orderItToyN.jpg",     "imageCaption": "Toy" },
    { "imageName": "paintPotBlue.jpg",    "imageCaption": "Blue Paint" },
    { "imageName": "paintPotRed.jpg",     "imageCaption": "Red Paint" },
    { "imageName": "petIc.jpg",           "imageCaption": "Pet" },
    { "imageName": "princessIc.jpg",      "imageCaption": "Princess" },
    { "imageName": "robotIc.jpg",         "imageCaption": "Robot" },
    { "imageName": "spaceIc.jpg",         "imageCaption": "Space" }
  ];
}
