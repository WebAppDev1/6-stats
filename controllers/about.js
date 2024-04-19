"use strict";

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
    let average = 0;
    if (numPlaylists > 0) {
      average = (numSongs / numPlaylists).toFixed(2);
    }
    
        // largest
    let currentLargest = 0;
    let largestPlaylistTitle = "";
    for (let playlist of playlists) {
      if (playlist.songs.length > currentLargest) {
        currentLargest = playlist.songs.length;
      }
    }

    for (let playlist of playlists) {
      if (playlist.songs.length === currentLargest) {
        largestPlaylistTitle = largestPlaylistTitle ? largestPlaylistTitle + ", " + playlist.title : playlist.title;
      }
    }

    // smallest
    let currentSmallest = playlists[0].songs.length;
    let smallestPlaylistTitle = "";
    for (let playlist of playlists) {
      if (playlist.songs.length < currentSmallest) {
        currentSmallest = playlist.songs.length;
      }
    }

    for (let playlist of playlists) {
      if (playlist.songs.length === currentSmallest) {
        smallestPlaylistTitle = smallestPlaylistTitle ? smallestPlaylistTitle + ", " + playlist.title : playlist.title;
      }
    }

    logger.info("About page loading!");

    const viewData = {
      title: "Playlist App About",
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      average: average,
      largest: largestPlaylistTitle,
      smallest: smallestPlaylistTitle
    };

    response.render("about", viewData);
  },
};

export default about;
