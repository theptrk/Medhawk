var mongoose = require('mongoose');

var emojiSchema = new mongoose.Schema({
  symptom: {type: String},
  link:    {type: String},
});

var EmojiModel = mongoose.model('Emoji', emojiSchema);

module.exports.Emoji = EmojiModel;