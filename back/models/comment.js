module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: {
      type: DataTypes.TEXT, //긴글
      allowNull: false,
    },
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci' //한글 저장
  })
  
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Board);
    db.Comment.hasMany(db.Reply);
  };
  return Comment;
};