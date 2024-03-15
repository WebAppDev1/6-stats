'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const about = {
  createView(request, response) {
    
    // app statistics calculations
    const playlists = playlistStore.getAllPlaylists();

    // song and playlist totals
    let numPlaylists = playlists.length;
    let numSongs = 0;
    for (let item of playlists) {
        numSongs += item.songs.length;
    }
    
    // average
    let average = (numSongs/numPlaylists).toFixed(2);

    // largest
    let currentLargest = 0;
    let largestPlaylistTitle = "";
    for (let playlist of playlists) {
      if(playlist.songs.length > currentLargest){
        currentLargest = playlist.songs.length;
        largestPlaylistTitle = playlist.title;
      }
    }

    // smallest
    let currentSmallest = playlists[0].songs.length;
    let smallestPlaylistTitle = playlists[0].title;
    for (let playlist of playlists) {
        if(playlist.songs.length < currentSmallest){
            currentSmallest = playlist.songs.length;
            smallestPlaylistTitle = playlist.title;
        }
    }
    
    logger.info("About page loading!");
    
    const viewData = {
      title: "Playlist App About",      
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs, 
      average: average,
      smallest: smallestPlaylistTitle,
      largest: largestPlaylistTitle
    };
    
    response.render('about', viewData);
  },
};

export default about;