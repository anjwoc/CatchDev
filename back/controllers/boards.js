
const db = require('../models');
const Sequelize = require('sequelize');
exports.allPosts = async (req, res, next) => {
  // res.json({'test': '1234'});
  try{
    console.log(`loadBoards진입 req.query값: ${req.query.lastId}`)
    let where = {};
    if(parseInt(req.query.lastId, 10)){
      //lastId가 있을 경우
      console.log(parseInt(req.query.lastId, 10))
      where = {
        id: {
          //less than
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), 
        }
      }
    }
    const posts = await db.Board.findAll({
      where,
      attributes: [
        'id', 'title', 'category', 'content', 'hit', 'status', 'createdAt', 'userId',
        [Sequelize.literal('(SELECT COUNT(*) FROM `Like` WHERE Like.boardId = board.id)'), `LikeCount`],
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
  
  try{
    let where = {};
    if(parseInt(req.query.lastId, 10)){
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

exports.loadAllBoardsList = async (req, res, next) => {
  try{
    console.log(req.query);
    let where = { userId: req.params.id };
    if(parseInt(req.query.lastId, 10)){
      where = {
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      }
    };
    const posts = await db.Board.findAll({
      where,
    })
    res.json(posts);
  }catch(err) {
    console.error(err);
    next(err);
  }
};


exports.loadAllRecruitingBoardsList = async (req, res, next) => {
  try{
    let where = { 
      userId: req.params.id,
      status: "open"
    };
    if(parseInt(req.query.lastId, 10)){
      where.push({
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      }) 
    };
    
    const posts = await db.Board.findAll({
      where,
    });
    res.json(posts);
  }catch(err) {
    console.error(err);
    next(err);
  }
};


exports.loadAllClosedBoardsList = async (req, res, next) => {
  try{
    let where = { 
      userId: req.params.id,
      status: "closed"
    };
    if(parseInt(req.query.lastId, 10)){
      where.push({
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      }) 
    };
    
    const posts = await db.Board.findAll({
      where,
    });
    res.json(posts);
    
  }catch(err) {
    console.error(err);
    next(err);
  }
};