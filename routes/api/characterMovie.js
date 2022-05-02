const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const { CharacterMovie } = require("../../config/database");

router.post("/:idCharacter&:idMovie", async (req, res) => {
    const characterMovieExist = await CharacterMovie.findOne({ where: {idCharacter:req.params.idCharacter,idMovie:req.params.idMovie}});
    if (!characterMovieExist) {
        const characterMovie = await CharacterMovie.create({idCharacter:req.params.idCharacter,idMovie:req.params.idMovie});
        res.json(characterMovie);
    } else {
        res.json({ error: "Already Exists" });
    }  
});

router.delete("/:id", async (req, res) => {
  const genre = await CharacterMovie.findOne({ where: { id: req.params.id } });

  if (genre) {
    await CharacterMovie.destroy({ where: { id: req.params.id },});
    res.json({ success: "Record Deleted" });
  } else {
    res.json({ error: "Record not Found" });
  }  
});

module.exports = router;
