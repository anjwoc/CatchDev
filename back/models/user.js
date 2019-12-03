module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40), //40자 이내
      allowNull: false, // 필수
      unique: true, // 중복 금지
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,

    },
    about: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    imgSrc: { //프로필 이미지
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci' //한글 저장
  })
  
  User.associate = (db) => {
    db.User.hasMany(db.Board);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Board, { through: 'Like', as: 'Liked' });
    // db.User.hasMany(db.Reply);
  };
  return User;
};