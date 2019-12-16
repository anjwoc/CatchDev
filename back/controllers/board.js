const db = require('../models');

exports.addBoard = async (req, res, next)=>{
  try{
    const { title, content, location, category } = req.body; 
    const newPost = await db.Board.create({
      title: title,
      content: content,
      location: location,
      category: category,
      userId: req.user.id,
    });
    if(req.body.image){ //이미지가 있다면
      if(Array.isArray(req.body.image)){ //이미자가 여러개이면
        await Promise.all(req.body.image.map((image)=>{
          return db.Image.create({ src: image, boardId: newPost.id });
        }));
      } else{ //하나일 때
        await db.Image.create({ src: req.body.imgae, boardId: newPost.id });
      }
    }
    const fullPost = await db.Board.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
        attributes: ['email', 'name', ]
      },{
        model: db.Image
      },{
        model: db.User,
        as: 'Likers',
        attributes: ['id'],
      }]
    });
    return res.json(fullPost);
  }catch(err){
    console.error(err)
    return next(err);
  }
};  

//이미지 업로드
exports.uploadImage = (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
};

exports.loadBoard = async (req, res, next) => {
  try{
    const board = await db.Board.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'name', 'imgSrc']
      },{
        model: db.Image
      },{
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      }]
    });
    res.json(board);
  }catch(err){
    console.error(err);
    return next(err);
  };
};

exports.allPosts = async (req, res, next) => {
  //GET /board/allPosts?offset=10&limit=10
  try{
    console.log(`loadBoard진입 req.query값: ${req.query.lastId}`)
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
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'name', 'imgSrc']
      },{
        model: db.Image,
      },{
        model: db.User,
        as: 'Likers',
        attributes: ['id']
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    console.log(`posts: ${posts}`)
    res.json(posts);

  }catch(err){
    console.error(err);
    return next(err);
  }

};