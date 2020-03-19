module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('board', {
    title: {
      type: DataTypes.STRING(50), //40자 이내
      allowNull: false, // 필수
    },
    content: {
      type: DataTypes.TEXT, //40자 이내
      allowNull: false, // 필수
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        '어학',
        '취업',
        '고시',
        '자격증',
        '프로그래밍',
        '기타'
      ],
    },
    location: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    numComments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    hit: { // 조회수 속성
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        'closed',
        'open'
      ],
      defaultValue: 'open',
      allowNull: false
    }
  },{
    charset: 'utf8',
    collate: 'utf8_unicode_ci' //한글 저장
  })


  Board.associate = (db) => {
    db.Board.belongsTo(db.User); 
    db.Board.hasMany(db.Comment);
    db.Board.hasMany(db.Image);
    db.Board.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Board.belongsToMany(db.Hashtag, { through: 'BoardHashtag', as: 'hashtags' });
  };
  return Board;
};