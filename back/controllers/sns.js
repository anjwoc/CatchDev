const db = require('../models');


exports.addSns = async (req, res, next) => {
  try{
    const id = req.params.id;
    const { github, gmail, linkedIn } = req.body;

    const sns = await db.Sns.create({
      github: github,
      gmail: gmail,
      linkedIn: linkedIn,
      userId: id,
    });
    res.json(sns);
  }catch(err) {
    console.error(err);
    next(err);
  }
};