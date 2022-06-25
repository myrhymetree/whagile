class MemberDTO {
    memberCode;
    memberId;
    password;
    email;
    name;
    phone;
    company;
    purpose;
    createDate;
    lastLoginDate;
    dormant;
    
    constructor(data) {
        this.memberCode = data.MEMBER_CODE;
        this.password = data.PASSWORD;
        this.memberId = data.MEMBER_ID;
        this.email = data.EMAIL;
        this.name = data.NAME;
        this.phone = data.PHONE;
        this.company = data.COMPANY;
        this.purpose = data.PURPOSE;
        this.createDate = data.CREATE_DATE;
        this.lastLoginDate = data.LAST_LOGIN_DATE;
        this.dormant = data.DORMANT;
    }
}

module.exports = MemberDTO;