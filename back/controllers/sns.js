const db = require('../models');


exports.addSns = async (req, res, next) => {
  try{
    const id = req.params.id;
    const { github, gmail, linkedIn } = req.body;

    await db.Sns.findOrCreate({
      where: { userId: id },
      defaults: {
        github: github,
        gmail: gmail,
        linkedIn: linkedIn || 'https://www.linkedin.com/in'
      },
    })
      .spread((result, created) => {
        //created는 만들어진 경우의 객체다.
        if(created){
          return res.json(created)
        }
      });

    await db.Sns.update({
      github: github,
      gmail: gmail,
      linkedIn: linkedIn,
    },{
      where: { userId: id }
    });
    
    const sns = await db.Sns.findOne({ where: { userId: id }});

    return res.json(sns);
    
  }catch(err) {
    console.error(err);
    next(err);
  }
};