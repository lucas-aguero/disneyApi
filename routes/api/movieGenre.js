const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const { MovieGenre } = require("../../config/database");

router.post("/:idMovie&:idGenre", async (req, res) => {
    const movieGenreExist = await MovieGenre.findOne({ where: {idMovie: req.params.idMovie, idGenre: req.params.idGenre }});
    if (!movieGenreExist) {
        const movieGenre = await MovieGenre.create({idMovie:req.params.idMovie,idGenre:req.params.idGenre});
        res.json(movieGenre);
    } else {
        res.json({ error: "Already Exists" });
    }  
});

router.delete("/:id", async (req, res) => {
  const genre = await MovieGenre.findOne({ where: { id: req.params.id } });

  if (genre) {
    await MovieGenre.destroy({ where: { id: req.params.id },});
    res.json({ success: "Record Deleted" });
  } else {
    res.json({ error: "Record not Found" });
  }  
});

module.exports = router;
