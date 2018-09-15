const tables = {
    userData :{
        createUserTable :"CREATE TABLE userData(userName varchar(10),password varchar(100),name varchar(50), emai varchar(20),CONSTRAINT pk_userData PRIMARY KEY (userName))",
        createCompanyTable : "CREATE TABLE companyDetails(companyName varchar(50), companyAddress varchar(200), companyEmail varchar(50) , CONSTRAINT pk_compantData PRIMARY KEY(companyName))",
        createParticipants : "CREATE TABLE participantsDetails(fname varchar(50),lname varchar(50),address varchar(50),email varchar(50), phonenumber varchar(50) , employeeid varchar(50),CONSTRAINT pk_participantsData PRIMARY KEY(employeeid))",
        insertintoParticipantsTable : "INSERT INTO participantsDetails(fname,lname,address,email,phonenumber,employeeid) VALUES ?",
        insertIntoUserTable : "INSERT INTO userData(userName,password,name,emai) VALUES ?",
        insertIntoCompanyTable : "INSERT INTO companyDetails(companyName,companyAddress,companyEmail) VALUES ?",
        SelectUser : 'SELECT * from userdata WHERE userName =',
        SelectParticipants : 'SELECT * from participantsDetails',
        SelectCompany : 'SELECT * from companyDetails'
    }
}

module.exports.tables = tables;


