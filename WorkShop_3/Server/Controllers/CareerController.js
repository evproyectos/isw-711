const Career = require("../Models/CareerModel");


/**
 * Creates a career
 *
 * @param {*} req
 * @param {*} res
 */
const CareerPost = async (req, res) => {
  let career = new Career();

  career.name = req.body.name;
  career.code = req.body.code;
  career.description = req.body.description;

  if (career.name && career.code) {
    try {
      const data = await career.save();
      res.status(201).header({
        'location': `/api/careers/?id=${data.id}`
      }).json(data); // Sending the response with status, headers, and data
    } catch (err) {
      res.status(422).json({
        error: 'There was an error saving the career'
      });
      console.error('error while saving the career', err);
    }
  } else {
    res.status(422).json({
      error: 'No valid data provided for career'
    });
    console.error('error while saving the career');
  }
};


/**
 * Gets all Careers
 *
 * @param {*} req
 * @param {*} res
 */


const CareerGet = async (req, res) => {
    // if an specific career is required
    if (req.query && req.query.id) {
      Career.findById(req.query.id)
        .then( (career) => {
          res.json(career);
        })
        .catch(err => {
          res.status(404);
          console.log('error while queryting the career', err)
          res.json({ error: "Career doesnt exist" })
        });
    } else {
      // get all careers
      Career.find()
        .then( careers => {
          res.json(careers);
        })
        .catch(err => {
          res.status(422);
          res.json({ "error": err });
        });
    }
  };

/**
 * Deletes a Career
 *
 * @param {*} req
 * @param {*} res
 */

const CareerDelete = async (req, res) => {
    if (req.query && req.query.id) {
        try {
            const career = await Career.findById(req.query.id);
            if (!career) {
                res.status(404).json({ error: "Career doesn't exist" });
                return;
            }
            
            await career.deleteOne();
            res.status(209).json({"message":"Deleted Successfuly"}); // No content
        } catch (err) {
            res.status(404).json({ error: 'Career doesnt exist' });
        }
    } else {
        res.status(404).json({ error: "Career doesn't exist" });
    }
};

/**
 * updates a Career
 *
 * @param {*} req
 * @param {*} res
 */

const CareerPut = async (req, res) => {
    if (req.query && req.query.id) {
        try {
            const career = await Career.findById(req.query.id);
            if (!career) {
                res.status(404).json({ error: "Career doesn't exist" });
                return;
            }

            // Update the career object based on the request body
            const updatedFields = { ...req.body }; 
            Object.assign(career, updatedFields);
            
            await career.save();
            res.status(200).json({ message: "Career updated successfully", data: career });
        } catch (err) {
            console.error('Error occurred:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(404).json({ error: "Career ID is missing" });
    }
};






module.exports = {
    CareerGet,
    CareerPost,
    CareerDelete,
    CareerPut,
}