import topMusicData from '../data/top-music.json'

exports.getSongsList = (req, res) => {
  res.json(topMusicData)
}

exports.getSongDetails = (req, res) => {
  res.json(topMusicData.filter((e) => e.id === +req.params.songId)[0])
}