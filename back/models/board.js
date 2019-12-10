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
      type: DataTypes.STRING(20),
      allowNull: false
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
    collate: 'utf8_general_ci' //한글 저장
  })
  
  Board.associate = (db) => {
    db.Board.belongsTo(db.User); 
    db.Board.hasMany(db.Comment);
    db.Board.hasMany(db.Image);
    db.Board.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };
  return Board;
};