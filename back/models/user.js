require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING(40), //40자 이내
      allowNull: false, // 필수
      unique: true, // 중복 금지
    },
    openId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    socialType: {
      type: DataTypes.ENUM,
      values: [
        'github',
        'google',
        'facebook'
      ],
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    job: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    imgSrc: { //프로필 이미지
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: process.env.DEFAULT_PROFILE_IMG
    },
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci' //한글 저장
  })
  
  User.associate = (db) => {
    db.User.hasOne(db.Sns);
    db.User.hasMany(db.Board);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Board, { through: 'Like', as: 'Liked' });
    db.User.hasMany(db.Reply);
  };
  return User;
};