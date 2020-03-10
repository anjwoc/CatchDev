
const db = require('../models');
const Sequelize = require('sequelize');
const queryString = require('querystring');
const Op = Sequelize.Op;

exports.allPosts = async (req, res, next) => {
  try{
    let where = {};
    if(parseInt(req.query.lastId, 10)){
      //lastId가 있을 경우
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
        'id', 'title', 'category', 'content', 'hit', 'status', 'createdAt', 'userId', 'like', 'numComments'
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
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), 
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
        'like',
        'numComments'
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
    let where = { userId: req.params.id };
    if(parseInt(req.query.lastId, 10)){
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
        userId: req.params.id
      }
    };
    const posts = await db.Board.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
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
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
        userId: req.params.id,
        status: "open"
      } 
    };
    
    const posts = await db.Board.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
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
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
        userId: req.params.id,
        status: "closed"
      } 
    };
    
    const posts = await db.Board.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    res.json(posts);
    
  }catch(err) {
    console.error(err);
    next(err);
  }
};

exports.loadCategoryPosts = async (req, res, next) => {
  try{
    const item = req.query.item;
    const lastId = req.query.lastId;
    
    if(!item){
      res.status(403).send('카테고리 분류가 없습니다.');
    }

    let where = { category: item };
    if(parseInt(lastId, 10)){
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(lastId, 10),
        },
        category: item
      }
    }

    const categoryPosts = await db.Board.findAll({
      where,
      attributes: [
        'id',
        'title',
        'category',
        'hit',
        'status',
        'createdAt',
        'userId',
        'like',
        'numComments'
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
    })
    res.json(categoryPosts);
  }catch(err){
    console.error(err);
    next(err);
  }
};

exports.searchBoards = async (req, res, next) => {
  try{
    const word = req.params.word;
    const lastId = req.query.lastId;
    let where = { 
      title: {
        [Op.like]: `%${word}%`
      }
    };
    if (parseInt(lastId, 10)){
      where.push({
        id: {
          [Op.lt]: parseInt(lastId, 10)
        },
      })
    }
    const searchBoards = await db.Board.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'name', 'imgSrc', 'like', 'numComments']
      },{
        model: db.Image
      },{
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      },{
        model: db.Hashtag,
        attributes: ['name']
      }]
    });
    return res.json(searchBoards);
  }catch(err) {
    console.error(err);
    return next(err);
  }

};

