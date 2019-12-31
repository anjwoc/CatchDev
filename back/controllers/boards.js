
const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Fn = Sequelize.fn;

exports.loadAllBoards = async (req, res, next) => {
  
  try{
    let where = {};
    if(parseInt(req.query.lastId, 10)){
      //lastId가 있을 경우
      console.log(parseInt(req.query.lastId, 10))
      where = {
        id: {
          //less than
          [Op.lt]: parseInt(req.query.lastId, 10), 
        }
      }
    }
    const posts = await db.Board.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'name', 'imgSrc']
      },{
        model: db.Image,
      },{
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      },{
        model: db.Hashtag,
        attributes: ['name']
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts);

  }catch(err){
    console.error(err);
    return next(err);
  }
};

exports.loadTrendingBoards = async (req, res, next) => {
  //구현 중 아직 좋아요는 구현했지만 좋아요 개수 구하는 부분을 안했다.
  try{
    let where = {};
    if(parseInt(req.query.lastId, 10)){
      //lastId가 있을 경우
      console.log(parseInt(req.query.lastId, 10))
      where = {
        id: {
          //less than
          [Op.lt]: parseInt(req.query.lastId, 10), 
        }
      }
    }
    const posts = await db.Board.findAll({
      where,
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'hit',
        'status',
        'createdAt',
        'userId',
        [Sequelize.literal('(SELECT COUNT(*) FROM `Like` WHERE Like.boardId = id)'), `LikeCount`],
      ],
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'name', 'imgSrc']
      },{
        model: db.Image,
      },{
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      },{
        model: db.Hashtag,
        attributes: ['name']
      }],
      order: [[Sequelize.literal('LikeCount'), 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts);

  }catch(err){
    console.error(err);
    return next(err);
  }
};

/*
router.get('/:id', board.loadAllBoardsList);
router.get('/:id', board.loadAllOngoingBords);
router.get('/:id', board.loadAllClosedBoards);
*/

exports.loadAllBoardsList = async (req, res, next) => {
  try{


  }catch(err) {
    console.error(err);
    next(err);
  }
};


exports.loadAllOngoingBoardsList = async (req, res, next) => {
  try{

    
  }catch(err) {
    console.error(err);
    next(err);
  }
};


exports.loadAllClosedBoardsList = async (req, res, next) => {
  try{

    
  }catch(err) {
    console.error(err);
    next(err);
  }
};