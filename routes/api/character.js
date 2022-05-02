const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { sequelize} = require("../../config/database");

const { Character } = require("../../config/database");

router.post("/",[
    check("name", "Name is Empty.").not().isEmpty(),
    check("age", "Age Name is Empty.").not().isEmpty(),
    check("history", "History is Empty.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const character = await Character.create(req.body);
    res.json(character);
});

router.put("/:id", async (req, res) => {
  const character = await Character.findOne({ where: { id: req.params.id } });

  if (character) {
    await Character.update(req.body, {where: { id: req.params.id },});
    res.json({ success: "Character Updated" });
  } else {
    res.json({ error: "Character not Found" });
  }  
});

router.delete("/:id", async (req, res) => {
  const character = await Character.findOne({ where: { id: req.params.id } });

  if (character) {
    await Character.destroy({ where: { id: req.params.id },});
    res.json({ success: "Character Deleted" });
  } else {
    res.json({ error: "Character not Found" });
  }  
});

router.get("/:id", async (req, res) => {
  const character = await Character.findOne({ where: { id: req.params.id } });

  if (character) {
    const [characterData, metadataCharacter] = await sequelize.query(
        "SELECT characters.id,characters.name,characters.age,characters.weight,characters.picture,characters.history FROM characters WHERE characters.id = :idCharacter"
        , {replacements: {idCharacter: req.params.id}} );
      const [movieData, metadataMovie] = await sequelize.query(
          "SELECT movies.id, movies.title, movies.date,movies.score,movies.isSeries,movies.picture FROM movies INNER JOIN characterMovies ON movies.id = characterMovies.idMovie WHERE characterMovies.idCharacter = :idCharacter"
          , {replacements: {idCharacter: req.params.id}} );

       res.json({ characterData , movieData });
  } else {
      res.json({ error: "Movie not Found" });
  }      
});

router.get("/", async (req, res) => {

  if ((typeof(req.query.name) == "undefined") && (typeof(req.query.age) == "undefined") && (typeof(req.query.weight) == "undefined") && (typeof(req.query.movies) == "undefined") && (typeof(req.query.order) == "undefined")){
    const characterList = await Character.findAll({attributes: ['id', 'name','picture']});
    res.json(characterList);
  } else {
    let isWhere;
    let queryString = `SELECT characters.id, characters.name, characters.age, characters.weight, characters.history, characters.picture, characterMovies.idMovie, movies.title FROM characters INNER JOIN characterMovies ON characters.id = characterMovies.idCharacter INNER JOIN movies ON movies.id = characterMovies.idMovie`;

    if ((typeof(req.query.name) != "undefined") || (typeof(req.query.age) != "undefined") || (typeof(req.query.weight) != "undefined") || (typeof(req.query.movies) != "undefined")) {
      queryString += ` WHERE`;
      
      if (typeof(req.query.name) != "undefined") {
        queryString += ` characters.name LIKE "%${req.query.name}%"`;
      }
      
      isWhere = queryString.slice(queryString.lastIndexOf(' ') + 1);
      if (typeof(req.query.age) != "undefined") {
        if (isWhere != "WHERE"){
          queryString += ` AND`  ;
        }
        queryString += ` characters.age = ${req.query.age}`;
      }        
      
      isWhere = queryString.slice(queryString.lastIndexOf(' ') + 1);
      if (typeof(req.query.weight) != "undefined") {
        if (isWhere != "WHERE"){
          queryString += ` AND`  ;
        }
        queryString += ` characters.weight = ${req.query.weight}`;
      }        

      isWhere = queryString.slice(queryString.lastIndexOf(' ') + 1);
      if (typeof(req.query.movies) != "undefined") {
        if (isWhere != "WHERE"){
          queryString += ` AND`  ;
        }
        queryString += ` characterMovies.idMovie = ${req.query.movies}`;
      }        
    }

    if ((typeof(req.query.order) != "undefined") && ((req.query.order.toUpperCase() == "ASC") || (req.query.order.toUpperCase() == "DESC" ))) {
        queryString += ` ORDER BY characters.name ${req.query.order.toUpperCase()}`;
      } else if (typeof(req.query.order) != "undefined"){
        queryString = "";
        res.json ({ error: "Invalid ORDER option. Please use ASC or DESC" });
    }

    if (queryString != "") {
        const [characterData, metadatacharacter] = await sequelize.query(queryString);
        res.json({ characterData });
    }
  }
});

module.exports = router;
