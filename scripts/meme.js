let cl = console.log;

// DOM ELements

const gallery = document.getElementById("gallery");

// Fetch meme images from google drive
const imageIds = [
  "1IlbyjwQF6qGwUGIzttzXP1BUQGNF_rgQ",
  "1MHlrz0A3pVyvOZAi89eMBdlRGrORVkk9",
  "1JfQe6BTleW1LG_ElTSmmPGwiF8V-wjHY",
  "1rmvzFsyA8MQi7rsvI96TL7ZfR_UDxMKK",
  "1b5L72XcD5QmvsDejO8BVfxC9PjSdL1Sr",
  "1sWLc-ClFSggSpp6ozesyIFPe0NNoW3Nc",
  "1TQwNY_e6lXQ1pi2GFP6fFLQop5trW9-A",
  "1Tb0ab_5KNLZD4KPVPK6eBPLaiZH_b14C",
  "1fBNiVoSIo15egCajYblRRxzDJ28S8Z8D",
];

imageIds.forEach((id) => {
  gallery.innerHTML += `
  <img src="https://drive.google.com/thumbnail?id=${id}&sz=s1000" alt="Homeschool Meme" class="meme-img">`;
});
