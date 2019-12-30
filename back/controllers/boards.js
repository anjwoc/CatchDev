
const db = require('../models');

exports.loadAllBoards = async (req, res, next) => {
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