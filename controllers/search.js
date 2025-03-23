'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const getCategories = () => {
  const categories = [];
  const playlists = playlistStore.getAllPlaylists();
  
  playlists.forEach(element => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  
  return categories;
}

const search = {
  createView(request, response) {
    logger.info("Search page loading!");
	
    const viewData = {
      title: "Playlist App Search",
      categories: getCategories()
    };
    
    logger.debug(viewData.categories);
    
    response.render('search', viewData);
  },
  
  findResult(request, response) {
    const category = request.body.category;
    logger.debug('Playlist category = ' + category);

    const viewData = {
      title: 'Playlist',
      foundPlaylists: playlistStore.getPlaylistCategory(category),
      categories: getCategories(),
      categoryTitle: category
    };
    
    logger.debug(viewData.foundPlaylists);
    
    response.render('search', viewData);
  },

  
};

export default search;
