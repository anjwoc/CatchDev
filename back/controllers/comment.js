const db = require('../models');


exports.addComment = async (req, res, next) => {
  try{
    const post = await db.Board.findOne({ where: { id: req.params.id }});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      boardId: post.id,
      userId: req.user.id,
      content: req.body.content,
    });
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'imgSrc']
      }],
    });
    return res.json(comment);
  }catch(err){ 
    console.error(err);
    next(err);
  }
};

// exports.getComments = async (req, res, next) => {
//   try{
//     const post = await db.Comment.findOne({ where: { id: req.params.id } });
//     if(!post){
//       return res.status(404).send('포스트가 존재하지 않습니다.');
//     }
//     const comments = await db.Comment.findAll({
//       where: { 
//         boardId: req.params.id,
//       },
//       include: [{
//         model: db.User,
//         attributes: ['id', 'email', 'imgSrc']
//       }],
//       order: [['createdAt', 'DESC']]
//     });
//     res.json(comments);

//   }catch(err) {
//     console.error(err);
//     next(err);
//   }
// }

exports.getComments = async (req, res, next) => {
  try{
    const post = await db.Board.findOne({ where: { id: req.params.id } });
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: { 
        boardId: req.params.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'imgSrc']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);

  }catch(err) {
    console.error(err);
    next(err);
  }
}