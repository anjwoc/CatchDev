const db = require('../models');

exports.addBoard = async (req, res, next)=>{
  try{
    const { title, content, location, category, hashtags } = req.body; 
    const newPost = await db.Board.create({
      title: title,
      content: content,
      location: location,
      category: category,
      userId: req.user.id,
      hit: 1,
    });

    if(hashtags){
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag },
      })));
      await newPost.addHashtags(result.map(r => r[0]));
    };

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
        attributes: ['id', 'email', 'name', 'imgSrc', 'about']
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
    
    res.json(board);
  }catch(err){
    console.error(err);
    return next(err);
  };
};

exports.getLastId = async (req, res, next) => {
  try{
    const post = await db.Board.findOne({ 
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
    if(!post){
      //게시글이 하나도 없을 때
      res.json({"id": 1});
    }
    res.json(post);
  }catch(err){
    console.error(err);
    next(err);
  }
};



exports.addLike = async (req, res, next) => {
  try{
    const post = await db.Board.findOne({ where: { id: req.params.id }})

    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다');
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  }catch(err){
    console.error(err);
    next(err);
  }
};

exports.removeLike = async (req, res, next) => {
  try{
    const post = await db.Board.findOne({ where: { id: req.params.id }});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다');
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  }catch(err){
    console.error(err);
    next(err);
  }
};

exports.countLike = async (req, res, next) => {
  try{
    const allCount = await db.Board.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        as: 'Likers', 
        attributes: [[db.sequelize.fn('count', '*'), 'count']],
      }]
    });
    res.json(allCount.Likers);

  }catch(err){
    console.error(err);
    next(err);
  }
};