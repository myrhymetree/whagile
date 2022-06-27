const nodemailer = require('nodemailer');


exports.sendMail = async (memberInfo, token) => {
  return new Promise((resolve, reject) => {
    console.log('sendMail', memberInfo.email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "whagile99",
        pass: "rgipfmgcrxrvbzej"
      }
    });

    const info = transporter.sendMail({
      from: `"Whagile Team" <whagile99@gmail.com>"`,
      to: memberInfo.email,
      subject: 'Whagile 이메일 인증',
      html: 
      `<h1>안녕하세요 ${memberInfo.name} 님!</h1><br/>
      웨자일에 가입해주셔서 진심으로 감사합니다~!<br/>
      <br/>
      웨자일에 가입 완료하기 위해서는 이메일 인증이 필수입니다.<br/>
      아래 링크를 클릭하시면 인증이 완료됩니다.<br/>
      해당 링크는 48시간동안 유효합니다.<br/>
      <br/>
      <a href="http://localhost:8888/api/account/emailauth?id=${memberInfo.memberCode}&token=${token}">인증 완료</a><br/>
      <br/>
      <br/>
      Whagile Team 올림
      `
    }, (err, info) => {
      if(err){
        console.log(err);
        reject(err);
      } else {
        resolve(info.messageId);
      }
    });

  });

}