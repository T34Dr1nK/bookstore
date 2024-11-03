const { queryWithPlaceHolder } = require("../services/ReadService.services");
const bcrypt = require("bcryptjs")

async function CreateNewUser(req,res){
    try{

        const { userName, passWord, FullName, Phone, Email, Address, userType} = req.body;

        //console.log(category,title,author,ISBN,Price,Stock,Publisher,Description,image)

        if(!userName || !passWord || !FullName || !Phone || !Email || !Address || !userType){

            return res.status(406).send("Please Sent a corrected Format");

        }


        const CheckUsername = "select * from `user` WHERE Username = ? order by UserID LIMIT 1 ";
        let rows = await queryWithPlaceHolder(CheckUsername,userName)

        if (rows.length){
            return res.status(406).send("We already Have this Username Please Change your Username");
        }

        const hashedPassword = await bcrypt.hash(passWord, 10);
        

        let paramData = { Username: userName, Password: hashedPassword, FullName: FullName, Phone:Phone, Email: Email, Address: Address, UserType:userType };
        const InsertUserQuery = "INSERT INTO `user` SET ?";

        await queryWithPlaceHolder(InsertUserQuery,paramData);

        return res.status(200).json({message: "Insert New User"});


    }catch(err){console.error(err)}
}

async function LoginUserName(req,res) {

    const { userName, passWord} = req.body;

    //console.log(category,title,author,ISBN,Price,Stock,Publisher,Description,image)

    if(!userName || !passWord){

        return res.status(406).send("Please Sent a corrected Format");

    }

    const CheckUsername = "select Username,Password from `user` WHERE Username = ? order by UserID LIMIT 1 ";
    let rows = await queryWithPlaceHolder(CheckUsername,userName)
    if (!rows.length){
        return res.status(406).send("We don't have this UserName Please Try registered an Account");
    }

    const result = await bcrypt.compare(passWord, rows[0].Password);
    if(result){
        return res.status(200).json({message: "Login Successfully"});
    }else{
        return res.status(200).json({message: "Wrong PassWord Please Try Again"});
    }

}

module.exports = { CreateNewUser, LoginUserName };