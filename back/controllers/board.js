const db = require('../models');

exports.addBoard = async (req, res, next)=>{
  try{
    const { title, content, location, hashtags, category } = req.body; 
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


exports.deleteBoard = async (req, res, next) => {
  try{
    await db.Board.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json('삭제 성공');
  }catch(err) {
    console.error(err);
    next(err);
  }
};

exports.updateBoard = async (req, res, next) => {
  try{
    const { title, content, location, hashtags, tagHistory, category, image } = req.body;
    await db.Board.update({
      title: title,
      content: content,
      location: location,
      category: category,
    },{
      where: {
        id: req.params.id
      }
    });
    const updatedPost = await db.Board.findOne({ where: { id: req.params.id }});
    // 만약 기존의 해시태그에서 줄어들었다면 filter로 삭제된 태그를 찾아서 디비에서 제거
    const deleteTags = tagHistory.filter(v => !hashtags.includes(v));
    if (deleteTags) {
      const result = await updatedPost.removeHashtags(deleteTags.map(r => {
        db.Hashtag.destroy({
          where: { name: r }
        });
      }));
    }
    if(hashtags){
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag },
      })));
      await updatedPost.addHashtags(result.map(r => r[0]));
    };

    if(image){ //이미지가 있다면
      if(Array.isArray(image)){ //이미자가 여러개이면
        await Promise.all(image.map((image)=>{
          return db.Image.create({ src: image, boardId: updatedPost.id });
        }));
      } else{ //하나일 때
        await db.Image.create({ src: imgae, boardId: updatedPost.id });
      }
    }
    res.json(updatedPost);
  }catch(err) {
    console.error(err);
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try{
    let status = req.body.status;
    if(status === 'open'){
      status = 'closed';
    }else{
      res.status(403).send('이미 모집완료된 스터디입니다.');
    }
    await db.Board.update({
      status: status,
    },{
      where: {
        id: req.params.id,
      }
    });
    res.json(status);
  }catch(err){
    console.error(err);
    next(err);
  }
};

//이미지 업로드
exports.uploadImage = (req, res, next) => {
  // v.filename이 v.location으로 변경
  res.json(req.files.map(v => v.location));
};

exports.loadUpdateBoard = async (req, res, next) => {
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
        as: 'hashtags',
        attributes: ['name']
      }]
    });
    res.json(board);
  }catch(err){
    console.error(err);
    return next(err);
  };
}

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
        as: 'hashtags',
        attributes: ['name']
      }]
    });
    board.increment('hit');

    res.json(board);
  }catch(err){
    console.error(err);
    return next(err);
  };
};


exports.addLike = async (req, res, next) => {
  try{
    const post = await db.Board.findOne({ where: { id: req.params.id }})
    
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다');
    }
    post.increment('like');
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
    post.decrement('like');
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  }catch(err){
    console.error(err);
    next(err);
  }
};
