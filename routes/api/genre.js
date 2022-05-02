const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const { Genre } = require("../../config/database");

router.get("/", async (req, res) => {
  const genreList = await Genre.findAll();
  res.json(genreList);
});

router.post("/",[
    check("name", "Name is Empty.").not().isEmpty(),
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const genre = await Genre.create(req.body);
    res.json(genre);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findOne({ where: { id: req.params.id } });

  if (genre) {
    await Genre.update(req.body, {where: { id: req.params.id },});
    res.json({ success: "Genre Updated" });
  } else {
    res.json({ error: "Genre not Found" });
  }  
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findOne({ where: { id: req.params.id } });

  if (genre) {
    await Genre.destroy({ where: { id: req.params.id },});
    res.json({ success: "Genre Deleted" });
  } else {
    res.json({ error: "Genre not Found" });
  }  
});

module.exports = router;
