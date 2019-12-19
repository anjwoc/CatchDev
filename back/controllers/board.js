const { Board, Image, User } = require('../models');

exports.addBoard = async (req, res, next)=>{
  try{
    const { title, content, location, category } = req.body; 
    const newPost = await Board.create({
      title: title,
      content: content,
      location: location,
      category: category,
      userId: req.user.id,
    });
    if(req.body.image){ //이미지가 있다면
      if(Array.isArray(req.body.image)){ //이미자가 여러개이면
        await Promise.all(req.body.image.map((image)=>{
          return Image.create({ src: image, boardId: newPost.id });
        }));
      } else{ //하나일 때
        await Image.create({ src: req.body.imgae, boardId: newPost.id });
      }
    }
    const fullPost = await Board.findOne({
      where: { id: newPost.id },
      include: [{
        model: User,
        attributes: ['email', 'name', ]
      },{
        model: Image
      },{
        model: User,
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
    const board = await Board.findOne({
      where: { id: req.params.id },
      include: [{
        model: User,
        attributes: ['id', 'email', 'name', 'imgSrc']
      },{
        model: Image
      },{
        model: User,
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

exports.getLastId = async (req, res, next) => {
  try{
    const post = await Board.findOne({ 
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
    res.json(post);
  }catch(err){
    console.error(err);
    next(err);
  }
};
